import EmbeddedDemo from '../components/EmbeddedDemo';

const QvtPage = ({ onBack }) => (
    <EmbeddedDemo
        onBack={onBack}
        title="QVTi — analyse d'enquêtes qualité de vie au travail"
        subtitle="Application Vue 3 entièrement côté client : ingestion CSV, distributions Likert liées par des filtres communs, comparaison des populations et visages de Chernoff avec légendes explicites. Cliquez sur « Voir la démo avec le jeu d'exemple » pour charger les données synthétiques."
        tags={['Vue 3', 'Pinia', 'Vega-Lite', 'PixiJS', 'CSV']}
        repository="https://github.com/juleescourne/qvt-analysis"
        src="https://juleescourne.github.io/qvt-analysis/"
        height={1450}
        facts={[
            { value: '240', label: 'profils synthétiques' },
            { value: '8', label: 'catégories d’enquête' },
            { value: '5⁴', label: 'combinaisons de visages' },
            { value: '0', label: 'donnée transmise' },
        ]}
        disclaimer="Le traitement est intégralement local : aucune réponse ne quitte le navigateur. Les jeux d'enquête d'origine ont été retirés du dépôt public — croisés, leurs attributs démographiques et organisationnels permettaient une ré-identification. Les données de démonstration sont synthétiques."
    />
);

export default QvtPage;
