import colors from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '@components/modal_container';
import { Inputix } from '@components/inputs/input/Input';
import { BiometricScreening } from '@models/instance.model';
import { titleCase } from '@helpers/string.helper';
import FieldIcon from 'toSvg/fields.svg?icon';
import VerticalPanel from '@components/vertical_panel';
import './style/index.scss';
import {
  useCreateFieldMutation,
  useGetFieldsQuery,
} from '@redux/clinic/clinicApi';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';
interface AddMedicalTestModalProps {
  onSubmit: SubmitHandler<BiometricScreening>;
}

export default function AddMedicalTestModal({
  onSubmit,
}: AddMedicalTestModalProps) {
  const { vitalFields, switchField, isActive } = useVitalFieldsStore();
  const { control, handleSubmit } = useForm();
  const { isLoading, data: clinicFields, isSuccess } = useGetFieldsQuery();
  const [create] = useCreateFieldMutation();
  const { control: con } = useForm();

  return (
    <div className="add-vitals-modal">
      <ModalContainer
        isLoading={isLoading}
        title="Biometric screening"
        onSubmit={handleSubmit(onSubmit)}
        controls={
          <TextButton
            text={'Save Biometrics'}
            backgroundColor={colors.good_green}
            disabled={vitalFields.length === 0}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
            type="submit"
          />
        }
      >
        {isSuccess && (
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
                  onPress={() => {
                    create({
                      name: 'test',
                      unit: 'mg/dl',
                    });
                  }}
                />

                <Inputix control={con}>
                  {clinicFields.map(({ name }, i) => (
                    <Input
                      type={'checkbox'}
                      name={name}
                      label={name}
                      key={name}
                      border={true}
                      defaultValue={isActive(name)}
                      onChange={() => {
                        switchField(clinicFields[i]);
                      }}
                    />
                  ))}
                </Inputix>
              </div>
            }

            <div
              className="fields"
              css={{
                justifyContent:
                  vitalFields.length > 0 ? 'flex-start' : 'center',
              }}
            >
              {vitalFields.length > 0 ? (
                <Inputix control={control}>
                  {vitalFields.map((field) => (
                    <Input
                      fillContainer
                      key={field.name}
                      type={{ type: 'numeric', unit: field.unit }}
                      label={titleCase(field.name)}
                      name={field.name}
                      defaultValue={'0'}
                    />
                  ))}
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
        )}
      </ModalContainer>
    </div>
  );
}
