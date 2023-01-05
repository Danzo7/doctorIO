import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { Overlay_u } from '@stores/overlayStore';
import KeywordFieldItem from '@components/keyword_field_item';
import { useState } from 'react';
import add from 'toSvg/add.svg?icon';
import Cancel from 'toSvg/x_mark.svg?icon';
import VerticalPanel from '@components/vertical_panel';
import AddKeywordField from '@components/add_keyword_field';

const keywordFields = [
  'certificate',
  'Prescription',
  'certificate',
  'certificate',
  'certificate',
  'certificate',
];
interface TemplateKeywordsModalProps {}
export default function TemplateKeywordsModal({}: TemplateKeywordsModalProps) {
  const [addField, showAddField] = useState(false);
  const isSuccess = true; //TODO add api
  return (
    <div className="template-keywords-modal">
      <ModalContainer
        title="Define keywords"
        controls={
          <TextButton
            text={'Close'}
            backgroundColor={color.light}
            radius={7}
            fontSize={14}
            onPress={() => Overlay_u.close()}
          />
        }
      >
        {isSuccess ? (
          <div className="fields-edit-content">
            <div className="fields-edit-items">
              {keywordFields.map((field, index) => (
                <KeywordFieldItem key={index} name={field} />
              ))}
              {addField && (
                <AddKeywordField
                  onSave={() => {
                    showAddField(!addField);
                  }}
                />
              )}
            </div>

            <TextButton
              text={addField ? 'Cancel' : 'new keyword'}
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
