import colors from '@assets/styles/color';
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
import FieldIcon from 'toSvg/fields.svg?icon';
import VerticalPanel from '@components/vertical_panel';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';
import './style/index.scss';
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
    <div className="add-vitals-modal">
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
          </>
        }
      >
        <div className="content">
          {
            //TODO move to comp

            <div className="field-selection">
              <TextButton
                text="Edit fields"
                Icon={FieldIcon}
                afterBgColor={colors.darkersec_color}
                fontSize={14}
                width={'100%'}
                fontWeight={600}
                radius={7}
                borderColor={colors.border_color}
                padding={'10px'}
                itemsDirection="row-reverse"
              />

              <Inputix control={con}>
                {Object.entries(dd).map(([key]) => (
                  <Input
                    type={'checkbox'}
                    name={key}
                    label={key}
                    key={key}
                    border={true}
                    onChange={() => {
                      switchField(key);
                    }}
                  />
                ))}
              </Inputix>
            </div>
          }

          <div className="fields">
            {fields.length > 0 ? (
              <Inputix control={control}>
                {fields.map(
                  (field) =>
                    field.display && (
                      <Input
                        fillContainer
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
                title=" No vitals selected"
                description="Please add a field first"
                backgroundColor="none"
                padding={0}
                alignSelf="center"
              />
            )}
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}
