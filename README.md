# Jules Courné — Data Portfolio

Personal portfolio built with React and Tailwind CSS to present selected **Data Analytics, Data Engineering, BI and Applied Machine Learning** projects.

**Live site:** https://juleescourne.github.io/portfolio-data-analyst/

## Positioning

The portfolio is intentionally centered on a coherent Data profile rather than a broad list of technologies:

- **Data Analysis & BI** — SQL, data quality, KPI design, Power BI, analytical storytelling
- **Data Engineering** — Python, ETL/ELT, relational databases, dimensional modeling, validation and automation
- **Applied Machine Learning** — XGBoost, feature engineering, classification/regression and model evaluation

## Featured projects

| Project | Focus | Repository |
| --- | --- | --- |
| Goodreads Analytics ETL | ETL, star schema, incremental loading, testing, BI | [goodreads-analytics-etl](https://github.com/juleescourne/goodreads-analytics-etl) |
| Hospital SQL Analytics | MySQL, CTEs, window functions, data quality | [hospital-sql-analytics](https://github.com/juleescourne/hospital-sql-analytics) |
| Cutting Tool Decision Support | Industrial data, MySQL, SQLAlchemy, PCA, Plotly | [cutting-tool-recommender](https://github.com/juleescourne/cutting-tool-recommender) |
| Customer Churn Prediction | Classification, XGBoost, threshold tuning, SHAP | [customer-churn-prediction](https://github.com/juleescourne/customer-churn-prediction) |
| California Housing | Regression, geographic features, XGBoost | [california-housing-price-prediction](https://github.com/juleescourne/california-housing-price-prediction) |

## Portfolio features

- Responsive recruiter-oriented landing page
- Mobile navigation and accessible focus states
- Hash-based project routes that work on GitHub Pages and support browser back/forward
- Lazy-loaded heavy project demos to keep the landing page lighter
- Interactive ONNX churn inference demo
- Interactive California scenario visualization
- Goodreads dashboard walkthrough with contextual insights
- SEO and social metadata
- GitHub Actions CI for tests and production build

## Important demo notes

### California Housing browser demo

The browser visualization displays a **relative scenario score**, not a calibrated dollar prediction. The project repository contains the actual modeling methodology and reported evaluation metrics. This distinction avoids presenting a normalized browser visualization as a production-grade monetary estimate.

### Goodreads recommendations

The Goodreads dataset describes catalogue, ratings and engagement signals. The portfolio therefore presents strategic recommendations as **hypotheses to test**, not causal or revenue claims.

### Customer churn threshold

The recorded churn project explores the classification threshold on an evaluation sample. A production-grade experiment would select the threshold on validation data / cross-validation and keep a final test set untouched.

## Tech stack

- React
- Tailwind CSS
- Lucide React
- Plotly
- ONNX Runtime Web
- GitHub Pages

The large demo assets (dashboard images and browser model files) are served from the repository's `assets` branch through jsDelivr.

## Local development

```bash
npm install
npm start
```

The application is then available at `http://localhost:3000`.

## Tests

```bash
npm test -- --watchAll=false
```

## Production build

```bash
npm run build
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Once GitHub Pages is configured to use **GitHub Actions**, every push to `main` runs the tests, builds the React app and deploys the `build/` artifact automatically.

The legacy `npm run deploy` command can still publish a `gh-pages` branch, but it is not needed when Pages is configured to use GitHub Actions.

The `homepage` field in `package.json` is configured for:

```text
https://juleescourne.github.io/portfolio-data-analyst/
```

## Repository structure

```text
src/
├── components/       Reusable UI components
├── data/             Portfolio copy and project metadata
├── hooks/            Browser model / SHAP logic
├── pages/            Landing and project pages
└── utils/            Shared asset / ONNX configuration

public/
├── index.html        SEO and social metadata
├── manifest.json
├── robots.txt
└── sitemap.xml
```

## Author

**Jules Courné**  
Data Analyst & Data Engineer — Rouen, France

- GitHub: https://github.com/juleescourne
- LinkedIn: https://www.linkedin.com/in/jules-courn%C3%A9/
