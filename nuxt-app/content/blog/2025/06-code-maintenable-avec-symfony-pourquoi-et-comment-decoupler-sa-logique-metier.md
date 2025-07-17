---
title: "Code maintenable avec Symfony : pourquoi et comment découpler sa logique métier"
tags: [architecture, symfony, php, solid]
createdAt: 2025-06-27
---

## Pourquoi découpler la logique métier du framework ?

Dans le code des applications, il est fréquent de voir des contrôleurs qui accumulent de nombreuses responsabilités.
Cette approche, bien que rapide à implémenter, pose plusieurs problèmes de maintenabilité et de testabilité.
Explorons pourquoi et comment mieux organiser notre code.

## Un exemple concret : le "Fat Controller"

Prenons l'exemple d'un contrôleur gérant l'inscription d'un utilisateur dans une application. 

```php
<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        MailerInterface $mailer
    ): Response {
        $data = json_decode($request->getContent(), true);
        
        // Validation manuelle
        if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'Email invalide'], 400);
        }
        
        if (empty($data['password']) || strlen($data['password']) < 8) {
            return $this->json(['error' => 'Le mot de passe doit contenir au moins 8 caractères'], 400);
        }
        
        if (empty($data['firstName']) || empty($data['lastName'])) {
            return $this->json(['error' => 'Nom et prénom requis'], 400);
        }
        
        // Vérification de l'unicité de l'email
        $existingUser = $entityManager->getRepository(User::class)
            ->findOneBy(['email' => $data['email']]);
        
        if ($existingUser) {
            return $this->json(['error' => 'Cet email est déjà utilisé'], 400);
        }
        
        // Règles métier : génération du nom d'utilisateur, avec un suffixe unique
        $baseUsername = strtolower($data['firstName']) . '.' . strtolower($data['lastName']);
        $suffix = $userRepository->getNextAvailableSuffix($baseUsername);
        $username = $suffix ? $baseUsername . $suffix : $baseUsername;
        
        // Création de l'utilisateur
        $user = new User();
        $user->setEmail($data['email']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setUsername($username);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $user->setCreatedAt(new \DateTime());
        $user->setIsActive(true);
        
        // Règle métier : attribution du rôle par défaut
        $user->setRoles(['ROLE_USER']);
        
        // Validation avec les contraintes de l'entité
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return $this->json(['error' => 'Données invalides'], 400);
        }
        
        // Sauvegarde en base
        $entityManager->persist($user);
        $entityManager->flush();
        
        // Envoi de l'email de bienvenue
        $email = (new Email())
            ->from('noreply@monapp.com')
            ->to($user->getEmail())
            ->subject('Bienvenue sur MonApp !')
            ->html(sprintf(
                '<h1>Bienvenue %s !</h1><p>Votre compte a été créé avec succès. Votre nom d\'utilisateur est : %s</p>',
                $user->getFirstName(),
                $user->getUsername()
            ));
        
        $mailer->send($email);
        
        return $this->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'username' => $user->getUsername()
            ]
        ], 201);
    }
}
```

## Les problèmes de cette approche

Cette approche est régulièrement présente dans des projets legacy, puisqu'elle est couramment utilisée lorsqu'il n'y a pas de
réflexion sur la lisibilité, la maintenance ou l'évolutivité de l'application.

Elle présente par contre plusieurs problèmes majeurs :

### 1. Mélange des responsabilités

