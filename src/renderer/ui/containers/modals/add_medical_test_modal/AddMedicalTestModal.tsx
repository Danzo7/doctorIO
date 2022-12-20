import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inputix } from '@components/inputs/input/Input';
import { numericString } from '@helpers/zod.helper';
import { BiometricScreening } from '@models/instance.model';
import { titleCase } from '@helpers/string.helper';
import { useAppSettingsStore } from '@stores/appSettingsStore';
import { VitalField } from '@models/local.models';
import IconicButton from '@components/buttons/iconic_button';
import FieldIcon from 'toSvg/fields.svg?icon';

interface AddMedicalTestModalProps {
  onSubmit: SubmitHandler<BiometricScreening>;
}

function fieldsToSchema(fields: VitalField[]) {
  return fields.reduce(
    (acc, field) => ({
      fields: acc.fields,
      schema: {
        ...acc.schema,
        [field.name]: numericString(z.number().optional()),
      },
      defaults: {
        ...acc.defaults,
        [field.name]: 0,
      },
    }),
    { schema: {}, defaults: {}, fields } as {
      schema: any;
      defaults: BiometricScreening;
      fields: VitalField[];
    },
  );
}

export default function AddMedicalTestModal({
  onSubmit,
}: AddMedicalTestModalProps) {
  const { schema, defaults, fields } = fieldsToSchema(
    useAppSettingsStore.getState().vitalFields,
  );
  const {
    control,
    handleSubmit,
    formState: { touchedFields, dirtyFields },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(z.object(schema)),
    defaultValues: defaults,
  });
  return (
    <ModalContainer
      title="Biometric screening"
      onSubmit={handleSubmit((data: BiometricScreening) =>
        onSubmit(
          Object.fromEntries(
            Object.keys({
              ...touchedFields,
              ...dirtyFields,
            }).map((key) => [key, data[key]]),
          ) as unknown as BiometricScreening,
        ),
      )}
      controls={
        <>
          <TextButton
            text={'Save Biometrics'}
            backgroundColor={colors.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
            type="submit"
          />
          <IconicButton
            Icon={FieldIcon}
            radius={5}
            tip="Edit fields"
            afterBgColor={colors.darker}
            css={{ position: 'absolute', left: 10 }}
          />
        </>
      }
    >
      <Inputix control={control}>
        {fields.map(
          (field) =>
            field.display && (
              <Input
                key={field.name}
                type={{ type: 'numeric', unit: field.unit }}
                label={titleCase(field.name)}
                name={field.name}
              />
            ),
        )}
      </Inputix>
    </ModalContainer>
  );
}
