import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import add from 'toSvg/add.svg?icon';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Data = {
  keywordName: string;
  keywordValue: string;
};

const schema = z.object({
  keywordName: z.string().min(3),
  keywordValue: z.string().min(3),
});
interface EditKeywordValueModalProps {}
export default function EditKeywordValueModal({}: EditKeywordValueModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { keywordName: '', keywordValue: '/' },
  });
  return (
    <div className="edit-keyword-value-modal">
      <ModalContainer
        title="Edit keyword value"
        controls={
          <div css={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <TextButton
              text={'Save'}
              backgroundColor={color.good_green}
              radius={7}
              fontSize={14}
              width={'60%'}
              blank
              type="submit"
            />
          </div>
        }
      >
        <div className="edit-keyword-value-inputs">
          <Input
            label="Text"
            type={'textarea'}
            name="keywordName"
            fillContainer
            placeholder="write something..."
            control={control}
            errorMessage={errors.keywordValue?.message}
          />

          <TextButton
            text="add auto value"
            Icon={add}
            afterBgColor={color.darkersec_color}
            fontSize={14}
            fontWeight={500}
            radius={7}
            padding={10}
            borderColor={color.silver_gray}
            onPress={() => {}}
          />
          <Input
            label="Text"
            type={'text'}
            name="keywordValue"
            fillContainer
            control={control}
            errorMessage={errors.keywordValue?.message}
          />
        </div>
      </ModalContainer>
    </div>
  );
}
