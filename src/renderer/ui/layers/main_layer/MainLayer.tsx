import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { NetworkError } from '@containers/modals/warning_modal';
import MedicalSession from '@layers/medical_session';
import { STOP_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import { StaticQueries } from '@redux/dynamic_queries';
import { useAppSelector } from '@store';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  const { state } = useAppSelector((st) => st.connectionState); //check if url is alive
  useEffect(() => {
    (async () => {
      await StaticQueries.initAll();
    })();
  }, []);

  return state == undefined ? (
    <LoadingSpinner />
  ) : state == 'connected' ? (
    <Routes>
      <Route path="session" element={<MedicalSession />} />
      <Route
        path="*"
        element={
          <>
            <AppMenu />
            <AppContent />
            <AppSidebar />
          </>
        }
      />
    </Routes>
  ) : (
    <ModalPortal {...STOP_MODAL}>
      <NetworkError />
    </ModalPortal>
  );
}
