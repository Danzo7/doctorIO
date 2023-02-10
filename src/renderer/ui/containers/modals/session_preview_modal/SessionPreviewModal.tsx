import ModalContainer from '@components/modal_container';
import AppointmentDetailPreview from '@components/appointment_detail_preview';
import TabComponent from '@components/tab_component';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import { useGetAppointmentDetailQuery } from '@redux/instance/Appointment/AppointmentApi';
import './style/index.scss';
import { CertificatesView } from '@layers/medical_session/pages/cetificates_tab/CertificatesTab';
import { Patient } from '@models/instance.model';
import TextButton from '@components/buttons/text_button';
import { modal } from '@stores/overlayStore';
import { prescriptionToMedicalCertificate } from '@libs/slate_editor/helper';
import PrintPaper from '@components/print_paper';
import { FIT_MODAL } from '@libs/overlay';
import color from '@assets/styles/color';

interface SessionPreviewModalProps {
  id: number;
  patient: Patient;
}
export default function SessionPreviewModal({
  id,
  patient,
}: SessionPreviewModalProps) {
  const { data, isFetching } = useGetAppointmentDetailQuery(id);
  return (
    <ModalContainer isLoading={isFetching} gap={15} title="Session preview">
      {data && (
        <div className="tab-menu-container">
          <AppointmentDetailPreview {...data} />
          {data.session && (
            <TabComponent
              borderBottom={false}
              items={
                [
                  data.session.prescription && {
                    label: 'Prescription',
                    content: (
                      <div
                        css={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 10,
                        }}
                      >
                        <MedicamentTable drugList={data.session.prescription} />
                        <TextButton
                          text="Preview"
                          backgroundColor={color.cold_blue}
                          width={'fit-content'}
                          alignSelf="center"
                          onPress={() => {
                            if (data?.session?.prescription)
                              modal(
                                <PrintPaper
                                  appointment={data}
                                  member={
                                    data.member ?? { id: 0, name: 'Unknown' }
                                  }
                                  content={prescriptionToMedicalCertificate(
                                    data.session.prescription,
                                  )}
                                  patient={patient}
                                />,
                                FIT_MODAL,
                              ).open();
                          }}
                        ></TextButton>
                      </div>
                    ),
                  }, //TODO add print certificate
                  data.session.certificates &&
                    data.session.certificates.length && {
                      label: 'Certificates',
                      content: (
                        <CertificatesView
                          appointment={data}
                          certificates={data.session.certificates}
                          patient={patient}
                          member={data.member ?? { id: 0, name: 'Unknown' }}
                        />
                      ),
                    },
                ].filter(Boolean) as any
              }
            />
          )}
        </div>
      )}
    </ModalContainer>
  );
}
