import './style/index.scss';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import useNavigation from '@libs/hooks/useNavigation';
import { useEndNextMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import {
  useBookAppointmentMutation,
  useGetAppointmentDetailQuery,
} from '@redux/instance/Appointment/AppointmentApi';
import { useMedicalSessionStore } from '@stores/medicalSessionStore';
import AlertModal from '../dialog_modal';
import { useSelectedQueue } from '@stores/queueSelectionStore';
import { DEFAULT_MODAL, FIT_MODAL, modal } from '@libs/overlay';
import { Patient } from '@models/instance.model';
import { Member } from '@models/server.models';
import PrintPaper from '@components/print_paper';
import { prescriptionToMedicalCertificate } from '@libs/slate_editor/helper';
interface EndSessionProps {
  patient: Patient;
  patientId: number;
  member: Member;
  appointmentId: number;
}
export default function EndSession({
  patient,
  member,
  patientId,
  appointmentId,
}: EndSessionProps) {
  const selectedQueue = useSelectedQueue();
  const { toParent } = useNavigation();
  const [EndNext] = useEndNextMutation();
  const [bookAppointment] = useBookAppointmentMutation();
  const currentSession = useMedicalSessionStore.getState().session;
  const sessionParameters = useMedicalSessionStore.getState().sessionParameter;
  const { refetch } = useGetAppointmentDetailQuery(appointmentId);

  return (
    <AlertModal
      title="End the session?"
      description="Are you sure you want to finish the session ?"
      status="warning"
      controls={
        <>
          <TextButton
            text="Cancel"
            backgroundColor={color.cold_blue}
            fontSize={14}
            fontWeight={700}
            padding=" 5px 15px"
            onPress={() => {
              modal.close();
            }}
          />
          <TextButton
            text="Confirm"
            fontSize={14}
            fontColor={color.white}
            fontWeight={700}
            backgroundColor={color.good_green}
            padding=" 5px 15px"
            onPress={async () => {
              await EndNext({
                selectedQueue,
                body: {
                  certificates:
                    currentSession.certificates.length > 0
                      ? currentSession.certificates.map(
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          ({ id, ...other }) => other,
                        )
                      : undefined,

                  //TODO remove
                  diagnosis:
                    currentSession.diagnosis?.length > 0
                      ? currentSession.diagnosis
                      : undefined,
                  prescription:
                    currentSession.prescription?.length > 0
                      ? currentSession.prescription.map(
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          ({ id, ...other }) => other,
                        )
                      : undefined,
                  payment:
                    sessionParameters.payment?.value &&
                    sessionParameters.payment?.isHandPayment &&
                    sessionParameters.payment?.value > 0
                      ? sessionParameters.payment.value
                      : undefined,
                },
              });

              if (sessionParameters.booked)
                await bookAppointment({
                  selectedQueue: selectedQueue,
                  body: {
                    date: sessionParameters.booked,
                    subject: 'follow up',
                  },
                  patientId: patientId,
                });
              const data = await refetch().unwrap();
              modal(
                <AlertModal
                  status="success"
                  title=" Session ended successfully"
                  description="The session has been ended successfully"
                  controls={
                    <>
                      <TextButton
                        text="Print"
                        backgroundColor={color.cold_blue}
                        padding={'5px 15px'}
                        fontSize={14}
                        onPress={() => {
                          modal(
                            <PrintPaper
                              appointment={data}
                              member={member}
                              patient={patient}
                              contents={
                                [
                                  ...useMedicalSessionStore.getState().session
                                    .certificates,
                                  useMedicalSessionStore.getState().session
                                    .prescription.length > 0 &&
                                    prescriptionToMedicalCertificate(
                                      useMedicalSessionStore.getState().session
                                        .prescription,
                                    ),
                                ].filter(Boolean) as any
                              }
                            />,
                            FIT_MODAL,
                          ).open();
                        }}
                      />
                      <TextButton
                        text="Finish"
                        backgroundColor={color.silver_gray}
                        fontSize={14}
                        fontWeight={700}
                        padding=" 5px 15px"
                        onPress={() => {
                          useMedicalSessionStore.getState().clear();
                          toParent();
                        }}
                      />
                    </>
                  }
                />,
                { ...DEFAULT_MODAL, closable: false },
              ).open({
                previousBehavior: 'close',
              });
            }}
          />
        </>
      }
    ></AlertModal>
  );
}
