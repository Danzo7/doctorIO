import { useState } from 'react';
import { Area, Point } from 'react-easy-crop/types';
import Croppers from 'react-easy-crop';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { getImageFile } from './getImageFile';
import Slider from '@components/inputs/slider';

interface CropperProps {
  onSave: (image: FormData) => void;
  src: string;
}
export default function Cropper({ onSave, src }: CropperProps) {
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
    <div className="cropper">
      <div css={{ position: 'relative', width: 300, height: 300 }}>
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
      <TextButton
        text="Save"
        onPress={async () => {
          if (!state.cropArea) return;
          const fd = await getImageFile(src, state.cropArea);
          if (!fd) return;
          onSave(fd);
        }}
      />
    </div>
  );
}
