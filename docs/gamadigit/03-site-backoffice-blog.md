# Architecture du site, du back-office et du blog

## Navigation publique V1

- Accueil
- Services
  - Création web et applications
  - Design et communication
  - Hébergement et infrastructure
  - Logiciels et abonnements
  - Formation et accompagnement
  - Solutions numériques pour entreprises
- Catalogue
- Formations
- Blog
- Réalisations
- À propos
- Contact

## Page d'accueil modulaire

Les blocs suivants sont administrables, activables et réordonnables :

1. bandeau d'annonce ;
2. bannière principale ;
3. six familles ;
4. offres mises en avant ;
5. logiciels populaires ;
6. formations en vedette ;
7. réalisations ;
8. méthode de travail ;
9. témoignages ;
10. derniers articles ;
11. FAQ ;
12. appel à l'action final.

## Pages familles

Chaque famille possède :

- nom ;
- slug ;
- résumé ;
- contenu détaillé ;
- icône ;
- image ;
- services liés ;
- offres mises en avant ;
- FAQ ;
- SEO ;
- statut ;
- ordre d'affichage.

## Blog

### Types de contenu

- article ;
- guide ;
- tutoriel ;
- actualité GamaDigit ;
- étude de cas.

### Catégories initiales

- Conseils numériques
- Sites web et applications
- Design et communication
- Hébergement et sécurité
- Logiciels professionnels
- Formation et compétences
- Solutions pour entreprises
- Actualités GamaDigit

### Champs d'un article

- titre ;
- slug ;
- extrait ;
- contenu riche ;
- image de couverture ;
- auteur ;
- catégorie ;
- mots-clés ;
- temps de lecture ;
- statut brouillon, programmé, publié ou archivé ;
- date de publication ;
- article vedette ;
- SEO ;
- image Open Graph ;
- appels à l'action ;
- services ou produits liés.

### Fonctions éditoriales V1

- création et modification ;
- aperçu avant publication ;
- publication immédiate ou programmée ;
- classement par catégorie ;
- recherche ;
- articles liés ;
- partage social ;
- sitemap automatique ;
- flux RSS si utile ;
- redirections lors d'un changement de slug.

## Back-office V1

### Tableau de bord

- nouvelles demandes ;
- demandes en cours ;
- clics WhatsApp ;
- pages et articles les plus consultés ;
- contenus en brouillon ;
- alertes de publication et de renouvellement.

### Contenus

- page d'accueil ;
- pages ;
- menus ;
- médias ;
- blog.

### Offres

- familles ;
- services ;
- packs ;
- logiciels ;
- formations ;
- solutions entreprises.

### Confiance

- réalisations ;
- témoignages ;
- FAQ ;
- partenaires.

### Commercial

- demandes de devis ;
- prospects ;
- statuts commerciaux ;
- sources d'acquisition ;
- notes internes ;
- clics WhatsApp.

### Configuration

- identité ;
- coordonnées ;
- réseaux sociaux ;
- SEO ;
- domaines et redirections ;
- utilisateurs administrateurs ;
- rôles et permissions.

## Principe d'administration

Le fondateur contrôle les contenus, prix, statuts, images, ordres et liens. La grille responsive, les composants, la sécurité, les validations et les règles de données restent protégés par le code.

## Modèle de données minimal

- `service_families`
- `services`
- `service_packages`
- `software_products`
- `trainings`
- `training_sessions`
- `business_solutions`
- `projects`
- `testimonials`
- `faqs`
- `blog_categories`
- `blog_posts`
- `blog_tags`
- `media_assets`
- `pages`
- `page_sections`
- `menus`
- `menu_items`
- `leads`
- `lead_notes`
- `site_settings`
- `redirects`
- `admin_users`

Toutes les tables sensibles doivent recevoir des politiques RLS explicites et versionnées dans le dépôt.
