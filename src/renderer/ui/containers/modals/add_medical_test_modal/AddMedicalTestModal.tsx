import colors, { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { z } from 'zod';
import { Inputix } from '@components/inputs/input/Input';
import { numericString } from '@helpers/zod.helper';
import { BiometricScreening } from '@models/instance.model';
import { titleCase } from '@helpers/string.helper';
import { VitalField } from '@models/local.models';
import IconicButton from '@components/buttons/iconic_button';
import FieldIcon from 'toSvg/fields.svg?icon';
import VerticalPanel from '@components/vertical_panel';
import BorderSeparator from '@components/border_separator';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';

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
function fieldsToSchemas(fields: VitalField[]) {
  return fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.display,
    }),
    {},
  );
}

export default function AddMedicalTestModal({
  onSubmit,
}: AddMedicalTestModalProps) {
  const { switchField, getActiveFields, vitalFields } = useVitalFieldsStore();
  const { schema, defaults, fields } = fieldsToSchema(getActiveFields());
  const dd = fieldsToSchemas(vitalFields);
  const {
    control,
    handleSubmit,
    formState: { touchedFields, dirtyFields },
  } = useForm<z.infer<typeof schema>>();
  //TODO: Move sidebars and hook to a separate component
  const { control: con } = useForm({
    defaultValues: dd,
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
      <div
        className="content"
        css={{ display: 'flex', flexDirection: 'row', flexGrow: 1, gap: 5 }}
      >
        {
          //TODO move to comp ; Fix styling with scss
          <div className="field-selection" css={{ flexGrow: 1 }}>
            <Inputix control={con}>
              {Object.entries(dd).map(([key]) => (
                <Input
                  type={'checkbox'}
                  name={key}
                  label={key}
                  key={key}
                  onChange={() => {
                    switchField(key);
                  }}
                />
              ))}
            </Inputix>
          </div>
        }
        <BorderSeparator direction="vertical" color={color.silver_gray} />
        <div
          className="fields"
          css={{ flexGrow: 5, display: 'flex', flexWrap: 'wrap', gap: 5 }} //TODO: Fix styling with scss
        >
          {fields.length > 0 ? (
            <Inputix control={control}>
              {fields.map(
                (field) =>
                  field.display && (
                    <Input
                      key={field.name}
                      type={{ type: 'numeric', unit: field.unit }}
                      label={titleCase(field.name)}
                      name={field.name}
                      defaultValue={defaults[field.name].toString()}
                    />
                  ),
              )}
            </Inputix>
          ) : (
            <VerticalPanel
              title="Please add a field first"
              backgroundColor="none"
              padding={0}
            />
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
