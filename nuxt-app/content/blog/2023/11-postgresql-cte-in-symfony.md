---
title: Comment utiliser les requêtes CTE de PostgreSQL avec Symfony & Doctrine
tags: [postgresql, sql, doctrine, symfony]
createdAt: 2023-11-15
updatedAt: 2023-02-09
---

Les requêtes [CTE](https://www.postgresql.org/docs/current/queries-with.html), ou Common Table Expressions, offrent une approche élégante pour concevoir des requêtes complexes. Introduites avec la version 8.4 de PostgreSQL, elles permettent de créer des requêtes temporaires dont les résultats peuvent être utilisés dans une requête principale.

Les CTE sont définies via la syntaxe `WITH alias AS (query)`, avant de déclarer la requête principale. Plusieurs CTE peuvent être utilisées en même temps, et les résultats des premières peuvent être exploités dans les suivantes.


# PostgreSQL

Voici un exemple de CTE en PostgreSQL :

```sql
-- CTE listant le montant total des ventes par produit, pour l'année 2023
WITH product_sales AS (
    SELECT
        p.product_id,
        p.product_name,
        SUM(oi.quantity * oi.unit_price) AS total_sales
    FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.order_date >= '2023-01-01' AND o.order_date < '2024-01-01'
    GROUP BY p.product_id, p.product_name
),

-- CTE classant chaque catégorie en fonction des ventes totales
ranked_categories AS (
    SELECT
        ps.product_id,
        ps.product_name,
        ps.total_sales,
        RANK() OVER (PARTITION BY p.category ORDER BY ps.total_sales DESC) AS category_rank
    FROM product_sales ps
    JOIN products p ON ps.product_id = p.product_id
)

-- Requête principale listant le classement des catégories et leurs produits
SELECT
    pc.product_id,
    pc.product_name,
    pc.total_sales,
    pc.category_rank,
    p.category
FROM ranked_categories pc
JOIN products p ON pc.product_id = p.product_id
```

Dans cet exemple, deux CTE sont utilisées:
- la première permet de récupérer le volume des ventes par produit
- la seconde classe les catégories en fonction du volume des ventes calculé précédement

Leur utilisation permet notamment:
- **optimisation des requêtes complexes** les CTE permettent de décomposer les requêtes complexes en parties plus gérables, améliorant la lisibilité du code SQL et facilitant la maintenance.
- **amélioration des performances** en décomposant une requête en plusieurs parties, les optimisations du plan d'exécution peuvent être mieux exploitées, améliorant ainsi les performances globales des requêtes
- **récursivité** il est possible d'exécuter les CTE de manière récursive  

# Doctrine

Malheureusement, cette fonctionnalité n'est pas nativement implentée dans Doctrine à l'heure actuelle (voir [https://github.com/doctrine/dbal/issues/5018]). Il est tout de même possible de les utiliser en passant par les [requêtes natives](https://www.doctrine-project.org/projects/doctrine-orm/en/2.17/reference/native-sql.html). Il faudra donc créer un objet `ResultSetMapping` permettant de définir la structure des résultats, et exécuter le code SQL en faisant appel à la méthode `createNativeQuery` fournie par l'entityManager:

```php
$rsm = new ResultSetMapping();
$rsm
    ->addScalarResult('product_id', 'product_id')
    ->addScalarResult('product_name', 'product_name')
    ->addScalarResult('total_sales', 'total_sales')
    ->addScalarResult('category_rank', 'category_rank')
    ->addScalarResult('category', 'category');

$query = $this->getEntityManager()->createNativeQuery('
    -- CTE listant le montant total des ventes par produit, pour une plage de date
	WITH product_sales AS (
	    SELECT
	        p.product_id,
	        p.product_name,
	        SUM(oi.quantity * oi.unit_price) AS total_sales
	    FROM products p
	    JOIN order_items oi ON p.product_id = oi.product_id
	    JOIN orders o ON oi.order_id = o.order_id
	    WHERE o.order_date >= :startRange AND o.order_date < :endRange
	    GROUP BY p.product_id, p.product_name
	),

	-- CTE classant chaque catégorie en fonction des ventes totales
	ranked_categories AS (
	    SELECT
	        ps.product_id,
	        ps.product_name,
	        ps.total_sales,
	        RANK() OVER (PARTITION BY p.category ORDER BY ps.total_sales DESC) AS category_rank
	    FROM product_sales ps
	    JOIN products p ON ps.product_id = p.product_id
	)

	SELECT
	    pc.product_id,
	    pc.product_name,
	    pc.total_sales,
	    pc.category_rank,
	    p.category
	FROM ranked_categories pc
	JOIN products p ON pc.product_id = p.product_id
', $rsm);

$query->setParameter('startRange', '2023-01-01');
$query->setParameter('endRange', '2024-01-01');

return $query->getResult();
```

Ces exemples ont été créés avec l'éditeur PostgreSQL en ligne [https://extendsclass.com/postgresql-online.html].

Les Common Table Expressions sont également disponibles depuis [Mysql 8.0](https://dev.mysql.com/blog-archive/mysql-8-0-improved-performance-with-cte/), [MariaDB 10.2.1](https://mariadb.com/kb/en/with/) et [SQLite 3.8.3](https://www.sqlite.org/changes.html).

<!--

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL
);

-- Création de la table "products"
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Création de la table "order_items"
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    unit_price INTEGER NOT NULL
);

-- Insérer quelques données fictives dans la table "orders"
INSERT INTO orders (order_date) VALUES
    ('2023-01-05'),
    ('2023-02-10'),
    ('2023-03-15');

-- Insérer quelques données fictives dans la table "products"
INSERT INTO products (product_name, category) VALUES
    ('Product A', 'Category 1'),
    ('Product B', 'Category 1'),
    ('Product C', 'Category 2'),
    ('Product D', 'Category 2');

-- Insérer quelques données fictives dans la table "order_items"
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 5, 1099),
    (1, 2, 3, 850),
    (2, 3, 2, 1575),
    (3, 4, 4, 1200);
````

-->
