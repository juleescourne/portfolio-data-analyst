// components/HousingPredictor.jsx
import React, { useState } from 'react';
import { TrendingUp, Map } from 'lucide-react';
import Plot from 'react-plotly.js';
import housingModel from '../hooks/housingModel';

const FEATURE_BOUNDS = {
    housing_median_age: { min: 1, max: 52, median: 29 },
    total_rooms: { min: 2, max: 39320, median: 2127 },
    population: { min: 3, max: 35682, median: 1166 },
    households: { min: 1, max: 6082, median: 409 },
    median_income: { min: 0.5, max: 15.0, median: 3.87 }
};

const HousingPredictor = () => {
    const [params, setParams] = useState({
        housing_median_age: FEATURE_BOUNDS.housing_median_age.median,
        total_rooms: FEATURE_BOUNDS.total_rooms.median,
        population: FEATURE_BOUNDS.population.median,
        households: FEATURE_BOUNDS.households.median,
        median_income: FEATURE_BOUNDS.median_income.median
    });

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setIsCalculating(true);
        setResults(null);
        setProgress(0);

        try {
            // Callback de progression
            const onProgress = (prog) => {
                setProgress(Math.round(prog));
            };

            const predictionResults = await housingModel.predict(params, onProgress);

            setResults(predictionResults);
        } catch (error) {
            console.error('Erreur de prédiction:', error);
            setError('La carte ne peut pas être calculée. Vérifiez la connexion puis relancez la génération.');
        } finally {
            setLoading(false);
            setIsCalculating(false);
            setProgress(0);
        }
    };

    const handleParamChange = (key, value) => {
        setResults(null);
        setParams(prev => ({
            ...prev,
            [key]: parseFloat(value)
        }));
    };

    // Calculer les métriques dérivées avec useMemo pour éviter recalculs
    const derivedMetrics = React.useMemo(() => {
        const roomsPerHH = params.total_rooms / Math.max(params.households, 1);
        const popPerHH = params.population / Math.max(params.households, 1);
        return { roomsPerHH, popPerHH };
    }, [params.total_rooms, params.households, params.population]);

    return (
        <div className="space-y-8">
            <div className="bg-accent-soft border border-line rounded-lg p-4 space-y-3">
                <h3 className="font-display text-2xl font-semibold">Comparer les localisations dans un scénario</h3>
                <p>Les caractéristiques du quartier sont appliquées à toutes les localisations. La carte permet d’examiner la sensibilité spatiale du modèle, pas de fixer un prix de vente.</p>
                <div className="flex flex-wrap gap-3">{[
                    ['Référence', {housing_median_age:29,total_rooms:2127,population:1166,households:409,median_income:3.87}],
                    ['Revenu plus élevé', {housing_median_age:29,total_rooms:2127,population:1166,households:409,median_income:6}],
                    ['Habitat plus ancien', {housing_median_age:45,total_rooms:2127,population:1166,households:409,median_income:3.87}],
                ].map(([name, values])=><button disabled={loading} key={name} className="bg-surface border border-line rounded px-3 py-2" onClick={()=>{setParams(values);setResults(null);}}>{name}</button>)}</div>
                <p className="text-sm text-ink-2">Chaque carte est normalisée séparément entre 0 et 100. Un score de 80 sur deux scénarios ne représente donc pas le même niveau brut. Une différence de scénario ne démontre pas un effet causal du revenu ou de l’âge.</p>
            </div>
            {error && <p role="alert" className="bg-signal-soft text-signal p-4 rounded">{error}</p>}
            {/* Controls Panel */}
            <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-2 leading-tight">
                    <TrendingUp className="text-accent" />
                    Paramètres du Quartier
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Âge médian */}
                    <div>
                        <label className="block text-ink-2 mb-2 font-medium">
                            Âge médian des maisons (années)
                        </label>
                        <input
                            type="range"
                            disabled={loading}
                            aria-label="housing_median_age"
                            min={FEATURE_BOUNDS.housing_median_age.min}
                            max={FEATURE_BOUNDS.housing_median_age.max}
                            value={params.housing_median_age}
                            onChange={(e) => handleParamChange('housing_median_age', e.target.value)}
                            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="text-accent font-semibold mt-1">
                            {params.housing_median_age} ans
                        </div>
                    </div>

                    {/* Total pièces */}
                    <div>
                        <label className="block text-ink-2 mb-2 font-medium">
                            Total pièces (quartier)
                        </label>
                        <input
                            type="range"
                            disabled={loading}
                            aria-label="total_rooms"
                            min={FEATURE_BOUNDS.total_rooms.min}
                            max={FEATURE_BOUNDS.total_rooms.max}
                            step={100}
                            value={params.total_rooms}
                            onChange={(e) => handleParamChange('total_rooms', e.target.value)}
                            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="text-accent font-semibold mt-1">
                            {params.total_rooms.toLocaleString()}
                        </div>
                    </div>

                    {/* Population */}
                    <div>
                        <label className="block text-ink-2 mb-2 font-medium">
                            Population (quartier)
                        </label>
                        <input
                            type="range"
                            disabled={loading}
                            aria-label="population"
                            min={FEATURE_BOUNDS.population.min}
                            max={FEATURE_BOUNDS.population.max}
                            step={100}
                            value={params.population}
                            onChange={(e) => handleParamChange('population', e.target.value)}
                            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="text-accent font-semibold mt-1">
                            {params.population.toLocaleString()}
                        </div>
                    </div>

                    {/* Households */}
                    <div>
                        <label className="block text-ink-2 mb-2 font-medium">
                            Nombre de foyers
                        </label>
                        <input
                            type="range"
                            disabled={loading}
                            aria-label="households"
                            min={FEATURE_BOUNDS.households.min}
                            max={FEATURE_BOUNDS.households.max}
                            step={10}
                            value={params.households}
                            onChange={(e) => handleParamChange('households', e.target.value)}
                            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="text-accent font-semibold mt-1">
                            {params.households.toLocaleString()}
                        </div>
                    </div>

                    {/* Revenu médian */}
                    <div>
                        <label className="block text-ink-2 mb-2 font-medium">
                            Revenu médian (×10k$)
                        </label>
                        <input
                            type="range"
                            disabled={loading}
                            aria-label="median_income"
                            min={FEATURE_BOUNDS.median_income.min}
                            max={FEATURE_BOUNDS.median_income.max}
                            step={0.1}
                            value={params.median_income}
                            onChange={(e) => handleParamChange('median_income', e.target.value)}
                            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                        <div className="text-accent font-semibold mt-1">
                            ${(params.median_income * 10000).toLocaleString()}/an
                        </div>
                    </div>
                </div>

                {/* Métriques dérivées */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-line">
                    <div className="bg-raised p-3 rounded-lg">
                        <div className="text-muted text-sm">Âge Médian</div>
                        <div className="text-ink font-bold text-lg">{params.housing_median_age} ans</div>
                    </div>
                    <div className="bg-raised p-3 rounded-lg">
                        <div className="text-muted text-sm">Revenu Médian</div>
                        <div className="text-ink font-bold text-lg">${(params.median_income * 10000).toLocaleString()}</div>
                    </div>
                    <div className="bg-raised p-3 rounded-lg">
                        <div className="text-muted text-sm">Pièces/Foyer</div>
                        <div className="text-ink font-bold text-lg">{derivedMetrics.roomsPerHH.toFixed(1)}</div>
                    </div>
                    <div className="bg-raised p-3 rounded-lg">
                        <div className="text-muted text-sm">Pop/Foyer</div>
                        <div className="text-ink font-bold text-lg">{derivedMetrics.popPerHH.toFixed(1)}</div>
                    </div>
                </div>

                {/* Bouton de génération */}
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full mt-6 bg-accent hover:bg-accent-dark disabled:bg-muted disabled:cursor-wait text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Génération en cours...
                        </>
                    ) : (
                        <>
                            <Map size={20} />
                            Générer la Heatmap
                        </>
                    )}
                </button>
            </div>

            {/* Results */}
            {isCalculating && (
                <div className="bg-surface rounded-lg p-4 sm:p-12 border border-line">
                    <div className="flex flex-col items-center justify-center h-[600px]">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent border-t-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-accent font-bold text-sm">{progress}%</span>
                            </div>
                        </div>
                        <div className="text-ink mt-6 text-xl font-semibold">Calcul en cours...</div>
                        <div className="text-muted mt-2 text-sm">Génération des prédictions pour la Californie</div>

                        {/* Barre de progression */}
                        <div className="w-full max-w-md mt-6">
                            <div className="h-2 bg-raised rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {!isCalculating && <ResultsSection results={results} />}
        </div>
    );
};

