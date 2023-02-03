import './style/index.scss';
import Header from '@components/header';
import DarkLightCornerButton from '@components/buttons/dark_light_corner_button';
import {
  useCertificates,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import KeywordFieldItem from '@components/keyword_field_item';
import VerticalPanel from '@components/vertical_panel';
import { modal, Overlay_u } from '@stores/overlayStore';
import { DEFAULT_MODAL } from '@libs/overlay';
import CertificateEditorModal from '@containers/modals/certificate_editor_modal';
import {
  Appointment,
  MedicalCertificate,
  Patient,
} from '@models/instance.model';
import CertificatePreviewModal from '@containers/modals/certificate_preview_modal';
import { Member } from '@models/server.models';

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
                Overlay_u.openTooltip(
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
                  ],
                  e.currentTarget,
                  true,
                );
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
                  <CertificateEditorModal defaultValue={certificate} />,
                  DEFAULT_MODAL,
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
            backgroundColor="none"
            alignSelf="stretch"
            flexGrow
            description="Please add a certificate. "
            action={{
              text: 'add certificate',
              onClick: (e) => {
                Overlay_u.openTooltip(
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
                  ],
                  e.currentTarget,
                  true,
                );
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
export function CertificatesView({
  certificates,
  patient,
  member,
  appointment,
}: {
  certificates: MedicalCertificate[];
  patient: Patient;
  member: Pick<Member, 'id' | 'name'>;
  appointment: Appointment;
}) {
  return (
    <div className="certificates-view-tab">
      {certificates.map((certificate, index) => (
        <KeywordFieldItem
          key={index}
          name={certificate.title}
          onView={() =>
            modal(
              () => (
                <CertificatePreviewModal
                  appointment={appointment}
                  defaultValue={certificate}
                  patient={patient}
                  member={member}
                />
              ),
              {
                closeOnClickOutside: true,
                closeOnBlur: false,
                isDimmed: true,
                clickThrough: false,
                width: '50%',
              },
              'certificateModal',
            ).open()
          }
        />
      ))}
    </div>
  );
}