Le contrôleur fait tout à la fois :
- de la validation de données
- de la logique métier (génération du nom d'utilisateur, attribution des rôles)
- de l'accès aux données (vérification d'unicité, sauvegarde en base)
- de la notification utilisateur (envoi d'email)
- la gestion de la réponse (http en json)

Cette accumulation de responsabilités rend le code difficile à lire, et également à maintenir
puisqu'il est plus compliqué de situer les règles métier.

Ce problème ne va aller qu'en s'amplifiant au fil de la vie de l'application : le contrôleur ne va faire que grossir,
récupérant toutes les modifications qui devront être apportées à cette action.

### 2. Testabilité compromise

Si l'on voulait créer un test unitaire pour cette méthode, on serait obligés de mocker de nombreuses dépendances (EntityManager, Mailer, etc.)
Pour des tests d'intégration, on devrait forcément simuler une requête HTTP, ce qui est également lourd à mettre en place.
Dans les faits, il est très pénible et donc rare de mettre en place ces deux types de tests sur une méthode comme celle-ci.

Quant aux tests fonctionnels, le fait d'avoir beaucoup de logique au sein d'une même méthode va augmenter drastiquement   
la [complexité cyclomatique](https://fr.wikipedia.org/wiki/Nombre_cyclomatique), ce qui fait qu'il sera impossible de
tester tous les chemins.

Il est donc impossible de tester unitairement les règles métier sans embarquer tout l'écosystème Symfony
et simuler des requêtes HTTP, ce qui est lourd à mettre en place lors de l'écriture des tests,
et plus long à chaque exécution.

### 3. Règles métier diluées

Ici, les règles métier sont éparpillées à différents endroits dans le code :
- La génération du nom d'utilisateur (lignes 40-47)
- L'attribution du rôle par défaut (ligne 58)
- Les règles de validation (lignes 25-35)

À l'échelle d'une application, cela rend compliqué la visualisation, la réutilisation et la modification
de ces différentes règles.

### 4. Difficultés de maintenance

Toute modification des règles métier va nécessiter de modifier le contrôleur, ce qui augmente les risques de régression.
De plus, la mise à jour des composants peut également impacter la logique métier.

### 5. Violation du principe de responsabilité unique

Ce contrôleur viole clairement le principe SRP de SOLID
([Single Responsibility Principle](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique)) :
il a trop de raisons de changer (mise à jour d'un des nombreux composants utilisés ici,
changement des règles métiers, ...) et trop de responsabilités.

---

## La version refactorisée : séparation des responsabilités

Voyons maintenant comment refactoriser ce code, en séparant clairement les responsabilités.
Nous allons pour ce faire créer de nouvelles classes :
- **RegisterUserDTO** : un objet qui va servir à la validation et au transport des données
- **RegisterUserUseCase** : la logique métier sera stockée dans ce service
- **UserRepositoryInterface** : contrat d'accès aux données, utilisé par le use-case
- **UserRepository** : l'implémentation du repository


### Le DTO avec validation

Commençons par créer un DTO (Data Transfer Object, il s'agit d'un objet PHP simple, et non d'un service)
qui encapsule les données d'entrée et leur validation :

```php
<?php

namespace App\DTO;

use App\Entity\User;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[UniqueEntity(
    fields: ['email'],
    entityClass: User::class,
    message: 'Cet email est déjà utilisé'
)]
class RegisterUserDTO
{
    #[Assert\NotBlank(message: 'L\'email est requis')]
    #[Assert\Email(message: 'L\'email n\'est pas valide')]
    public string $email;

    #[Assert\NotBlank(message: 'Le mot de passe est requis')]
    #[Assert\Length(min: 8, minMessage: 'Le mot de passe doit contenir au moins 8 caractères')]
    public string $password;

    #[Assert\NotBlank(message: 'Le prénom est requis')]
    public string $firstName;

    #[Assert\NotBlank(message: 'Le nom est requis')]
    public string $lastName;

    public function __construct(array $data)
    {
        $this->email = $data['email'] ?? '';
        $this->password = $data['password'] ?? '';
        $this->firstName = $data['firstName'] ?? '';
        $this->lastName = $data['lastName'] ?? '';
    }
}
```

Le fait d'utiliser un DTO va permettre de :
- regrouper toute la validation au même endroit
- s'assurer de la présence et du typage des données

### Le service métier (Use Case)

Créons maintenant le service qui contient la logique métier :

```php
<?php

namespace App\UseCase;

use App\DTO\RegisterUserDTO;
use App\Entity\User;
use App\Repository\UserRepositoryInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterUserUseCase
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private MailerInterface $mailer
    ) {}

    public function execute(RegisterUserDTO $dto): User
    {
        // Génération du nom d'utilisateur
        $username = $this->generateUniqueUsername($dto->firstName, $dto->lastName);

        // Création de l'utilisateur avec les règles métier
        $user = new User();
        $user->setEmail($dto->email);
        $user->setFirstName($dto->firstName);
        $user->setLastName($dto->lastName);
        $user->setUsername($username);
        $user->setPassword($this->passwordHasher->hashPassword($user, $dto->password));
        $user->setCreatedAt(new \DateTime());
        $user->setIsActive(true);
        $user->setRoles(['ROLE_USER']); // Règle métier : rôle par défaut

        // Sauvegarde
        $this->userRepository->save($user);

        // Envoi de l'email de bienvenue
        $this->sendWelcomeEmail($user);

        return $user;
    }

    private function generateUniqueUsername(string $firstName, string $lastName): string
    {
        $baseUsername = strtolower($firstName) . '.' . strtolower($lastName);
        $suffix = $this->userRepository->getNextAvailableSuffix($baseUsername);
        
        return $suffix ? $baseUsername . $suffix : $baseUsername;
    }

    private function sendWelcomeEmail(User $user): void
    {
        $email = (new Email())
            ->from('noreply@monapp.com')
            ->to($user->getEmail())
            ->subject('Bienvenue sur MonApp !')
            ->html(sprintf(
                '<h1>Bienvenue %s !</h1><p>Votre compte a été créé avec succès. Votre nom d\'utilisateur est : %s</p>',
                $user->getFirstName(),
                $user->getUsername()
            ));

        $this->mailer->send($email);
    }
}
```

Par simplicité, un seul service regroupe ici la logique, mais on pourrait la répartir à travers plusieurs services dédiés.

### L'interface du repository

Créons une interface pour abstraire l'accès aux données : l'idée ici est que le code ne dépende pas directement
d'un service Doctrine, mais d'un contrat (interface) que l'on va déterminer.
C'est le principe de [ségrégation des interfaces](https://fr.wikipedia.org/wiki/Principe_de_s%C3%A9gr%C3%A9gation_des_interfaces)
de SOLID.

Ainsi, si Doctrine évolue et que les services disparaissent, sont renommés, ou changent leur fonctionnement,
les interfaces resteront elles inchangées et donc les controllers et les use-cases n'auront eux pas à être modifiés du tout
pour s'adapter à ces changements.

Pareillement, si on a besoin dans le futur de changer la base de données ou la couche d'accès, cela permet de le faire
plus simplement.

```php
<?php

namespace App\Repository;

use App\Entity\User;

interface UserRepositoryInterface
{
    public function getNextAvailableSuffix(string $baseUsername): ?string;

    public function save(User $user): void;
}
```

### Le contrôleur refactorisé

Une fois ces éléments mis en place, notre contrôleur devient beaucoup plus simple :

```php
<?php

namespace App\Controller;

use App\DTO\RegisterUserDTO;
use App\UseCase\RegisterUserUseCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(
        #[MapRequestPayload] RegisterUserDTO $dto,
        RegisterUserUseCase $registerUserUseCase
    ): Response {
        try {
            $user = $registerUserUseCase->execute($dto);
            
            return $this->json([
                'message' => 'Utilisateur créé avec succès',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'username' => $user->getUsername()
                ]
            ], 201);
        } catch (\DomainException $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }
    }
}
```

### L'implémentation du repository

Pour compléter, voici l'implémentation concrète du repository :

```php
<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository implements UserRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function getNextAvailableSuffix(string $baseUsername): ?string
    {
        // ...
    }

    public function save(User $user): void
    {
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
}
```

## Analyse : les bénéfices de cette approche

Cette refactorisation apporte de nombreux avantages :

### 1. Séparation claire des responsabilités

Chaque classe a maintenant une responsabilité bien définie :

### 2. Testabilité considérablement améliorée

La logique métier peut maintenant être plus facilement testée via des tests unitaires : les mocks sont simples à mettre
en place, et prend en argument un DTO qui est rapide à instancier.

### 3. Découplage

La logique métier (ici RegisterUserUseCase) ne dépend plus directement de Symfony.
Elle peut donc être réutilisée dans d'autres contextes (commandes CLI, HTTP en API et web, ...).

### 4. Règles métier centralisées et explicites

Les règles métier sont centralisées au même endroit, dans du code qui est peu dépendant du framework et des entrées/sorties
(ici, requête/réponse).

### 5. Facilité de maintenance et d'évolution

Pendant la vie de l'application, chaque modification aura un impact limité sur un élément bien particulier:
- modifier les règles de validation : dans le DTO
- changer la logique métier : dans le use-case
- modifier l'accès aux données : dans le repository

### 6. Respect des principes SOLID

- **SRP** : chaque classe a une seule responsabilité
- **OCP** : ouvert à l'extension, fermé à la modification
- **DIP** : dépendance sur des abstractions (interfaces)

---

Cette approche nous permet d'avoir un code plus maintenable, testable et évolutif, tout en gardant une architecture simple et compréhensible.

Sources
- https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html
- https://fr.slideshare.net/slideshow/design-applicatif-avec-symfony-zoom-sur-la-clean-architecture-symfony-live/94524977
