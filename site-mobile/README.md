# Correctifs UX mobile — ewapay.app

Deux fichiers à ajouter au site (`tontinepay-site`). Ils n'agissent que sous 900 px de large : l'affichage ordinateur reste identique au pixel près (vérifié).

## Intégration

1. Copier `ewapay-mobile.css` et `ewapay-mobile.js` dans `assets/`.
2. Dans le `<head>` de chaque page, **après** `ewapay-fil.css` :
   ```html
   <link rel="stylesheet" href="/assets/ewapay-mobile.css?v=1">
   ```
3. Juste avant `</body>` :
   ```html
   <script src="/assets/ewapay-mobile.js?v=1" defer></script>
   ```
4. Déployer avec `./deploy.sh`.

Si les pages sont générées par le backoffice (éditeur « Site web »), ajoutez ces deux lignes au gabarit commun plutôt qu'à chaque page.

## Ce qui change sur mobile

| Problème constaté | Correction |
|---|---|
| Défilement horizontal sur petits écrans (320 px) : la page faisait 331 px de large, 335 px sur la FAQ | E-mail du pied de page, curseurs et compteur de la FAQ contenus dans l'écran |
| Boutons « Commencer » et « Simuler » de largeur variable | Boutons pleine largeur, 54 px de haut |
| Badges Android et iOS « Bientôt » sur deux lignes pleines | Côte à côte et compacts |
| Curseurs du simulateur difficiles à saisir au doigt (poignée d'environ 16 px) | Poignée de 30 px, partie remplie visible, zone tactile de 44 px |
| Liens du pied de page (24 px), « Voir toutes les questions » (26 px) et boutons « Copier le lien » de la FAQ (32 px) trop petits | Zones tactiles d'au moins 44 px |
| Aucun bouton d'action visible pendant le défilement d'une page de 13 000 px | Barre fixe en bas d'écran « Commencer mon achat / Simuler », masquée en haut de page, sur le simulateur, sur le bloc final et quand le menu est ouvert ; tient compte de l'encoche iPhone |
| Le menu mobile ne se fermait pas en touchant ailleurs | Fermeture au toucher extérieur |
| Textes de 10,5 à 12,5 px | 12,5 à 13 px minimum |

## Vérification

Testé sur iPhone SE (320 px), iPhone 13 (390 px) et Android (360 px), avec les pages réelles du site :
- largeur de page égale à celle de l'écran sur toutes les pages testées ;
- petites zones tactiles : 9 → 3 sur l'accueil et 66 → 6 sur la FAQ (iPhone SE) ;
- page d'accueil un peu plus courte (14 222 → 13 980 px sur iPhone SE) ;
- version ordinateur à 1440 px : aucune différence de pixel.
