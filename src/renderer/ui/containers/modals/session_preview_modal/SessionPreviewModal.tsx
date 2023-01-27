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
import { DEFAULT_MODAL } from '@libs/overlay';

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
                      <>
                        <MedicamentTable drugList={data.session.prescription} />
                        <TextButton
                          onPress={() => {
                            if (data?.session?.prescription)
                              modal(
                                <PrintPaper
                                  content={prescriptionToMedicalCertificate(
                                    data.session.prescription,
                                  )}
                                  patient={patient}
                                />,
                                DEFAULT_MODAL,
                              ).open();
                          }}
                        >
                          Print
                        </TextButton>
                        {
                          //TODO: remove print from here and add it to preview
                        }
                      </>
                    ),
                  },
                  data.session.certificates &&
                    data.session.certificates.length && {
                      label: 'Certificates',
                      content: (
                        <CertificatesView
                          certificates={data.session.certificates}
                          patient={patient}
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
