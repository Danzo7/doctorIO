import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import './style/index.scss';
import Croppers from 'react-easy-crop';
import Slider from '@components/inputs/slider';
import { useCallback, useState } from 'react';
import { Area, Point } from 'react-easy-crop/types';
import { useSetAvatarMutation } from '@redux/clinic/rbac/member/memberApi';
import { getImageFile } from '@helpers/image.helper';
import { modal } from '@libs/overlay';

interface CropPictureModalProps {
  src: string;
}
export default function CropPictureModal({ src }: CropPictureModalProps) {
  const [state, setState] = useState<{
    crop: Point;
    zoom: number;
    aspect: number;
    cropArea?: Area;
  }>({
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });

  const onCropChange = (crop: { x: number; y: number }) => {
    setState((prevState) => ({ ...prevState, crop }));
  };
  const onCropComplete = async (_: Area, croppedAreaPixels: Area) => {
    setState((prevState) => ({ ...prevState, cropArea: croppedAreaPixels }));
  };

  const onZoomChange = (zoom: number) => {
    setState((prevState) => ({ ...prevState, zoom }));
  };
  const [setAvatar, { isLoading, error, isError }] = useSetAvatarMutation();
  const serverError: ServerError | undefined = (error as any)
    ?.data as ServerError;
  const [internalError, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const upload = useCallback(() => {
    setIsProcessing(true);
    if (!state.cropArea) return;
    getImageFile(src, state.cropArea)
      .then((blob) => {
        if (!blob) return setError('Something went wrong');
        const data = new FormData();
        data.append('file', blob);
        setAvatar({ data })
          .unwrap()
          .then(() => modal.close('avatarCropper'));
      })
      .catch((err) => {
        setError(err.message);
        setIsProcessing(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsProcessing(false);
      });
  }, [setAvatar, src, state.cropArea]);

  return (
    <ModalContainer
      title="Crop profile picture"
      className="crop-picture-modal"
      controls={
        <TextButton
          disabled={isLoading || isProcessing}
          backgroundColor={color.good_green}
          fontSize={14}
          fontWeight={700}
          width={'100%'}
          blank
          type="submit"
          text="Save"
          onPress={upload}
        />
      }
    >
      <div className="crop-content">
        {isError && <span>{serverError?.message}</span>}
        {internalError.length > 0 && <span>{internalError}</span>}
        <div
          css={{
            position: 'relative',
            width: 300,
            height: 300,
            alignSelf: 'center',
          }}
        >
          <Croppers
            image={src}
            crop={state.crop}
            zoom={state.zoom}
            aspect={state.aspect}
            cropShape="round"
            objectFit="vertical-cover"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>
        <Slider
          min={1}
          max={3}
          step={0.1}
          value={state.zoom}
          onChange={(e) => onZoomChange(e)}
        />
      </div>
    </ModalContainer>
  );
}
