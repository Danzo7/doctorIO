import LoadingSpinner from '@components/loading_spinner';

import { NetworkError } from '@containers/modals/warning_modal';
import MedicalSession from '@layers/medical_session';
import { STOP_MODAL } from '@libs/overlay';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import { StaticQueries } from '@redux/dynamic_queries';
import { useAppSelector } from '@store';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './app_layout';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  const { state } = useAppSelector((st) => st.connectionState); //check if url is alive
  useEffect(() => {
    if (!state)
      (async () => {
        console.log('checking url');
        await StaticQueries.initAll();
      })();
  }, [state]);

  return state == undefined ? (
    <LoadingSpinner />
  ) : state == 'connected' ? (
    <Routes>
      <Route path="session" element={<MedicalSession />} />
      <Route path="*" element={<AppLayout />} />
    </Routes>
  ) : (
    <ModalPortal {...STOP_MODAL}>
      <NetworkError />
    </ModalPortal>
  );
}
