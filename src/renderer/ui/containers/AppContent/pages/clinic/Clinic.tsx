import { useClinicsStore } from '@stores/clinicsStore';
import { Routes, Route } from 'react-router-dom';
import Clinics from './pages/clinics';
import ClinicSettings from './pages/clinic_settings';
interface ClinicProps {}
export default function Clinic({}: ClinicProps) {
  const selected = useClinicsStore((state) => state.clinicData.selected);
  return selected != undefined ? (
    <Routes>
      <Route path="all" element={<Clinics />} />
      <Route path="/*" element={<ClinicSettings />} />
    </Routes>
  ) : (
    <Clinics />
  );
}
