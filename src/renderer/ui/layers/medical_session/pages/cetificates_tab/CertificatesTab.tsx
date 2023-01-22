import './style/index.scss';
import Header from '@components/header';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import KeywordFieldItem from '@components/keyword_field_item';
import VerticalPanel from '@components/vertical_panel';
import { modal } from '@stores/overlayStore';
import { DEFAULT_MODAL } from '@libs/overlay';
import MedicalCertificateChoiceModal from '@containers/modals/medical_certificate_choice_modal';

interface CertificatesTabProps {
  mentions?: string[];
}
export default function CertificatesTab({ mentions }: CertificatesTabProps) {
  const session = useMedicalSessionStore((state) => state.session);
  return (
    <div className="certificates-tab">
      <Header
        title={'Certifications'}
        buttonNode={
          <DarkLightCornerButton
            text="Add..."
            onPress={() => {
              modal(<MedicalCertificateChoiceModal />, DEFAULT_MODAL).open();
            }}
          />
        }
      />
      <div className="certificates-elements">
        {session.certificates.length > 0 ? (
          session.certificates.map((certificate, index) => (
            <KeywordFieldItem
              id={Number(certificate.id)}
              name={certificate.title}
              mode="edit"
              gap={5}
              key={index}
              onEdit={() => {
                //TODO fix description type
                // modal(
                //   <CertificateEditorModal
                //     defaultValues={{
                //       title: certificate.title,
                //       certificate: certificate.description,
                //     }}
                //   />,
                //   DEFAULT_MODAL,
                // ).open();
              }}
            />
          ))
        ) : (
          <VerticalPanel
            title="No certifications added"
            backgroundColor="none"
            alignSelf="stretch"
            flexGrow
            description="Please add a certificate. "
            action={{
              text: 'add certificate',
              onClick: () => {
                modal(<MedicalCertificateChoiceModal />, DEFAULT_MODAL).open();
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
