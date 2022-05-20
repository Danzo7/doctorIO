import { Routes, Route } from 'react-router-dom';
import Clinics from './pages/clinics';
import ClinicSettings from './pages/clinic_settings';
interface ClinicProps {}
export default function Clinic({}: ClinicProps) {
  return (
    <Routes>
      <Route path="/all" element={<Clinics selected={1} />} />
      <Route path="/*" element={<ClinicSettings />} />
    </Routes>
  );
}
