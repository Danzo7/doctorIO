import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { NetworkError } from '@containers/modals/warning_modal';
import MedicalSession from '@layers/medical_session';
import { STOP_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import { useOverlay } from '@libs/overlay/useOverlay';
import { StaticQueries } from '@redux/dynamic_queries';
import { useAppSelector } from '@store';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  const { selectedClinic, clinic } = useAppSelector((state) => state.user);
  const [isWorking, setIsWorking] = useState(false);
  //check if url is alive
  useEffect(() => {
    if (selectedClinic && clinic) {
      (async () => {
        const res = await fetch(
          'http://' + clinic[selectedClinic].serverLocation + '/status',
        );
        setIsWorking(res.ok);
      })();
    }
  }, [clinic, selectedClinic]);

  return isWorking ? (
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
      <NetworkError errorMsg="The server is not responding. make sure the server is running" />
    </ModalPortal>
  );
}
