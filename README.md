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

Les cartes Assurance et Goodreads ouvrent des **études de cas** : question métier, résultats, démarche, graphique issu du notebook, livrables et limites. Les nombres sont issus des analyses publiées dans leurs dépôts. Le visuel de la carte assurance résume la comparaison de fréquence entre R24 et le portefeuille.

Les compétences de l’accueil renvoient aux projets qui les illustrent. Le parcours, la disponibilité, les contacts et le CV restent accessibles depuis la navigation.

## Études de cas et démonstrations

- **Assurance** : 678 013 contrats, distinction volume / fréquence, rapprochement des montants et suivi de la qualité. Le rapport Power BI comporte trois pages ; son actualisation, ses mesures DAX et son rendu Desktop restent à confirmer.
- **Goodreads** : étude Kaggle sur 1 850 032 fiches conservées et une sélection de 20 fiches en français à vérifier. Les 33 mesures DAX ont été rapprochées de Pandas dans six contextes. Le rendu du rapport reste à contrôler dans Desktop.
- **Laboratoire Goodreads** : démo synthétique historique, ouverte à la demande à la fin de l’étude. Ses données, ses genres et son score régularisé sont distincts de l’étude Kaggle actuelle. Son générateur est lié à un commit historique du dépôt.
- **Résiliation client** : inférence ONNX et contributions SHAP dans le navigateur. Le dépôt choisit modèle et seuil sur validation puis évalue sur test ; cette évaluation est distinguée du modèle historique de la démo. Aucune efficacité de campagne de rétention n’a été mesurée.
- **California Housing** : score de scénario relatif, sans prédiction calibrée en dollars. Le dépôt documente l’évaluation du modèle sur les données de 1990.
- **Usinage et QVTi** : applications interactives embarquées ; les pages précisent leur périmètre et les données utilisées.

Les projets PBIP se téléchargent depuis leurs dépôts et s’ouvrent dans Power BI Desktop. Les graphiques des deux études de cas proviennent des notebooks ; ils ne sont pas des captures Power BI.

Le laboratoire Goodreads, la démo churn, la carte Housing, l’outil d’usinage et QVTi constituent les cinq démonstrations interactives. Les fonctionnalités lourdes sont chargées à la demande.

### Contributions SHAP

Les valeurs SHAP sont pré-calculées hors ligne sur les 21 216 scénarios de la démo. Le panneau affiche la part de chaque variable dans la contribution absolue totale, et non une variation de probabilité. Les entrées sont arrondies au point de grille le plus proche. Le script d’export se trouve dans le dépôt churn : `scripts/export_demo_artifacts.py`.

## Modifier le contenu

| Fichier | Contenu |
| --- | --- |
| `src/data/HomeData.js` | Thèmes, fiches, chiffres de l’accueil et compétences |
| `src/data/CaseStudies.js` | Résultats, sources et limites des études Assurance et Goodreads |
| `src/data/career.json` | Parcours, contacts et contenu du CV |
| `src/components/CaseStudyPage.jsx` | Présentation commune des études de cas |
| `src/pages/HomePage.jsx` | Accueil et navigation entre les thèmes |
| `public/images/` | Images locales et figures extraites des notebooks |

Les routes en `#` fonctionnent sur GitHub Pages, avec précédent/suivant du navigateur. Les études sont accessibles directement via `#/assurance` et `#/goodreads`.

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

[GitHub](https://github.com/juleescourne) · [LinkedIn](https://www.linkedin.com/in/jules-courn%C3%A9/)
