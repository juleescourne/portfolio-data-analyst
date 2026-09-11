import EmbeddedDemo from '../components/EmbeddedDemo';

const CuttingToolsPage = ({ onBack }) => (
    <EmbeddedDemo
        onBack={onBack}
        title="Aide à la décision — choix d'un outil coupant"
        subtitle="Définissez une configuration d'usinage cible : l'application la projette dans l'espace des essais historiques et classe les plus proches. Standardisation, ACP ajustée sur l'historique seul, puis distance euclidienne pondérée par la variance expliquée."
        tags={['Python', 'MySQL', 'SQLAlchemy', 'ACP', 'Plotly', 'scikit-learn']}
        repository="https://github.com/juleescourne/cutting-tool-recommender"
        src={`${process.env.PUBLIC_URL}/demos/cutting-tools.html`}
        height={1180}
        facts={[
            { value: '12', label: 'entités modélisées en MySQL' },
            { value: '60', label: 'essais synthétiques' },
            { value: '61,6 %', label: 'variance sur 2 axes' },
            { value: '6', label: 'grandeurs physiques' },
        ]}
        disclaimer="Démonstration sur données synthétiques : les mesures du partenariat de recherche ne sont pas redistribuables. Les essais sont générés selon les lois physiques de la coupe — Kienzle pour l'effort, Taylor pour l'usure, rugosité théorique — et non aléatoirement. L'algorithme est celui de l'application réelle, un logiciel de bureau Python/Tkinter adossé à MySQL."
    />
);

export default CuttingToolsPage;
