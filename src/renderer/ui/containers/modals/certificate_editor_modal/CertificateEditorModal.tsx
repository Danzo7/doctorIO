import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import CertificateEditor from '@components/certificates_editor';
import { MedicalCertificate } from '@models/instance.model';

type Inputs = { title: string };
interface CertificateEditorModalProps {
  mentions?: string[];
  defaultValues?: MedicalCertificate;
}
export default function CertificateEditorModal({
  mentions,
  defaultValues,
}: CertificateEditorModalProps) {
  const { control } = useForm<Inputs>({
    defaultValues: {
      title: defaultValues?.title ?? '',
    },
  });
  // const diagnosis = useDiagnosis();
  return (
    <div className="certificate-editor-modal">
      <ModalContainer
        title="Medical certificate"
        controls={
          <div className="certificate-editor-controls">
            <TextButton
              text="Save"
              backgroundColor={color.good_green}
              padding={'5px 15px'}
              fontSize={14}
              onPress={() => {
                //TODO save certificate
              }}
            />
          </div>
        }
      >
        <div className="certificate-editor-inputs">
          <Input label="Title" control={control} name="title" type={'text'} />
          <div className="certificate-editor-wrapper">
            <span>Content</span>
            <CertificateEditor
              mentions={mentions}
              // defaultValue={defaultValues?.description}
              onChange={(v) => {
                // useMedicalSessionStore.getState().setDiagnosis(v);
              }}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}
