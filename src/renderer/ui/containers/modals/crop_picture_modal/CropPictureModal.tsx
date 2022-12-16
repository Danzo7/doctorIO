import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import './style/index.scss';
import Croppers from 'react-easy-crop';
import Slider from '@components/inputs/slider';
import { useState } from 'react';
import { Area, Point } from 'react-easy-crop/types';
import { getImageFile } from '@components/cropper/getImageFile';

interface CropPictureModalProps {
  onSave: (image: FormData) => void;
  src: string;
}
export default function CropPictureModal({
  onSave,
  src,
}: CropPictureModalProps) {
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
  return (
    <ModalContainer
      title="Crop profile picture"
      className="crop-picture-modal"
      controls={
        <TextButton
          backgroundColor={color.good_green}
          fontSize={14}
          fontWeight={700}
          width={'100%'}
          blank
          type="submit"
          text="Save"
          onPress={async () => {
            if (!state.cropArea) return;
            const fd = await getImageFile(src, state.cropArea);

            if (!fd) return;
            onSave(fd);
          }}
        />
      }
    >
      <div className="crop-content">
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
