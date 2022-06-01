import { Route, Routes } from 'react-router-dom';
import Record from './pages/record/Record';
import RecordSearch from './pages/recordSearch/RecordSearch';
interface RecordsRouterProps {}
export default function Records({}: RecordsRouterProps) {
  return (
    <Routes>
      <Route path="" element={<RecordSearch />} />
      <Route path=":patientId" element={<Record />} />
    </Routes>
  );
}
