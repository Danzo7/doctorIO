import CertificateEditor from '@components/certificates_editor';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import color from '@assets/styles/color';
import Input from '@components/inputs/input';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CommonEditor } from '@libs/slate_editor/commons/CommonEditor';
import {
  useAddCertificateTemplateMutation,
  useGetCertificateTemplateByIdQuery,
  useUpdateCertificateTemplateMutation,
} from '@redux/clinic/templates/templatesApi';
import { Descendant } from 'slate';
import { Overlay_u } from '@stores/overlayStore';
import { MedicalCertificate } from '@models/instance.model';

const schema = z.object({
  title: z.string().min(8).max(100),
});
type Inputs = { title: string };

interface AddNewCertificateModalProps {
  defaultValue?: Omit<MedicalCertificate, 'description'>;
}
export default function AddNewCertificateModal({
  defaultValue,
}: AddNewCertificateModalProps) {
  const [addCertificateTemplate] = useAddCertificateTemplateMutation();
  const { isLoading, isSuccess, data } = useGetCertificateTemplateByIdQuery(
    Number(defaultValue?.id),
    {
      skip: !defaultValue,
    },
  );
  const [updateCertificateTemplate] = useUpdateCertificateTemplateMutation();
  const [error, setError] = useState<string | undefined>(undefined);
  const editorControllerRef = useRef<Descendant[]>();
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: defaultValue?.title ?? ' ',
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = ({ title }) => {
    if (!editorControllerRef.current) {
      return;
    }
    const jsonString = JSON.stringify(editorControllerRef.current);
    if (defaultValue) {
      updateCertificateTemplate({
        id: Number(defaultValue.id),
        body: { title: title, template: jsonString },
      });
    } else {
      addCertificateTemplate({
        title: title,
        template: jsonString,
      });
    }

    Overlay_u.close();
  };
  return (
    <div className="add-new-certificate-modal">
      <ModalContainer
        isLoading={defaultValue == undefined ? undefined : isLoading}
        title="Medical certificate"
        onSubmit={handleSubmit(onSubmit)}
        controlsPosition="end"
        controls={
          <TextButton
            text={defaultValue ? 'Update' : 'Save'}
            backgroundColor={color.good_green}
            fontSize={14}
            blank
            type="submit"
          />
        }
      >
        <div className="certificate-editor-inputs">
          <Input label="Title" control={control} name="title" type={'text'} />

          <div className="certificate-editor-wrapper">
            <span>Content</span>
            <CertificateEditor
              defaultValue={
                defaultValue != undefined && isSuccess
                  ? data.template
                  : undefined
              }
              error={error}
              onChange={(value) => {
                if (CommonEditor.isEmptyElements(value)) {
                  editorControllerRef.current = undefined;
                  if (!error) setError('Content is required');
                } else {
                  editorControllerRef.current = value;

                  setError(undefined);
                }
              }}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}
