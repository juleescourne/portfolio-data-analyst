import CaseStudyPage from '../components/CaseStudyPage';
import { assuranceStudy } from '../data/CaseStudies';
import AssuranceDemo from '../components/AssuranceDemo';

export default function AssurancePage({ onBack }) {
    return <CaseStudyPage study={assuranceStudy} onBack={onBack} introduction={<AssuranceDemo />} />;
}
