import './style/index.scss';
import PregnantState from 'toSvg/pregnant.svg';
import WaitingFigure from 'toSvg/waiting_figure.svg';
import threeDots from 'toSvg/threedots.svg?icon';
import SquareIconButton from '@components/buttons/square_icon_button';
import colors from '@colors';
import invite from 'toSvg/enter.svg?icon';
import view from 'toSvg/view_test.svg?icon';
import TextIconButton from '@components/buttons/text_icon_button';
import DiagnosisPreview from '@containers/modals/diagnosis_preview';
import NextPatient from '@containers/modals/next_patient';
import useNavigation from '@libs/hooks/useNavigation';
import {
  useDeleteAppointmentMutation,
  useGetIsQueueOwnerQuery,
  useUpdateTestMutation,
} from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import AddMedicalTestModal from '@containers/modals/add_medical_test_modal';
import TimeAgo from '@components/time_ago';
import { BiometricScreening } from '@models/instance.model';
import { modal, Overlay_u } from '@stores/overlayStore';
interface QueueItemWideProps {
  id: number;
  name: string;
  timeAgo: Date;
  number: number;
  state?: string;
  width?: number;
  biometricScreening?: BiometricScreening;
  appointmentId: number;
}

function QueueItemWide({
  id,
  name,
  timeAgo,
  number,
  state,
  width,
  appointmentId,
  biometricScreening,
}: QueueItemWideProps) {
  const { data: isOwner, isSuccess } = useGetIsQueueOwnerQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [updateTest] = useUpdateTestMutation();

  const Svg = state === 'urgent' ? PregnantState : WaitingFigure;
  const { navigate } = useNavigation();
  return (
    <div className="queue-item-wide" css={{ width: width }}>
      <div className="back-container">
        <div className="back">
          <SquareIconButton
            tip="More"
            Icon={threeDots}
            onPress={(e) => {
              if (e)
                Overlay_u.openTooltip(
                  () => [
                    ...(isSuccess && isOwner
                      ? [
                          {
                            text: 'View records',
                            onPress: () => {
                              navigate('/records/' + id, { replace: true });
                            },
                          },
                        ]
                      : []),
                    {
                      text: 'Remove',
                      type: 'warning',
                      onPress: () => {
                        deleteAppointment({
                          roleId: 1,
                          appointmentId,
                        });
                      },
                    },
                  ],
                  e.currentTarget,
                  true,
                );
            }}
          />
        </div>
      </div>
      <div className="content">
        <div className="pat-info">
          <span>{name}</span>
          <TimeAgo timeAgo={timeAgo} />
        </div>
        <div className="buttons-hover-lock">
          {isOwner && (
            <TextIconButton
              Icon={invite}
              text="invite in"
              color={colors.good_green}
              onPress={() => {
                modal(
                  () => (
                    <NextPatient
                      invitedPatient={{
                        patientName: name,
                        position: number,
                        arrivalTime: timeAgo,
                      }}
                    />
                  ),
                  {
                    width: '30%',
                    closeOnClickOutside: true,
                    isDimmed: true,
                    clickThrough: false,
                    closeBtn: 'inner',
                  },
                ).open();
              }}
            />
          )}
          <TextIconButton
            Icon={view}
            text={biometricScreening ? 'View tests' : 'add tests'}
            color={colors.cold_blue}
            onPress={() => {
              modal(
                ({ close }) =>
                  biometricScreening ? (
                    <DiagnosisPreview data={biometricScreening} />
                  ) : (
                    <AddMedicalTestModal
                      onSubmit={(data) => {
                        updateTest({ ...data, position: number });
                        close();
                      }}
                    />
                  ),
                {
                  closeOnClickOutside: true,
                  isDimmed: true,
                  clickThrough: false,
                  width: '30%',
                  closeBtn: 'inner',
                },
              ).open();
            }}
          />
        </div>
      </div>
      <div
        className={`preview ${state ?? ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <Svg />
        </div>
        <div className="number">
          <span>Number</span>
          <span>{number}</span>
        </div>
      </div>
    </div>
  );
}

export default QueueItemWide;
