import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import VitalFieldItem from '@components/vital_field_item';
import { useVitalFieldsStore } from '@stores/vitalFieldsStore';
import add from 'toSvg/add.svg?icon';
import { useState } from 'react';
import AddVitalFieldItem from '@components/add_vital_field_item';

interface EditVitalsFieldsModalProps {}
export default function EditVitalsFieldsModal({}: EditVitalsFieldsModalProps) {
  const {
    switchField,
    getActiveFields,
    vitalFields,
    activateField,
    deactivateField,
  } = useVitalFieldsStore();
  const [addField, showAddField] = useState(false);
  return (
    <div className="edit-vitals-fields-modal">
      <ModalContainer
        title="Edit Vitals fields"
        controls={
          <TextButton
            text={'Save'}
            backgroundColor={color.good_green}
            radius={7}
            fontSize={14}
            width={'60%'}
            blank
            type="submit"
          />
        }
      >
        <div className="fields-edit-content">
          <div className="fields-edit-items">
            {vitalFields.map(({ name, unit, display }, index) => (
              <VitalFieldItem
                key={index}
                name={name}
                unit={unit}
                display={display}
                onChangeDisplay={() => {}}
              />
            ))}
            {addField && (
              <AddVitalFieldItem
                onSave={() => {
                  showAddField(!addField);
                }}
              />
            )}
          </div>

          <TextButton
            text="new field"
            Icon={add}
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
      </ModalContainer>
    </div>
  );
}
