import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import Upload from 'toSvg/link.svg?icon';

interface UploadFileModalProps {
  onUpload?: () => void;
}
export default function UploadFileModal({ onUpload }: UploadFileModalProps) {
  return (
    <ModalContainer
      title="Upload a document"
      gap={10}
      controls={
        <TextButton
          text="Upload"
          backgroundColor={color.good_green}
          width="fit-content"
          alignSelf="center"
          padding={'5px 10px'}
          fontSize={12}
          onPress={onUpload} //TODO? upload function
        />
      }
    >
      <Input
        trailing={
          <IconicButton
            blank
            width={25}
            radius={7}
            backgroundColor={color.cold_blue}
            Icon={<Upload css={{ transform: 'rotate(-45deg)' }} />}
          />
        }
        type={'file'}
      />
    </ModalContainer>
  );
}
