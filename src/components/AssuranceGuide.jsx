import DashboardGuide from './DashboardGuide';
import { assuranceSteps } from '../data/AssuranceGuide';

export default function AssuranceGuide() {
    return <DashboardGuide steps={assuranceSteps} folder="assurance"
        title="Cinq dashboards pour orienter l’investigation"
        tabsLabel="Les cinq dashboards Assurance" duration="environ 5 minutes"
        caption="Capture du rapport · PDF fourni le 9 octobre 2026 · filtres sur « Tout »"
        width={1484} height={1016} tabsClass="grid-cols-2 sm:grid-cols-5" />;
}
