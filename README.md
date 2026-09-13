# Jules Courné — Portfolio Data

Portfolio personnel développé avec React et Tailwind CSS, qui présente une sélection de
projets **Data Analytics, Data Engineering, BI et Machine Learning appliqué**.

**Site en ligne :** https://juleescourne.github.io/portfolio-data-analyst/

## Positionnement

Le portfolio est volontairement centré sur un profil Data cohérent plutôt que sur une
liste large de technologies :

- **Analyse de données & BI** — SQL, qualité des données, conception de KPI, Power BI, restitution analytique
- **Data Engineering** — Python, ETL/ELT, bases relationnelles, modélisation dimensionnelle, validation et automatisation
- **Machine Learning appliqué** — XGBoost, feature engineering, classification/régression, évaluation de modèles

## Projets présentés

| Projet | Axe | Dépôt |
| --- | --- | --- |
| Goodreads Analytics ETL | ETL, schéma en étoile, chargement incrémental, tests, BI | [goodreads-analytics-etl](https://github.com/juleescourne/goodreads-analytics-etl) |
| Hospital SQL Analytics | MySQL, CTE, fonctions de fenêtrage, qualité des données | [hospital-sql-analytics](https://github.com/juleescourne/hospital-sql-analytics) |
| Aide au choix d'outil coupant | Données industrielles, MySQL, SQLAlchemy, ACP, Plotly | [cutting-tool-recommender](https://github.com/juleescourne/cutting-tool-recommender) |
| Prédiction de résiliation client | Classification, XGBoost, réglage du seuil, SHAP | [customer-churn-prediction](https://github.com/juleescourne/customer-churn-prediction) |
| Prix de l'immobilier californien | Régression, variables géographiques, XGBoost | [california-housing-price-prediction](https://github.com/juleescourne/california-housing-price-prediction) |

## Ce que fait le portfolio

- Page d'accueil orientée recruteur : disponibilité, mobilité, CV téléchargeable dès l'en-tête
- Bandeau de chiffres vérifiables, chacun traçable jusqu'à un dépôt
- Compétences reliées au projet qui les démontre — rien n'est listé sans preuve
- Cinq démonstrations exécutables : inférence ONNX sur la résiliation, carte de scénarios
  californiens, tableaux de bord Goodreads, et deux applications embarquées (ACP outil
  coupant, explorateur d'enquête QVTi)
- Routes en `#` qui fonctionnent sur GitHub Pages et respectent les boutons précédent/suivant du navigateur
- Démos lourdes chargées à la demande, pour garder la page d'accueil légère
- Métadonnées SEO et réseaux sociaux, dont une image de partage OpenGraph
- Intégration continue GitHub Actions : tests puis un build de production

## Génération du CV

Le CV et le parcours affiché partagent `src/data/career.json` : expériences, contrats,
dates et diplôme. Après une modification de cette source, régénérer le PDF :

```bash
python3 -m pip install -r scripts/requirements-cv.txt
node scripts/build-cv.js
```

Le wrapper appelle le générateur ReportLab `scripts/build-cv.py`, sans navigateur.
Sortie : `public/cv-jules-courne.pdf`. Vérifier visuellement la page après toute modification.

## Précisions importantes sur les démonstrations

Ces réserves sont volontairement affichées : une démo de navigateur est une simplification,
et la présenter comme un résultat de production serait trompeur.

### Démonstration California Housing

La visualisation affiche un **score de scénario relatif**, pas une prédiction calibrée en
dollars. Le dépôt du projet contient la méthodologie de modélisation réelle et les métriques
d'évaluation rapportées. Cette distinction évite de faire passer une visualisation normalisée
pour une estimation monétaire fiable.

### Recommandations Goodreads

Le jeu de données Goodreads décrit un catalogue, des notes et des signaux d'engagement. Le
portfolio présente donc les recommandations stratégiques comme des **hypothèses à tester**,
et non comme des affirmations causales ou des promesses de chiffre d'affaires.

### Seuil de résiliation client

Le script de référence choisit le modèle et le seuil sur validation, puis évalue le test.
Les rapports JSON sont copiés dans `src/data/` pour afficher les résultats sur les pages ML.
La démo ONNX conserve son entraînement historique et ses limites, explicitement séparés.
Aucune efficacité de campagne de rétention n’a été mesurée.

### Contributions SHAP

Le panneau d'explication lit des valeurs SHAP pré-calculées hors ligne sur les 21 216
scénarios que les curseurs de la démo peuvent produire, SHAP ne pouvant pas s'exécuter dans
le navigateur. Le panneau affiche la **part de chaque variable dans la contribution absolue
totale** — les valeurs SHAP sont exprimées en log-odds, les afficher telles quelles suivies
d'un signe pourcent serait faux. Les entrées sont arrondies au point de grille le plus proche.
Le script d'export se trouve dans le dépôt churn, à `scripts/export_demo_artifacts.py`.

## Stack technique

- React
- Tailwind CSS
- Lucide React
- Plotly
- ONNX Runtime Web
- GitHub Pages

Les images sont servies par le site lui-même, depuis `public/images/` — les tableaux de bord
sont des exports WebP plafonnés à 1600 px (moins de 500 Ko pour l'ensemble, contre 14,4 Mo de
PNG auparavant). Seuls les fichiers de modèle destinés au navigateur restent sur la branche
`assets` via jsDelivr, où leur taille justifie un hébergement externe.

## Développement local

```bash
npm install
npm start
```

L'application est alors disponible sur `http://localhost:3000`.

## Tests

```bash
npm test -- --watchAll=false
```

## Build de production

```bash
npm run build
```

## Déploiement sur GitHub Pages

Le dépôt contient `.github/workflows/deploy-pages.yml`. Une fois GitHub Pages configuré sur
**GitHub Actions**, chaque push sur `main` lance les tests, construit l'application React et
déploie automatiquement l'artefact `build/`.

L'ancienne commande `npm run deploy` peut toujours publier une branche `gh-pages`, mais elle
devient inutile dès que Pages est configuré sur GitHub Actions.

Le champ `homepage` de `package.json` pointe vers :

```text
https://juleescourne.github.io/portfolio-data-analyst/
```

## Structure du dépôt

```text
src/
├── components/       Composants d'interface réutilisables
├── data/             Textes du portfolio et métadonnées des projets
├── hooks/            Logique du modèle navigateur et de SHAP
├── pages/            Page d'accueil et pages projet
└── utils/            Configuration partagée des ressources et d'ONNX

public/
├── index.html        Métadonnées SEO et réseaux sociaux
├── manifest.json
├── robots.txt
└── sitemap.xml
```

## Auteur

**Jules Courné**  
Data Analyst / BI junior — Rouen, France

- GitHub : https://github.com/juleescourne
- LinkedIn : https://www.linkedin.com/in/jules-courn%C3%A9/
