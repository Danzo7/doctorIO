import './style/index.scss';
import Header from '@components/header';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import {
  useCertificates,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import KeywordFieldItem from '@components/keyword_field_item';
import VerticalPanel from '@components/vertical_panel';
import { DEFAULT_MODAL, modal, tooltip } from '@libs/overlay';
import CertificateEditorModal from '@containers/modals/certificate_editor_modal';
import MedicalCertificateChoiceModal from '@containers/modals/medical_certificate_choice_modal';

interface CertificatesTabProps {}
export default function CertificatesTab({}: CertificatesTabProps) {
  const certificates = useCertificates();
  return (
    <div className="certificates-tab">
      <Header
        title={'Certifications'}
        buttonNode={
          <DarkLightCornerButton
            text="Add..."
            onPress={(e) => {
              if (e)
                tooltip(
                  () => [
                    {
                      text: 'Create new one',
                      onPress: () => {
                        modal(
                          () => <CertificateEditorModal />,
                          {
                            closeOnClickOutside: true,
                            closeOnBlur: false,
                            isDimmed: true,
                            clickThrough: false,
                            width: '50%',
                          },
                          'certificateModal',
                        ).open();
                      },
                    },
                    {
                      text: 'Use a template',
                      onPress: () => {
                        modal(
                          () => <MedicalCertificateChoiceModal />,
                          {
                            closeOnClickOutside: true,
                            closeOnBlur: false,
                            isDimmed: true,
                            clickThrough: false,
                          },
                          'certificateModal',
                        ).open();
                      },
                    },
                  ],
                  e.currentTarget,
                  { autoClose: true },
                ).open();
            }}
          />
        }
      />
      <div className="certificates-elements">
        {certificates.length > 0 ? (
          certificates.map((certificate, index) => (
            <KeywordFieldItem
              name={certificate.title}
              gap={5}
              key={index}
              onEdit={() => {
                modal(
                  <CertificateEditorModal updateValue={certificate} />,
                  { ...DEFAULT_MODAL, height: '90%', width: '90%' },
                  'certificateModal',
                ).open();
              }}
              onDelete={() => {
                useMedicalSessionStore
                  .getState()
                  .removeCertificate(certificate.id);
              }}
            />
          ))
        ) : (
          <VerticalPanel
            title="No certifications added"
            alignSelf="stretch"
            flexGrow
            description="Please add a certificate. "
            action={{
              text: 'add certificate',
              onClick: (e) => {
                tooltip(
                  () => [
                    {
                      text: 'Create new one',
                      onPress: () => {
                        modal(
                          () => <CertificateEditorModal />,
                          { ...DEFAULT_MODAL, width: '90%', height: '90%' },
                          'certificateModal',
                        ).open();
                      },
                    },
                    {
                      text: 'Use a template',
                      onPress: () => {
                        modal(
                          () => <MedicalCertificateChoiceModal />,
                          {
                            closeOnClickOutside: true,
                            closeOnBlur: false,
                            isDimmed: true,
                            clickThrough: false,

                            width: '50%',
                          },
                          'certificateModal',
                        ).open();
                      },
                    },
                  ],
                  e.currentTarget,
                  { autoClose: true },
                ).open();
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
