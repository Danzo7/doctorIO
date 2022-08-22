import { useAppSelector } from '@store';
import { Routes, Route } from 'react-router-dom';
import Clinics from './pages/clinics';
import ClinicSettings from './pages/clinic_settings';
interface ClinicProps {}
export default function Clinic({}: ClinicProps) {
  const user = useAppSelector((state) => state.user);

  return user?.selectedClinic ? (
    <Routes>
      <Route path="all" element={<Clinics />} />
      <Route path="/*" element={<ClinicSettings />} />
    </Routes>
  ) : (
    <Clinics />
  );
}
