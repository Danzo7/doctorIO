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
import { Overlay_u } from '@stores/overlayStore';

type Inputs = { title: string };
interface CertificateEditorModalProps {
  mentions?: string[];
  defaultValue?: MedicalCertificate;
}
const schema = z.object({
  title: z.string().min(8).max(100),
});

export default function CertificateEditorModal({
  mentions,
  defaultValue,
}: CertificateEditorModalProps) {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: defaultValue?.title ?? '',
    },
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const editorControllerRef = useRef<Descendant[]>();

  return (
    <ModalContainer
      className="certificate-editor-modal"
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
          if (!editorControllerRef.current) {
            return;
          }
          if (defaultValue)
            useMedicalSessionStore
              .getState()
              .updateCertificate(defaultValue.id, {
                title: data.title,
                description: editorControllerRef.current,
              });
          else
            useMedicalSessionStore.getState().addCertificate({
              title: data.title,
              description: editorControllerRef.current,
            });
          Overlay_u.close('certificateModal');
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
            defaultValue={defaultValue?.description}
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
