/* eslint-disable react/jsx-no-undef */
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import LoadingSpinner from '@components/loading_spinner';
import { StaticQueries } from '@redux/dynamic_queries';
import { disconnect, refresh } from '@redux/local/connectionStateSlice';
import { useAppSelector } from '@store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import WarningModal from './WarningModal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@components/inputs/input';
import { useClinicsStore } from '@stores/clinicsStore';
const schema = z.object({
  ip: z
    .string()
    .regex(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      'Please enter a valid IP address',
    ),
});
export default function NetworkError({ errorMsg }: { errorMsg?: string }) {
  const dispatch = useDispatch();
  const { state } = useAppSelector((st) => st.connectionState);
  const [isEditAdr, setEditAdr] = useState(false);
  const clinicStore = useClinicsStore();
  const { control, handleSubmit } = useForm<{ ip: string }>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (state == 'reconnecting' || state == 'connecting')
      (async () => {
        await StaticQueries.initAll();
      })();
  }, [state]);
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
      content={
        isEditAdr && clinicStore.hasSelectedClinic() ? (
          <Input
            control={control}
            name="ip"
            type="text"
            defaultValue={clinicStore.getSelectedClinic().serverLocation}
            trailing={
              <TextButton
                backgroundColor={color.cold_blue}
                onPress={handleSubmit((data) => {
                  clinicStore.setCurrentLocation(data.ip);
                  dispatch(refresh());
                  setEditAdr(false);
                })}
                text="Save"
              />
            }
          />
        ) : null
      }
    >
      {state == 'reconnecting' || state == 'connecting' ? (
        <div css={{ flexGrow: 1 }}>
          <LoadingSpinner />
        </div>
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
          <TextButton
            text="change"
            //backgroundColor={color.hot_red}
            onPress={() => setEditAdr(true)}
          />
        </>
      )}
    </WarningModal>
  );
}
