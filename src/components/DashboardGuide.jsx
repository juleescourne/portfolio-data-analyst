import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Minus, Plus, X } from 'lucide-react';
import { getImageUrl } from '../utils/assetsConfig';

export default function DashboardGuide({ steps, folder, title, tabsLabel, duration, caption, width, height, tabsClass }) {
    const [active, setActive] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const dialog = useRef(null);
    const tabs = useRef([]);
    const step = steps[active];

    useEffect(() => {
        if (!expanded) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [expanded]);

    const openImage = () => {
        setZoom(1);
        dialog.current.showModal();
        setExpanded(true);
    };
    const moveTab = (event, index) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
        if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = steps.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        setActive(next);
        tabs.current[next].focus();
    };

    return (
        <section aria-labelledby="guide-title" className="mt-14">
            <div className="flex flex-wrap justify-between items-end gap-3 mb-5">
                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-widest mb-2">Le rapport, étape par étape</p>
                    <h2 id="guide-title" className="font-display text-3xl text-ink">{title}</h2>
                </div>
                <span className="text-muted text-sm">Lecture guidée · {duration}</span>
            </div>
            <div role="tablist" aria-label={tabsLabel} className={`grid ${tabsClass} gap-2 mb-6`}>
                {steps.map((item, index) => (
                    <button key={item.id} ref={el => { tabs.current[index] = el; }} role="tab"
                        id={`tab-${item.id}`} aria-selected={index === active} aria-controls={`panel-${item.id}`}
                        tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => moveTab(event, index)}
                        className={`text-left rounded-lg px-4 py-3 border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${index === active ? 'bg-accent text-white border-accent' : 'bg-surface text-ink-2 border-line hover:border-accent'}`}>
                        <span className={`block font-mono text-xs mb-1 ${index === active ? 'text-white/75' : 'text-muted'}`}>0{index + 1}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
            <article role="tabpanel" id={`panel-${step.id}`} aria-labelledby={`tab-${step.id}`} tabIndex={0}
                className="bg-surface border border-line rounded-xl overflow-hidden focus-visible:outline-accent">
                <div className="px-5 sm:px-8 pt-6 pb-5">
                    <p className="font-mono text-xs text-muted mb-2">ÉTAPE {active + 1} / {steps.length}</p>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">{step.title}</h3>
                </div>
                <figure className="px-3 sm:px-6">
                    <button onClick={openImage} aria-label={`Agrandir le dashboard ${step.label}`}
                        className="block w-full rounded-lg border border-line overflow-hidden bg-paper cursor-zoom-in focus-visible:outline-accent">
                        <img src={getImageUrl(`${folder}/${step.image}.webp`)} alt={`Dashboard Power BI ${step.label}. Les principaux constats sont détaillés sous la capture.`}
                            width={width} height={height} className="block w-full h-auto" />
                    </button>
                    <figcaption className="flex flex-wrap justify-between gap-2 py-3 text-xs text-muted">
                        <span>{caption}</span>
                        <button onClick={openImage} className="inline-flex items-center gap-1.5 text-accent font-medium hover:underline">
                            <Maximize2 size={14} aria-hidden="true" /> Agrandir et zoomer
                        </button>
                    </figcaption>
                </figure>
                <div className="px-5 sm:px-8 pt-3 pb-7">
                    <p className="border-l-4 border-accent bg-accent-soft rounded-r-md px-4 py-3 text-accent-dark font-medium text-lg">{step.highlight}</p>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {[['Constat', step.observation], ['Interprétation', step.interpretation], ['Suite proposée', step.next]].map(([label, value]) => (
                            <div key={label}><h4 className="text-xs uppercase tracking-widest font-mono text-accent mb-2">{label}</h4><p className="text-ink-2 text-sm leading-relaxed">{value}</p></div>
                        ))}
                    </div>
                    <p className="mt-6 pt-4 border-t border-line text-sm leading-relaxed text-muted">{step.note}</p>
                </div>
            </article>
            <div className="flex justify-between items-center gap-3 mt-4">
                <button disabled={active === 0} onClick={() => setActive(active - 1)} className="inline-flex items-center gap-2 text-sm text-accent border border-line rounded-md px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-soft"><ArrowLeft size={16} aria-hidden="true" />Précédent</button>
                <span aria-live="polite" className="text-xs text-muted">{active + 1} sur {steps.length}</span>
                <button disabled={active === steps.length - 1} onClick={() => setActive(active + 1)} className="inline-flex items-center gap-2 text-sm text-accent border border-line rounded-md px-3 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-soft">Suivant<ArrowRight size={16} aria-hidden="true" /></button>
            </div>
            <p className="text-xs text-muted mt-4">Les captures sont consultables sans compte Power BI. Pour manipuler les filtres, le projet Power BI Desktop est disponible dans les livrables ci-dessous.</p>
            <dialog ref={dialog} onClose={() => setExpanded(false)} aria-labelledby="dashboard-dialog-title"
                className="m-auto p-0 w-[96vw] max-w-[1600px] h-[92vh] max-h-[92vh] rounded-xl border border-line bg-paper text-ink backdrop:bg-ink/80">
                {expanded && <div className="flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-3 p-4 border-b border-line bg-surface">
                        <h2 id="dashboard-dialog-title" className="font-medium text-sm mr-auto">Dashboard {active + 1} · {step.label}</h2>
                        <div className="flex items-center gap-2">
                            <button aria-label="Réduire le zoom" disabled={zoom === 1} onClick={() => setZoom(Math.max(1, zoom - 0.5))} className="p-2 border border-line rounded disabled:opacity-40"><Minus size={18} /></button>
                            <span className="text-xs tabular-nums w-10 text-center">{zoom * 100} %</span>
                            <button aria-label="Augmenter le zoom" disabled={zoom === 3} onClick={() => setZoom(Math.min(3, zoom + 0.5))} className="p-2 border border-line rounded disabled:opacity-40"><Plus size={18} /></button>
                            <button autoFocus onClick={() => dialog.current.close()} aria-label="Fermer le dashboard agrandi" className="p-2 border border-line rounded ml-1"><X size={18} /></button>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 overflow-auto p-2" tabIndex={0} aria-label="Capture agrandie, défilement horizontal et vertical">
                        <img src={getImageUrl(`${folder}/${step.image}-large.webp`)} alt={`Vue détaillée du dashboard ${step.label}`} style={{ width: `${zoom * 100}%`, maxWidth: 'none' }} className="h-auto" />
                    </div>
                </div>}
            </dialog>
        </section>
    );
}
