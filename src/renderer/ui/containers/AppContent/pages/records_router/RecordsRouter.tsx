import { Route, Routes } from 'react-router-dom';
import Record from './pages/record/Record';
import Records from './pages/records/Records';
import './style/index.scss';
interface RecordsRouterProps {}
export default function RecordsRouter({}: RecordsRouterProps) {
  return (
    <Routes>
      <Route path="" element={<Records />} />
      <Route path=":patientId" element={<Record />} />
    </Routes>
  );
}
