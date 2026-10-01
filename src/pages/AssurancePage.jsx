import CaseStudyPage from '../components/CaseStudyPage';
import { assuranceStudy } from '../data/CaseStudies';

export default function AssurancePage({ onBack }) {
    return <CaseStudyPage study={assuranceStudy} onBack={onBack} />;
}
