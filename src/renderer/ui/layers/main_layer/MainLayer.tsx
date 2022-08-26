import LoadingSpinner from '@components/loading_spinner';
import AppContent from '@containers/AppContent';
import AppMenu from '@containers/AppMenu';
import AppSidebar from '@containers/AppSidebar';
import { NetworkError } from '@containers/modals/warning_modal';
import MedicalSession from '@layers/medical_session';
import { STOP_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';

import { useAppSelector } from '@store';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  const { selectedClinic, clinic } = useAppSelector((state) => state.user);
  const [isWorking, setIsWorking] = useState<boolean | undefined>(undefined);
  //check if url is alive
  useEffect(() => {
    if (selectedClinic && clinic) {
      (async () => {
        try {
          const res = await fetch(
            'http://' + clinic[selectedClinic].serverLocation + '/status',
          );
          setIsWorking(res.ok);
        } catch (e) {
          setIsWorking(false);
        }
      })();
    }
  }, [clinic, selectedClinic]);
  console.log('isWorking', isWorking);
  return isWorking == undefined ? (
    <LoadingSpinner />
  ) : isWorking ? (
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
