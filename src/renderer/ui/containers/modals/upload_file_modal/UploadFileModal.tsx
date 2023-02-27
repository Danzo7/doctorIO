import { color } from '@assets/styles/color';
import IconicButton from '@components/buttons/iconic_button';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import ModalContainer from '@components/modal_container';
import { modal } from '@libs/overlay';
import { useUploadFileMutation } from '@redux/instance/record/medical_document_api';
import { useState } from 'react';
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
  const { control, handleSubmit, reset, watch } = useForm<IFile>({
    //  resolver: zodResolver(schema),
  });
  const [uploadFile, { isLoading, error }] = useUploadFileMutation();
  const serverError: ServerError | undefined = (error as any)
    ?.data as ServerError;
  const files = watch('files');
  const [internalError, setError] = useState('');
  const onSubmit: SubmitHandler<IFile> = (data) => {
    if (data.files.length === 0) return;
    const fd = new FormData();
    fd.append('file', data.files[0]);
    uploadFile({ patientId, data: fd }).then((result) => {
      if ('data' in result) {
        reset();
        modal.close();
      } else {
        const castedErr = (result.error as any)?.data as ServerError;
        if (castedErr?.errorCode == 1201)
          setError(
            'The file must be a pdf or an image, with a maximum size of 25MB',
          );
        else setError('An error occurred, please try again');
      }
    });
  };

  return (
    <ModalContainer
      onSubmit={handleSubmit(onSubmit)}
      title="Upload a document"
      gap={10}
      controls={
        <TextButton
          text={isLoading ? 'Uploading...' : 'Upload'}
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
        type={'file'}
        control={control}
        name="files"
        disabled={isLoading}
        trailing={
          <IconicButton
            tip="Upload"
            blank
            width={25}
            radius={7}
            backgroundColor={color.cold_blue}
            Icon={<Upload css={{ transform: 'rotate(-45deg)' }} />}
          />
        }
        onChange={() => {
          if (internalError.length > 0) setError('');
        }}
        errorMessage={
          internalError.length > 0 ? internalError : serverError?.message
        }
      />
    </ModalContainer>
  );
}
