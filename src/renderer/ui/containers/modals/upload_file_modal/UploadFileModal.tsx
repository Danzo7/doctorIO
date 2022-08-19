import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { ServerError } from '@models/instance.model';
import { useUploadFileMutation } from '@redux/instance/record/medical_document_api';
import { SubmitHandler, useForm } from 'react-hook-form';
import Upload from 'toSvg/link.svg?icon';
import { z, TypeOf } from 'zod';

const schema = z.object({
  files: z.array(z.instanceof(File)),
});
type IFile = TypeOf<typeof schema>;

interface UploadFileModalProps {
  patientId: number;
}
export default function UploadFileModal({ patientId }: UploadFileModalProps) {
  const { register, handleSubmit, reset, watch } = useForm<IFile>({
    //  resolver: zodResolver(schema),
  });
  const [uploadFile, { isLoading, isSuccess, error }] = useUploadFileMutation();
  const serverError: ServerError | undefined = (error as any)
    ?.data as ServerError;
  const files = watch('files');

  const onSubmit: SubmitHandler<IFile> = (data) => {
    if (data.files.length === 0) return;
    const fd = new FormData();
    fd.append('file', data.files[0]);
    uploadFile({ patientId, data: fd }).then(() => {
      reset();
    });
  };
  //UI better handle errors / change button color to red on error for 1sec with scss animation / disable btn if input is empty / show error msg on error
  //UI add a notification overlay when upload success
  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="Upload a document"
      gap={10}
      controls={
        <TextButton
          text={
            isLoading //FIXME loading sometimes stuck
              ? 'Uploading...'
              : 'Upload'
          }
          disabled={isLoading || files?.length == undefined}
          backgroundColor={color.good_green}
          width="fit-content"
          type="submit"
          alignSelf="center"
          padding={'5px 10px'}
          fontSize={12}
          blank
        />
      }
    >
      <Input
        errorMsg={serverError?.message as string}
        type={'file'}
        {...register('files')}
        trailing={
          <IconicButton
            blank
            width={25}
            radius={7}
            backgroundColor={color.cold_blue}
            Icon={<Upload css={{ transform: 'rotate(-45deg)' }} />}
          />
        }
      />
    </ModalContainer>
  );
}
