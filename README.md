# Autodesk CI — Plateforme de logiciels professionnels

Site de présentation et de commercialisation assistée de logiciels professionnels pour l'Afrique francophone.

## Stack technique

- React 18 + TypeScript
- Vite (build)
- TailwindCSS (design)
- React Router v6 (routing multi-pages)
- Zustand + localStorage (état et persistance)
- react-helmet-async (SEO dynamique)
- Lucide React (icônes)

## Structure

```
src/
  admin/          # Interface d'administration privée
  components/     # Composants réutilisables (ui/, layout/, product/)
  data/           # Données initiales (produits, catégories, témoignages, FAQ)
  pages/          # Pages publiques
  store/          # Store Zustand (état global)
  types/          # Types TypeScript
  utils/          # Utilitaires (WhatsApp, classes CSS)
public/
  .htaccess       # Config Apache (SPA routing, cache, HTTPS)
  sitemap.xml     # Sitemap complet
  robots.txt      # Robots
```

## Installation locale

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

Le dossier `dist/` contient le site compilé, prêt pour déploiement.

## Déploiement cPanel

1. Exécuter `npm run build`
2. Uploader le contenu de `dist/` à la racine du domaine via le gestionnaire de fichiers cPanel
3. S'assurer que le fichier `.htaccess` est bien présent à la racine

## Administration

L'interface d'administration est accessible à `/admin/connexion`.

**Mot de passe par défaut :** `Admin@2024!`

Changez le mot de passe immédiatement après la première connexion depuis `/admin/settings`.

## Catalogue initial

9 logiciels préconfigurés :
1. **Autodesk** (All Apps) — produit phare
2. **SolidWorks** — conception mécanique
3. **Lumion Pro** — rendu architectural
4. **SketchUp Pro** — modélisation 3D
5. **V-Ray** — rendu photoréaliste
6. **Adobe Acrobat Pro** — gestion PDF
7. **Microsoft 365** — bureautique
8. **Enscape** — visualisation temps réel
9. **ArchiCAD** — BIM architecture

## Catégories

- Architecture et BIM
- Rendu et Visualisation
- Industrie et Mécanique
- Bureautique et Documents

## WhatsApp

Numéro configuré : `2250718713781`

Chaque produit génère un message WhatsApp prérempli avec le nom du produit et l'offre sélectionnée. Les clics sont comptabilisés anonymement dans le tableau de bord admin.

## SEO

- Titres et méta descriptions uniques par page
- Open Graph et Twitter Cards
- Données structurées Schema.org (LocalBusiness, Product)
- Sitemap.xml complet
- Balises canoniques
- Robots.txt
- Routage propre (pas de hash URLs)
- Redirections SPA via .htaccess

## Redirections anciennes URLs

| Ancienne URL | Nouvelle URL |
|---|---|
| `/#avantages` | `/` (section avantages) |
| `/#prix` | `/produit/autodesk` |
| `/#contact` | `/contact` |

La page d'accueil (`/`) conserve le même positionnement SEO Autodesk qu'avant.
