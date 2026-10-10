# Jules Courné — Portfolio Data

Portfolio de **Data Analyst / BI junior**, développé avec React et Tailwind CSS.

**[Voir le portfolio](https://juleescourne.github.io/portfolio-data-analyst/)**

## Projets organisés par thème

L’accueil regroupe huit projets dans trois rubriques. Des liens permettent d’aller directement au thème choisi ; toutes les fiches restent accessibles sur la page.

| Thème | Projet | Dépôt |
| --- | --- | --- |
| Analyses métier & Power BI | Assurance auto — comprendre les sinistres | [assurance-auto-analytics](https://github.com/juleescourne/assurance-auto-analytics) |
| Analyses métier & Power BI | Goodreads — du catalogue à la sélection | [goodreads-analytics-etl](https://github.com/juleescourne/goodreads-analytics-etl) |
| Analyses métier & Power BI | Hospital SQL Analytics | [hospital-sql-analytics](https://github.com/juleescourne/hospital-sql-analytics) |
| Modélisation & aide à la décision | Aide à la décision en usinage | [cutting-tool-recommender](https://github.com/juleescourne/cutting-tool-recommender) |
| Modélisation & aide à la décision | Résiliation client | [customer-churn-prediction](https://github.com/juleescourne/customer-churn-prediction) |
| Modélisation & aide à la décision | California Housing | [california-housing-price-prediction](https://github.com/juleescourne/california-housing-price-prediction) |
| Applications & visualisation | QVTi — enquêtes qualité de vie au travail | [qvt-analysis](https://github.com/juleescourne/qvt-analysis) |
| Applications & visualisation | BMX Competition Manager | [bmx-competition-manager](https://github.com/juleescourne/bmx-competition-manager) |

Les cartes Assurance et Goodreads ouvrent des **études de cas** : question métier, résultats, démarche, livrables et limites. Assurance présente les cinq pages du rapport Power BI ; Goodreads présente les trois pages de son rapport Power BI, avec une lecture guidée du catalogue, de la sélection et de la qualité. Les nombres sont issus des analyses publiées dans leurs dépôts. Le visuel de la carte assurance résume la comparaison de fréquence entre R24 et le portefeuille.

Les compétences de l’accueil renvoient aux projets qui les illustrent. Le parcours, la disponibilité, les contacts et le CV restent accessibles depuis la navigation.

## Études de cas et démonstrations

- **Assurance** : parcours guidé en cinq étapes, captures réelles des dashboards, zoom, constats, interprétations et suites proposées. Le PDF complet, les notebooks et le projet Power BI sont accessibles sans compte depuis l’étude. Les tests statistiques sont clairement présentés comme des suites à réaliser.
- **Goodreads** : trois captures intégrales du PDF Power BI fourni, avec onglets, zoom, constats, interprétation et suites proposées. Les tableaux défilants sont complétés par les CSV des 20 propositions, des six listes et de leurs mouvements. Le rapport PDF et la synthèse Python sont distingués.
- **Résiliation client** : inférence ONNX et contributions SHAP dans le navigateur. Le dépôt choisit modèle et seuil sur validation puis évalue sur test ; cette évaluation est distinguée du modèle historique de la démo. Aucune efficacité de campagne de rétention n’a été mesurée.
- **California Housing** : score de scénario relatif, sans prédiction calibrée en dollars. Le dépôt documente l’évaluation du modèle sur les données de 1990.
- **Usinage et QVTi** : applications interactives embarquées ; les pages précisent leur périmètre et les données utilisées.

Les projets PBIP se téléchargent depuis leurs dépôts et s’ouvrent dans Power BI Desktop. Les graphiques des deux études de cas proviennent des notebooks ; ils ne sont pas des captures Power BI.

Les parcours Assurance et Goodreads proposent navigation et zoom sur les captures. La démo churn, la carte Housing, l’outil d’usinage et QVTi conservent leurs interactions propres. Les fonctionnalités lourdes sont chargées à la demande.

### Contributions SHAP

Les valeurs SHAP sont pré-calculées hors ligne sur les 21 216 scénarios de la démo. Le panneau affiche la part de chaque variable dans la contribution absolue totale, et non une variation de probabilité. Les entrées sont arrondies au point de grille le plus proche. Le script d’export se trouve dans le dépôt churn : `scripts/export_demo_artifacts.py`.

## Modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `src/data/HomeData.js` | Thèmes, fiches, chiffres de l’accueil et compétences |
| `src/data/CaseStudies.js` | Résultats, sources et limites des études Assurance et Goodreads |
| `src/data/AssuranceGuide.js` | Constats, interprétations et suites des cinq dashboards |
| `src/components/AssuranceGuide.jsx` | Navigation accessible, captures et zoom du rapport |
| `src/data/career.json` | Parcours, contacts et contenu du CV |
| `src/components/CaseStudyPage.jsx` | Présentation commune des études de cas |
| `src/pages/HomePage.jsx` | Accueil et navigation entre les thèmes |
| `public/images/` | Images locales et figures extraites des notebooks |

Les routes en `#` fonctionnent sur GitHub Pages, avec précédent/suivant du navigateur. Les études sont accessibles directement via `#/assurance` et `#/goodreads`.

### Actualiser le parcours Assurance

La page `#/assurance` présente cinq captures intégrales du PDF dans `public/documents/assurance-dashboards.pdf`. Son empreinte SHA-256 et sa provenance sont conservées dans `public/documents/assurance-source.json`. Le PDF a été fourni le 9 octobre 2026 ; la date de fourniture ne garantit pas une date de rafraîchissement des données.

Pour remplacer les captures, installer `scripts/requirements-assurance-images.txt`, puis exécuter :

```bash
python scripts/build-assurance-images.py /chemin/vers/Assurance.pdf --date 2026-10-09
```

Le script produit les WebP de lecture (1 484 px) et de zoom (2 472 px) dans `public/images/assurance/`, copie le PDF et actualise son empreinte. Il ne modifie aucun graphique. Relire ensuite les cinq analyses dans `src/data/AssuranceGuide.js` et vérifier les chiffres avec l’export et les notebooks. La présence d’un export ne valide pas à elle seule toutes les mesures DAX et interactions.

La navigation fonctionne au clic et au clavier (flèches, Début et Fin). Le zoom utilise une fenêtre modale native, fermable avec Échap. Les captures sont statiques : les filtres se manipulent dans le projet Desktop téléchargeable. Vérifier le parcours sur ordinateur et mobile après chaque changement.

## Générer le CV

Le CV utilise `src/data/career.json`. Après une modification de ses données :

```bash
python -m pip install -r scripts/requirements-cv.txt
python scripts/build-cv.py
```

Sortie : `public/cv-jules-courne.pdf`. Contrôler le rendu et le nombre de pages avant publication.

## Développement et vérification

```bash
npm ci
npm start
```

L’application est disponible sur `http://localhost:3000`.

```bash
npm test -- --watchAll=false
npm run build
```

Vérifier également sur ordinateur et mobile les thèmes, les liens vers les études, le retour au portfolio et le chargement des figures. Les tests React couvrent l’accueil et les interactions des démonstrations.

## Déploiement

Chaque push sur `main` lance `.github/workflows/deploy-pages.yml` : tests, build React puis déploiement GitHub Pages. Le workflow des pull requests effectue les contrôles avant intégration.

Les images sont servies depuis le site. Les fichiers volumineux des modèles navigateur restent sur la branche `assets`, via jsDelivr. Aucun dataset d’analyse ni cache Power BI n’est embarqué dans le portfolio.

## Auteur

**Jules Courné — Data Analyst / BI junior, Rouen**

[GitHub](https://github.com/juleescourne) · [LinkedIn](https://www.linkedin.com/in/jules-courn%C3%A9-430a79230/)


## Actualiser Goodreads

Après réexécution des notebooks et de scripts/preparer_livrables.py dans le dépôt Goodreads, lancer python scripts/sync-goodreads.py /chemin/du/depot/goodreads. Le script copie les petites listes, le PDF et les figures calculées, ainsi que le JSON des six scénarios. Vérifier ensuite les commentaires de GoodreadsPage.jsx, puis exécuter les tests et le build. Le parcours ne charge pas les 1,85 million de fiches et ne simule pas de résultat commercial.

Pour actualiser les captures Power BI (trois pages dans l’ordre catalogue, sélection, qualité) :

```bash
python -m pip install -r scripts/requirements-assurance-images.txt
python scripts/build-goodreads-images.py /chemin/vers/demo_portfolio/Goodreads.pdf --date 2026-10-09
```

Le script conserve le PDF fourni, produit six WebP (lecture et zoom) et enregistre son empreinte dans `public/documents/goodreads-source.json`. Il ne retouche pas les graphiques. Adapter les commentaires dans `src/data/GoodreadsGuide.js` et la date affichée dans `GoodreadsGuide.jsx` et `GoodreadsPage.jsx`. Les deux projets partagent le composant `DashboardGuide.jsx` ; vérifier aussi le parcours Assurance après une modification de ce composant.

## Actualiser Hospital SQL Analytics

La route `#/hospital` présente trois analyses des résultats MySQL : activité, couverture et qualité. Les changements de lecture et le choix du payeur utilisent les agrégats publiés ; le navigateur ne lance pas de requête SQL.

Après `bash scripts/run_demo.sh` dans le dépôt Hospital, lancer :

```bash
python3 scripts/sync-hospital.py /chemin/vers/hospital-sql-analytics
```

Le script copie le JSON et sept CSV agrégés, sans données individuelles. Vérifier les commentaires de `HospitalPage.jsx`, les chiffres du CV, puis lancer les tests et le build. Les résultats portent sur les CSV publics Maven / SyntheticMass : 974 patients, 27 891 passages et 47 701 actes, données synthétiques issues de Synthea. La démo distingue moyennes, médianes, durées extrêmes et incohérences après décès.
