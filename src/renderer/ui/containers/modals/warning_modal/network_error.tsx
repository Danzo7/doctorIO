/* eslint-disable react/jsx-no-undef */
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import { StaticQueries } from '@redux/dynamic_queries';
import { disconnect } from '@redux/local/user/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import WarningModal from './WarningModal';

export default function NetworkError({ errorMsg }: { errorMsg: string }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoading)
      (async () => {
        await StaticQueries.refreshAll();
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })();
  }, [isLoading]);
  const dispatch = useDispatch();
  return (
    <WarningModal title="Network error" description={errorMsg}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TextButton
            text="Retry"
            backgroundColor={color.good_green}
            onPress={() => setIsLoading(true)}
          />
          <TextButton
            text="Disconnect"
            backgroundColor={color.hot_red}
            onPress={() => dispatch(disconnect())}
          />
        </>
      )}
    </WarningModal>
  );
}
