import color from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import Input from '@components/inputs/input';
import Upload from 'toSvg/link.svg?icon';
import './style/index.scss';
interface UploadFileModalProps {
  onUpload?: () => void;
}
export default function UploadFileModal({ onUpload }: UploadFileModalProps) {
  return (
    <div className="upload-file-modal">
      <Header title="Upload a document" buttonNode={<SquareIconButton />} />
      <Input
        trailing={
          <TextButton
            padding={7}
            backgroundColor={color.cold_blue}
            Icon={
              <Upload
                css={{ transform: 'rotate(-45deg)' }}
                width={20}
                height={10}
              />
            }
          />
        }
        type={'text'}
      />
      <TextButton
        text="Upload"
        backgroundColor={color.good_green}
        width="fit-content"
        alignSelf="center"
        padding={'5px 10px'}
        fontSize={12}
        onPress={onUpload} //TODO? upload function
      />
    </div>
  );
}
