import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import { Overlay_u, modal } from '@stores/overlayStore';
import KeywordFieldItem from '@components/keyword_field_item';
import add from 'toSvg/add.svg?icon';
import VerticalPanel from '@components/vertical_panel';
import CertificateEditorModal from '../certificate_editor_modal';
import { DEFAULT_MODAL } from '@libs/overlay';

const keywordFields = [
  {
    id: 1,
    name: 'certificate',
  },
  {
    id: 2,
    name: 'certificate',
  },
  {
    id: 3,
    name: 'certificate',
  },
  {
    id: 4,
    name: 'certificate',
  },
  {
    id: 5,
    name: 'certificate',
  },
  {
    id: 6,
    name: 'certificate',
  },
];
interface ReusableCertificatesModalProps {}
export default function ReusableCertificatesModal({}: ReusableCertificatesModalProps) {
  const isSuccess = true; //TODO add api

  return (
    <div className="template-keywords-modal">
      <ModalContainer
        title="Reusable certificates"
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
                <KeywordFieldItem key={index} name={field.name} />
              ))}
            </div>

            <TextButton
              text={'new certificate'}
              Icon={add}
              afterBgColor={color.darkersec_color}
              fontSize={14}
              fontWeight={500}
              radius={7}
              padding={10}
              borderColor={color.silver_gray}
              onPress={() => {
                modal(<CertificateEditorModal />, DEFAULT_MODAL).open();
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
