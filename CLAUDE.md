# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Mathieu Tuaillon's personal tech blog and portfolio website built with Nuxt.js 3. The site focuses on PHP/Symfony development topics and is deployed as a static site to GitHub Pages. The project follows modern Vue 3/Nuxt 3 best practices with a clean component architecture and centralized theming system.

## Development Commands

All development commands use the Task runner (Taskfile.yaml):

- `task start` - Start development environment (Docker containers, available at http://localhost:3000)
- `task generate` - Generate static site for deployment
- `task bash` - Access the container shell for debugging

## Architecture

**Content Management**: The blog uses Nuxt Content 2 with file-based content management. Blog posts are Markdown files in `nuxt-app/content/blog/` organized by year (2022-2025). Each post includes YAML frontmatter with metadata like title, description, tags, and dates.

**Component Architecture**: The project uses a clean, reusable component system:
- `PageWrapper.vue` - Main layout wrapper with header/footer
- `Header.vue` - Configurable navigation header
- `Footer.vue` - Centralized footer with social links
- `ArticleList.vue` - Reusable article listing component
- `ArticleMeta.vue` - Standardized article metadata display
- `Tag.vue` - Reusable tag component with highlighting

**Routing**: 
- `pages/index.vue` - Homepage with services and latest articles
- `pages/blog/index.vue` - Blog listing page
- `pages/blog/[...slug].vue` - Dynamic blog post pages
- `pages/tag/[tag].vue` - Tag-filtered post listings
- `pages/tags.vue` - All tags overview page
- `pages/contact.vue` - Contact page with email obfuscation
- `pages/formations.vue` - Work-in-progress formations page

**Styling**: Twenty theme (HTML5 UP) with centralized CSS variables system. All colors, spacing, and typography use consistent design tokens defined in `assets/css/variables.css`. Syntax highlighting uses Rose Pine Dawn theme. FontAwesome icons are included for UI elements.

**CSS Architecture**:
- `assets/css/variables.css` - Centralized design tokens (colors, spacing, typography)
- `assets/css/blog.css` - Blog-specific styles using CSS variables
- `assets/css/twenty/main.css` - Twenty theme base styles
- Component-scoped styles for page-specific styling

**Composables**:
- `useBodyClass.js` - Standardized body class management across pages

**Docker Setup**: Development environment runs in Node.js 22 containers. The main application container is accessible via `task bash`.

## Content Structure

Blog posts follow this pattern:
- Path: `nuxt-app/content/blog/YYYY/MM-post-title.md`
- Each post has YAML frontmatter with title, description, tags, createdAt, updatedAt
- Content supports syntax highlighting for PHP, SQL, Apache configs, and other languages
- Reading time is automatically calculated

## Design System

**CSS Variables** (defined in `assets/css/variables.css`):
- `--color-primary` / `--color-primary-hover` - Brand colors (#3fb1a3 / #359388)
- `--spacing-xs` through `--spacing-xxl` - Consistent spacing scale
- `--font-size-*` and `--font-weight-*` - Typography tokens
- `--border-radius-small` and border utilities

**Component Usage**:
- Use `<PageWrapper current-page="page-name">` for all pages
- Use `<ArticleList :articles="list" :current-tag="tag">` for article listings
- Use `<Tag :tag="tagName" :is-current="boolean">` for tag displays
- Use `<ArticleMeta>` for consistent date/tag formatting

## Key Configuration Files

- `nuxt-app/nuxt.config.ts` - Main Nuxt configuration with modules and content settings
- `docker-compose.yml` - Development environment setup
- `Taskfile.yaml` - Build and development commands
- `nuxt-app/assets/css/variables.css` - Design system tokens

## Code Standards

**DRY Principles**: The codebase follows strict DRY principles:
- No duplicate header/footer code (use PageWrapper)
- No hardcoded colors/spacing (use CSS variables)
- Reusable components for common UI patterns
- Centralized metadata handling

**Email Obfuscation**: Contact forms use Base64 email obfuscation with Vue.js decoding for spam protection.

**Responsive Design**: All components are mobile-first responsive using the Twenty theme's grid system.

## Deployment

The site generates static files via `task generate` and deploys to GitHub Pages. The deployment process uses GitHub Actions based on the git history.