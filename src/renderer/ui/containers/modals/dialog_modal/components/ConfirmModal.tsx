import { ComponentProps } from 'react';
import AlertModal from '../AlertModal';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';

type ConfirmModalProps = Omit<ComponentProps<typeof AlertModal>, 'controls'> & {
  onConfirm: () => void;
  onCancel: () => void;
  action?: 'critical' | 'normal';
};

export default function ConfirmModal({
  status,
  title,
  description,
  action = 'critical',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <AlertModal
      status={status}
      title={title}
      description={description}
      controls={
        <>
          <TextButton
            text="Confirm"
            backgroundColor={
              action == 'critical' ? color.hot_red : color.cold_blue
            }
            onPress={onConfirm}
          />
          <TextButton
            text="Cancel"
            backgroundColor={color.light}
            onPress={onCancel}
          />
        </>
      }
    />
  );
}
