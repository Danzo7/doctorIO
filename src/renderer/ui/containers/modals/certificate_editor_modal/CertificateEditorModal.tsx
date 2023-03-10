import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import CertificateEditor from '@components/certificates_editor';
import { MedicalCertificate } from '@models/instance.model';
import { useRef, useState } from 'react';
import { Descendant } from 'slate';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommonEditor } from '@libs/slate_editor/commons/CommonEditor';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import { modal } from '@libs/overlay';
import { useGetCertificateTemplateByIdQuery } from '@redux/clinic/templates/templatesApi';

type Inputs = { title: string };
interface CertificateEditorModalProps {
  mentions?: string[];
  defaultValue?: Partial<MedicalCertificate>;
  updateValue?: MedicalCertificate;
}
const schema = z.object({
  title: z.string().min(8).max(100),
});

export default function CertificateEditorModal({
  mentions,
  defaultValue,
  updateValue,
}: CertificateEditorModalProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const editorControllerRef = useRef<Descendant[]>();
  const {
    isLoading,
    isSuccess,
    data: templateData,
  } = useGetCertificateTemplateByIdQuery(Number(defaultValue?.id), {
    skip: !defaultValue,
  });
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: defaultValue
        ? defaultValue.title
        : updateValue
        ? updateValue.title
        : '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <ModalContainer
      className="certificate-editor-modal"
      isLoading={isLoading}
      css={{ flexGrow: 1 }}
      title="Medical certificate"
      controlsPosition="end"
      controls={
        <TextButton
          text="Save"
          backgroundColor={color.good_green}
          fontSize={14}
          blank
          type="submit"
        />
      }
      {...{
        onSubmit: handleSubmit((data) => {
          if (updateValue)
            useMedicalSessionStore
              .getState()
              .updateCertificate(updateValue.id, {
                title: data.title,
                description: editorControllerRef.current
                  ? editorControllerRef.current
                  : updateValue.description,
              });
          else {
            if (isSuccess && !editorControllerRef.current) {
              useMedicalSessionStore.getState().addCertificate({
                title: data.title,
                description: templateData?.template,
              });
            } else if (editorControllerRef.current) {
              useMedicalSessionStore.getState().addCertificate({
                title: data.title,
                description: editorControllerRef.current,
              });
            }
          }

          modal.close('certificateModal');
        }),
      }}
    >
      <div className="certificate-editor-inputs">
        {
          //todo add non editable title

          <Input
            grow={false}
            label="Title"
            control={control}
            name="title"
            type={'text'}
          />
        }
        <div className="certificate-editor-wrapper">
          <span>Content</span>
          <CertificateEditor
            mentions={mentions}
            defaultValue={
              defaultValue ? templateData?.template : updateValue?.description
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
  );
}
