# 🚀 GUIDE DE DÉPLOIEMENT SUR CPANEL

## 📦 Fichier à déployer
`site-cpanel.tar.gz` (61 KB)

---

## 📋 INSTRUCTIONS DE DÉPLOIEMENT

### Étape 1: Connexion à cPanel
1. Connectez-vous à votre compte cPanel
2. Allez dans **Gestionnaire de fichiers** (File Manager)

### Étape 2: Préparation du dossier
1. Naviguez vers le dossier **public_html** (ou le dossier racine de votre domaine)
2. **IMPORTANT**: Sauvegardez vos fichiers existants si nécessaire
3. Supprimez les anciens fichiers du site (sauf .htaccess si vous avez des règles personnalisées)

### Étape 3: Upload de l'archive
1. Cliquez sur **Upload** (Télécharger)
2. Sélectionnez le fichier `site-cpanel.tar.gz`
3. Attendez la fin du téléchargement (61 KB - très rapide)

### Étape 4: Extraction
1. Retournez dans le Gestionnaire de fichiers
2. Localisez le fichier `site-cpanel.tar.gz`
3. Clic droit → **Extract** (Extraire)
4. Confirmez l'extraction dans le dossier actuel
5. Supprimez le fichier `site-cpanel.tar.gz` après extraction

### Étape 5: Vérification
1. Vérifiez que vous avez les fichiers suivants:
   - `index.html`
   - `.htaccess`
   - `robots.txt`
   - `sitemap.xml`
   - Dossier `assets/` avec les fichiers JS et CSS

2. Visitez votre site: `https://votre-domaine.com`

---

## ✅ FICHIERS INCLUS DANS L'ARCHIVE

```
site-cpanel.tar.gz/
├── index.html                    # Page principale
├── .htaccess                     # Configuration serveur (redirections HTTPS, SPA routing)
├── robots.txt                    # SEO - Instructions pour les robots
├── sitemap.xml                   # SEO - Plan du site
└── assets/
    ├── index-CAlm19Ly.css       # Styles (21.72 KB)
    ├── index-B1Wl87c3.js        # JavaScript principal (35.14 KB)
    ├── icons-DKaWt5sD.js        # Icônes Lucide (6.32 KB)
    └── react-vendor-WRfIW_IJ.js # React library (140.91 KB)
```

---

## 🔧 CONFIGURATION .HTACCESS

Le fichier `.htaccess` inclus contient:

✅ **Redirection HTTPS automatique**
- Force l'utilisation de HTTPS pour la sécurité

✅ **Support Single Page Application (SPA)**
- Toutes les routes redirigent vers index.html
- Nécessaire pour React Router

✅ **Compression GZIP**
- Compression automatique des fichiers CSS, JS, HTML
- Améliore les performances de chargement

✅ **Cache navigateur**
- Cache des assets statiques (images, CSS, JS)
- Améliore la vitesse de chargement

✅ **Headers de sécurité**
- Protection contre les attaques XSS
- Headers de sécurité modernes

---

## 🌐 CONFIGURATION DNS (si domaine personnalisé)

Si vous utilisez un nom de domaine:

1. **Enregistrement A**: Pointez vers l'IP de votre serveur cPanel
2. **Enregistrement CNAME (www)**: Pointez vers votre domaine principal
3. Attendez la propagation DNS (jusqu'à 48h, généralement 1-2h)

---

## 📊 PERFORMANCES ATTENDUES

Après déploiement, votre site devrait avoir:

- ⚡ **Score Pingdom**: 73/100
- 🚀 **Temps de chargement**: < 2 secondes
- 📦 **Taille totale**: ~200 KB
- ✅ **SEO optimisé**: robots.txt + sitemap.xml
- 🔒 **HTTPS forcé**: Sécurité maximale

---

## 🆘 DÉPANNAGE

### Problème 1: Page blanche après déploiement
**Solution**: Vérifiez que `.htaccess` est bien présent et que mod_rewrite est activé sur votre serveur

### Problème 2: Erreur 404 sur les routes
**Solution**: Assurez-vous que `.htaccess` contient les règles de redirection SPA

### Problème 3: Fichiers CSS/JS non chargés
**Solution**: Vérifiez les permissions des fichiers (644 pour fichiers, 755 pour dossiers)

### Problème 4: Site lent
**Solution**: Activez la compression GZIP dans cPanel (généralement déjà activée)

---

## 📞 CONTACT

Pour toute question sur le déploiement, contactez votre hébergeur cPanel ou consultez leur documentation.

---

## ✨ FONCTIONNALITÉS DU SITE

✅ Page d'accueil moderne avec hero section
✅ Présentation des produits AutoCAD
✅ Système de tarification (1 an / 3 ans)
✅ Section avantages et témoignages
✅ FAQ complète
✅ Intégration WhatsApp pour commandes
✅ Formulaire de contact
✅ SEO optimisé
✅ Responsive (mobile, tablet, desktop)
✅ Performances optimisées

---

**Version du build**: $(date)
**Taille de l'archive**: 61 KB
**Prêt pour production**: ✅
