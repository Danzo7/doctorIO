import TextButton from '@components/buttons/text_button';
import './style/index.scss';
import ImageItem from '../image_item';
import { color } from '@assets/styles/color';
import VerticalPanel from '@components/vertical_panel';
import { getImageFile } from '@helpers/image.helper';
import {
  useGetImagesQuery,
  useUploadImageMutation,
} from '@redux/clinic/cloud/cloudApi';
import ModalContainer from '@components/modal_container';
import { CLOUD_PATH } from '@constants/resources';
import { useConnectionStore } from '@stores/ConnectionStore';

interface ImageGalleryProps {
  onSelect?: (url: string) => void;
}
export default function ImageGallery({ onSelect }: ImageGalleryProps) {
  const [uploadImage, respond] = useUploadImageMutation();

  const uploadLocalImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.click();
    input.onchange = (_) => {
      const files: FileList = input.files as FileList;
      getImageFile(URL.createObjectURL(files[0])).then((blob) => {
        //todo handle error
        if (!blob) return;
        const data = new FormData();
        data.append('file', blob);
        uploadImage({ data });
      });
    };
  };
  const { data, isLoading, isSuccess } = useGetImagesQuery();
  return (
    <ModalContainer
      title="Choose an image"
      isLoading={isLoading}
      className="image-gallery"
      controls={
        <TextButton
          text="Add local image"
          fontSize={14}
          fontColor={color.white}
          fontWeight={400}
          onPress={uploadLocalImage}
          disabled={respond.isLoading}
        />
      }
    >
      {isSuccess ? (
        data.length > 0 ? (
          <div className="images-container">
            {data.map((id, index) => (
              <ImageItem
                key={index}
                url={useConnectionStore.getState().getUrl() + CLOUD_PATH + id}
                onAdd={() => {
                  onSelect?.(
                    useConnectionStore.getState().getUrl() + CLOUD_PATH + id,
                  );
                }}
              />
            ))}
          </div>
        ) : (
          <VerticalPanel
            title="No images were found"
            description="Please start add image locally. "
            action={{ text: 'Add local image', onClick: uploadLocalImage }}
            backgroundColor="none"
          />
        )
      ) : (
        <div>error</div>
      )}
    </ModalContainer>
  );
}
