import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';
import add from 'toSvg/add.svg?icon';
import Cancel from 'toSvg/x_mark.svg?icon';
import { useState } from 'react';
import AddVitalFieldItem from '@components/add_vital_field_item';
import { useGetFieldsQuery } from '@redux/clinic/clinicApi';
import VerticalPanel from '@components/vertical_panel';
import VitalFieldItem from '@components/vital_field_item';
import { modal } from '@libs/overlay';

interface EditVitalsFieldsModalProps {}
export default function EditVitalsFieldsModal({}: EditVitalsFieldsModalProps) {
  const { isLoading, data: clinicFields, isSuccess } = useGetFieldsQuery();

  const { isActive, switchField } = useVitalFieldsStore();
  const [addField, showAddField] = useState(false);
  return (
    <div className="edit-vitals-fields-modal">
      <ModalContainer
        isLoading={isLoading}
        title="Edit Vitals fields"
        controls={
          <TextButton
            text={'Close'}
            backgroundColor={color.light}
            radius={7}
            fontSize={14}
            onPress={() => modal.close()}
          />
        }
      >
        {isSuccess ? (
          <div className="fields-edit-content">
            <div className="fields-edit-items">
              {clinicFields.map(
                (field, index) =>
                  !field.deleted && (
                    <VitalFieldItem
                      key={index}
                      name={field.name}
                      unit={field.unit}
                      display={isActive(field.name)}
                      onChangeDisplay={() => {
                        switchField(field);
                      }}
                    />
                  ),
              )}
              {addField && (
                <AddVitalFieldItem
                  onSave={() => {
                    showAddField(!addField);
                  }}
                />
              )}
            </div>

            <TextButton
              text={addField ? 'Cancel' : 'new field'}
              Icon={addField ? <Cancel width={10} height={10} /> : add}
              afterBgColor={color.darkersec_color}
              fontSize={14}
              fontWeight={500}
              radius={7}
              padding={10}
              borderColor={color.silver_gray}
              onPress={() => {
                showAddField(!addField);
              }}
            />
          </div>
        ) : (
          <VerticalPanel />
        )}
      </ModalContainer>
    </div>
  );
}
