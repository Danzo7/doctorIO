import LoadingSpinner from '@components/loading_spinner';

import { NetworkError } from '@containers/modals/warning_modal';
import MedicalSession from '@layers/medical_session';
import { ModalPortal } from '@libs/overlay/OverlayContainer';
import { useConnectionStore } from '@stores/ConnectionStore';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './app_layout';
import TextEditor from '@components/text_editor';

interface MainLayerProps {}
export default function MainLayer({}: MainLayerProps) {
  const { status, connect } = useConnectionStore();
  useEffect(() => {
    if (!status)
      (async () => {
        connect();
      })();
  }, [connect, status]);

  return status == undefined ? (
    <LoadingSpinner />
  ) : status == 'connected' ? (
    <Routes>
      <Route path="session" element={<MedicalSession />} />
      <Route
        path="templateEditor"
        element={
          <TextEditor
            initialValue={[
              {
                type: 'p',
                children: [{ text: 'This is editable ' }],
              },
            ]}
          />
        }
      />
      <Route path="*" element={<AppLayout />} />
    </Routes>
  ) : (
    <ModalPortal style={{ minWidth: '30%' }} isDimmed>
      <NetworkError />
    </ModalPortal>
  );
}
