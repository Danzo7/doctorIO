import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { camelCase, pascalCase } from '@shipengine/capitalization';
interface InsertAttributesModalProps {
  elements?: {
    group: { name: string; color?: string };
    items: string[];
  }[];
  onChange?: (value: {
    text: string;
    color?: string;
    reference: string;
  }) => void;
  close?: () => void;
}
export default function InsertAttributesModal({
  elements: items,
  onChange,
  close,
}: InsertAttributesModalProps) {
  return (
    <ModalContainer
      title="Insert Attributes"
      className="insert-attributes-modal"
      controls={
        <TextButton
          text="cancel"
          onPress={() => {
            close?.();
          }}
        />
      }
    >
      <div className="insert-attributes-content">
        {items?.map((element, index) => (
          <div className="element" key={index + element.group.name}>
            <div className="group-name">
              {element.group.color && (
                <div
                  className="dot"
                  css={{
                    width: 10,
                    height: 10,
                    backgroundColor: element.group.color,
                    borderRadius: 100,
                  }}
                />
              )}{' '}
              <span>{element.group.name}</span>
            </div>
            <div className="attributes">
              {element.items.map((item, i) => (
                <TextButton
                  key={i + item}
                  afterBgColor={color.darker}
                  text={item}
                  borderColor={color.silver_gray}
                  padding={5}
                  fontSize={13}
                  fontWeight={500}
                  fontColor={color.text_gray}
                  afterFontColor={color.white}
                  onPress={() => {
                    onChange?.({
                      text: item,
                      color: element.group.color,
                      reference:
                        pascalCase(element.group.name) + '.' + camelCase(item),
                    });
                    close?.();
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
}
