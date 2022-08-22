import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { useAddQueueAppointmentMutation } from '@redux/instance/appointmentQueue/AppointmentQueueApi';
import { Test } from '../../../../models/instance.model';
import { Overlay } from '@libs/overlay';
import { useAssignAppointmentToQueueMutation } from '@redux/instance/Appointment/AppointmentApi';
import { InputControllerContext } from '@components/inputs/input/Input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  weight: z
    .number({ required_error: 'Weight is required' })
    .gt(0, 'Weight is required'),
  height: z
    .number({ required_error: 'Height is required' })
    .gt(0, 'Height is required'),
  BloodPressure: z
    .number({ required_error: 'Blood pressure is required' })
    .gt(0, 'Blood Pressure is required'),
  bloodType: z.enum(['A', 'B', 'AB', 'O']),
  RH: z.boolean(),
});

interface Inputs {
  weight: number;
  height: number;
  BloodPressure: number;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  RH: boolean;
}
interface MedicalTestModalProps {
  patientId: number;
  appointmentId?: number;
}

export default function MedicalTestModal({
  patientId,
  appointmentId,
}: MedicalTestModalProps) {
  const [addAppointment] = useAddQueueAppointmentMutation();
  const [AssignAppointmentToQueue] = useAssignAppointmentToQueueMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      bloodType: 'A',
      RH: false,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    const newTest: Test = {
      weight: Number(formData.weight),
      height: Number(formData.height),
      bloodPressure: Number(formData.BloodPressure),
      bloodType: formData.bloodType,
      Rh: formData.RH,
    };

    if (appointmentId) {
      AssignAppointmentToQueue({ appointmentId: appointmentId, test: newTest });
    } else {
      addAppointment({
        roleId: 1,
        body: { patientId: patientId, test: newTest },
      });
    }
    Overlay.close();
  };
  return (
    <ModalContainer
      title="Medical test"
      onSubmit={handleSubmit(onSubmit)}
      controls={
        <>
          <TextButton
            text={'Add to queue'}
            backgroundColor={colors.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
          />
        </>
      }
    >
      <InputControllerContext.Provider value={control}>
        <Input
          errorMessage={errors.weight?.message}
          type="number"
          label="Weight"
          name="weight"
        />
        <Input
          errorMessage={errors.height?.message}
          type="number"
          label="Height"
          name="height"
        />
        <Input
          errorMessage={errors.BloodPressure?.message}
          type="number"
          label="Blood pressure"
          name="BloodPressure"
        />
        <Input
          errorMessage={errors.bloodType?.message}
          type={{
            type: 'select',
            options: ['A', 'B', 'AB', 'O'],
          }}
          label="Blood type"
          name="bloodType"
        />
        {/* <InputContainer label="RH" grow>
        <ToggleButton
          onChange={(checked) => {
            setValue('RH', checked);
          }}
        />
        </InputContainer>  */}
        {/* {
          <InputContainer label="RH" grow>
            <MultiOptionSwitcher
              textList={RhOptions}
              onChange={(selected) => {
                setValue('RH', RhOptions[selected] == 'Positive');
              }}
            />//TODO add multiOptionSwitcher to input component
          </InputContainer>
        } */}
        <Input type="checkbox" label="RH" name="RH" />
      </InputControllerContext.Provider>
    </ModalContainer>
  );
}
