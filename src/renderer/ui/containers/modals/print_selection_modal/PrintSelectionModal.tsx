import ModalContainer from '@components/modal_container';
import './style/index.scss';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { Overlay_u } from '@stores/overlayStore';
interface PrintSelectionModalProps {}
export default function PrintSelectionModal({}: PrintSelectionModalProps) {
  const { control } = useForm();
  const session = useMedicalSessionStore((state) => state.session);
  return (
    <div className="print-selection-modal">
      <ModalContainer
        title="Print selection"
        controls={
          <div className="print-selection-controls">
            <TextButton
              text="Cancel"
              backgroundColor={color.silver_gray}
              fontSize={14}
              fontWeight={700}
              padding=" 5px 15px"
              onPress={() => {
                Overlay_u.close();
              }}
            />
            <TextButton
              text="Print"
              backgroundColor={color.good_green}
              padding={'5px 15px'}
              fontSize={14}
              onPress={() => {
                //TODO print Prescription
              }}
            />
          </div>
        }
      >
        <div className="print-selection-inputs">
          {session.certificates.length > 0 && (
            <Input
              type={'checkbox'}
              name={'certifications'}
              label={'Certifications :'}
              border={false}
              control={control}
              onChange={() => {}}
            />
          )}
          <div className="print-certifications-options">
            {session.certificates.length > 0 &&
              session.certificates.map((certificate, index) => (
                <Input
                  key={index}
                  type={'checkbox'}
                  name={certificate.title}
                  label={certificate.title}
                  border={true}
                  control={control}
                  onChange={() => {}}
                />
              ))}
          </div>
          {session.prescription && (
            <Input
              type={'checkbox'}
              name={'prescription'}
              label={'Prescription'}
              border={false}
              control={control}
              onChange={() => {}}
            />
          )}
        </div>
      </ModalContainer>
    </div>
  );
}
