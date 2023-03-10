import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { DEFAULT_MODAL, modal } from '@libs/overlay';
import { useGetCertificateTemplatesQuery } from '@redux/clinic/templates/templatesApi';
import RefetchPanel from '@components/refetch_panel';
import CertificateEditorModal from '../certificate_editor_modal';
interface MedicalCertificateChoiceModalProps {}
export default function MedicalCertificateChoiceModal({}: MedicalCertificateChoiceModalProps) {
  const { isSuccess, isLoading, data, refetch } =
    useGetCertificateTemplatesQuery();
  return (
    <div className="medical-certificate-choice-modal">
      <ModalContainer
        title="Choose medical certificate type"
        isLoading={isLoading}
        controlsPosition="end"
        controls={
          <TextButton
            text="Cancel"
            backgroundColor={color.silver_gray}
            fontSize={14}
            fontWeight={700}
            padding=" 5px 15px"
            onPress={() => {
              modal.close();
            }}
          />
        }
      >
        <div className="medical-certificate-choice-options">
          {isSuccess ? (
            data.length > 0 ? (
              data.map(({ id, title }, index) => (
                <TextButton
                  key={index}
                  text={title}
                  backgroundColor={color.cold_blue}
                  fontSize={14}
                  fontWeight={700}
                  onPress={() => {
                    modal(
                      <CertificateEditorModal
                        defaultValue={{ id: id.toString(), title: title }}
                      />,
                      { ...DEFAULT_MODAL, height: '90%', width: '90%' },
                      'certificateModal',
                    ).open();
                  }}
                />
              ))
            ) : (
              <TextButton
                text="Create new one"
                backgroundColor={color.cold_blue}
                fontSize={14}
                fontWeight={700}
                onPress={() => {
                  modal(<CertificateEditorModal />, DEFAULT_MODAL).open();
                }}
              />
            )
          ) : (
            <RefetchPanel action={refetch} />
          )}
        </div>
      </ModalContainer>
    </div>
  );
}
