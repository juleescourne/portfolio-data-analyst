import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { getImageUrl } from '../utils/assetsConfig';
export default function DashboardImage({dashboard,onImageClick}) {
 const [error,setError]=useState(false);
 return <article className="bg-paper border border-line rounded-lg p-4 sm:p-6"><h3 className="font-display text-2xl font-semibold mb-4">{dashboard.title}</h3>
 {error?<p className="text-muted p-6">La capture ne se charge pas sur ce réseau. Les analyses restent disponibles ci-dessous.</p>:<button className="block w-full text-left" onClick={()=>onImageClick(getImageUrl(dashboard.path))} aria-label={`Agrandir : ${dashboard.title}`}><img src={getImageUrl(dashboard.path)} alt={dashboard.title} width={dashboard.width} height={dashboard.height} loading="lazy" onError={()=>setError(true)} className="w-full h-auto border border-line rounded"/><span className="inline-flex items-center gap-2 text-accent text-sm mt-2"><ZoomIn size={16}/>Agrandir la capture historique</span></button>}
 <div className="grid lg:grid-cols-3 gap-4 mt-5">{dashboard.insights.map(insight=><div className="bg-surface border border-line p-4 rounded" key={insight.title}><h4 className="font-semibold text-accent mb-2">{insight.title}</h4><p className="text-sm text-ink-2 leading-relaxed">{insight.content}</p></div>)}</div></article>;
}
