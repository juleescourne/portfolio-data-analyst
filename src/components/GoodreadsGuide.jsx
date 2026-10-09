import DashboardGuide from './DashboardGuide';
import { goodreadsSteps } from '../data/GoodreadsGuide';

export default function GoodreadsGuide() {
    return <DashboardGuide steps={goodreadsSteps} folder="goodreads"
        title="Trois dashboards pour préparer une sélection"
        tabsLabel="Les trois dashboards Goodreads" duration="environ 3 minutes"
        caption="Capture du rapport Power BI · PDF fourni le 9 octobre 2026 · filtres sur « Tout »"
        width={1484} height={1125} tabsClass="grid-cols-1 sm:grid-cols-3" />;
}