// Composant Results mémoïsé pour éviter re-renders inutiles
const ResultsSection = React.memo(({ results }) => {
    if (!results) return null;

    return (
        <>
            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                    <div className="text-ink-2 text-sm mb-1">Localisations évaluées</div>
                    <div className="font-mono tabular text-2xl font-semibold text-ink">
                        {results.predictions.length.toLocaleString()}
                    </div>
                </div>
                <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                    <div className="text-ink-2 text-sm mb-1">Score moyen</div>
                    <div className="font-mono tabular text-2xl font-semibold text-ink">
                        {results.stats.mean.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
                <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                    <div className="text-ink-2 text-sm mb-1">Score médian</div>
                    <div className="font-mono tabular text-2xl font-semibold text-ink">
                        {[...results.predictions].sort((a,b)=>a-b)[Math.floor(results.predictions.length/2)].toLocaleString()}
                    </div>
                </div>
                <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                    <div className="text-ink-2 text-sm mb-1">Écart-type du score</div>
                    <div className="font-mono tabular text-2xl font-semibold text-ink">
                        {results.stats.std.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
            </div>

            {/* Heatmap */}
            <div className="bg-surface rounded-lg p-4 sm:p-6 border border-line">
                <h3 className="font-display text-xl font-semibold text-ink mb-4 flex items-center gap-2 leading-tight">
                    <Map className="text-accent" />
                    Carte du score relatif
                </h3>
                <HeatmapPlot results={results} />
            </div>
        </>
    );
}, (prevProps, nextProps) => {
    return prevProps.results === nextProps.results;
});

// Composant Heatmap avec Plotly - Scatter géographique simple
const HeatmapPlot = React.memo(({ results }) => {
    // Vérifications de sécurité
    if (!results || !results.latitudes || !results.longitudes || !results.predictions) {
        return <div className="text-signal p-4">Erreur: Données géographiques manquantes</div>;
    }

    // Le score brut est très asymétrique (moyenne ≈ 17 sur 100) : une échelle de couleur
    // linéaire écraserait la quasi-totalité des points dans le bas du dégradé. On colore
    // donc par rang centile, ce qui répartit les couleurs uniformément et rend les écarts
    // géographiques lisibles. Le score réel reste affiché au survol.
    const order = results.predictions
        .map((value, index) => [value, index])
        .sort((a, b) => a[0] - b[0]);
    const percentiles = new Array(results.predictions.length);
    const lastRank = Math.max(1, order.length - 1);
    for (let start = 0; start < order.length;) {
        let end = start;
        while (end + 1 < order.length && order[end + 1][0] === order[start][0]) end++;
        const rank = ((start + end) / 2 / lastRank) * 100;
        for (let i = start; i <= end; i++) percentiles[order[i][1]] = rank;
        start = end + 1;
    }

    const data = [{
        type: 'scatter',
        x: results.longitudes,
        y: results.latitudes,
        mode: 'markers',
        marker: {
            size: 8,
            color: percentiles,
            cmin: 0,
            cmax: 100,
            colorscale: [
                [0, '#e2eeed'],
                [0.2, '#bdd7d5'],
                [0.4, '#89b5b4'],
                [0.6, '#528e90'],
                [0.8, '#0d5e63'],
                [1, '#0a4a4e']
            ],
            showscale: true,
            colorbar: {
                title: { text: 'Rang centile', side: 'top' },
                orientation: 'h',
                y: -0.18,
                thickness: 14,
                len: 0.8
            },
            opacity: 0.8,
            line: {
                width: 0.5,
                color: 'rgba(255,255,255,0.3)'
            }
        },
        text: results.predictions.map((p, i) =>
            `Score relatif: ${Math.round(p)}/100<br>` +
            `Rang: ${Math.round(percentiles[i])}ᵉ centile<br>` +
            `Lat: ${results.latitudes[i].toFixed(2)}°<br>` +
            `Lon: ${results.longitudes[i].toFixed(2)}°`
        ),
        hovertemplate: '%{text}<extra></extra>'
    }];

    const layout = {
        title: {
            text: 'Californie — score relatif',
            font: { color: '#141a19', family: 'IBM Plex Sans, sans-serif', size: 16 },
            x: 0.5,
            xanchor: 'center'
        },
        xaxis: {
            title: 'Longitude',
            gridcolor: '#e9eee9',
            color: '#626d6a',
            zeroline: false
        },
        yaxis: {
            title: 'Latitude',
            gridcolor: '#e9eee9',
            color: '#626d6a',
            zeroline: false,
            scaleanchor: 'x',
            scaleratio: 1.3  // Ajuster le ratio pour mieux représenter la forme de la Californie
        },
        height: 600,
        margin: { t: 60, b: 100, l: 45, r: 20 },
        paper_bgcolor: '#ffffff',
        font: { family: 'IBM Plex Sans, sans-serif', color: '#3b4644', size: 14 },
        plot_bgcolor: '#f6f8f6',
        hovermode: 'closest'
    };

    const config = {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
    };

    return (
        <div className="w-full">
            <div className="mb-3 text-sm text-muted flex items-center gap-2">
                <Map size={16} />
                Chaque point représente une localisation. La couleur indique le rang centile de la zone
                dans ce scénario — le score brut étant très asymétrique, une échelle linéaire rendrait la
                carte illisible. Il s’agit d’une comparaison relative, jamais d’un prix en dollars.
            </div>

            <Plot
                key={`plot-${results.stats.mean}-${results.stats.std}`}
                data={data}
                layout={layout}
                config={config}
                className="w-full"
                useResizeHandler={true}
                style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    // Ne re-render que si les résultats changent réellement
    return prevProps.results === nextProps.results;
});

export default HousingPredictor;