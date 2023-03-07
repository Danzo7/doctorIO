import ModalContainer from '@components/modal_container';
import './style/index.scss';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
interface ImageViewerProps {
  file: Blob;
  fileName: string;
}
export default function ImageViewer({ file, fileName }: ImageViewerProps) {
  const url = window.URL.createObjectURL(file);
  return (
    <ModalContainer
      className="image-viewer"
      title={fileName}
      titleMaxWidth={400}
      css={{ flexGrow: 1 }}
      controlsPosition="end"
      controls={
        <TextButton
          onPress={() => {
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          }}
          backgroundColor={color.good_green}
          text="Download"
          alignSelf="flex-end"
        />
      }
    >
      <div className="image-div">
        <img src={url} alt={fileName} />
      </div>
    </ModalContainer>
  );
}
