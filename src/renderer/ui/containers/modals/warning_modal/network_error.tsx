/* eslint-disable react/jsx-no-undef */
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import { StaticQueries } from '@redux/dynamic_queries';
import { disconnect, refresh } from '@redux/local/connectionStateSlice';
import { useAppSelector } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WarningModal from './WarningModal';

export default function NetworkError({ errorMsg }: { errorMsg?: string }) {
  const dispatch = useDispatch();
  const { state } = useAppSelector((st) => st.connectionState);

  useEffect(() => {
    if (state == 'reconnecting' || state == 'connecting')
      (async () => {
        await StaticQueries.refreshAll();
      })();
  }, [dispatch, state]);
  return (
    <WarningModal
      title={
        state == 'reconnecting' || state == 'connecting'
          ? 'Trying to connect...'
          : 'Network error'
      }
      description={
        errorMsg ??
        (state == 'unreachable'
          ? 'The server is not responding. make sure the server is running'
          : '')
      }
    >
      {state == 'reconnecting' || state == 'connecting' ? (
        <LoadingSpinner />
      ) : (
        <>
          <TextButton
            text="Retry"
            backgroundColor={color.good_green}
            onPress={() => {
              dispatch(refresh());
            }}
          />
          <TextButton
            text="Disconnect"
            backgroundColor={color.hot_red}
            onPress={() => disconnect(dispatch)}
          />
        </>
      )}
    </WarningModal>
  );
}
