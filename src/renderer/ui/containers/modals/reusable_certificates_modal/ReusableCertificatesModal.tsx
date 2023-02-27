import ModalContainer from '@components/modal_container';
import './style/index.scss';
import TextButton from '@components/buttons/text_button';
import { color } from '@assets/styles/color';
import KeywordFieldItem from '@components/keyword_field_item';
import add from 'toSvg/add.svg?icon';
import { DEFAULT_MODAL, modal } from '@libs/overlay';
import {
  useDeleteCertificateTemplateMutation,
  useGetCertificateTemplatesQuery,
} from '@redux/clinic/templates/templatesApi';
import LoadingSpinner from '@components/loading_spinner';
import RefetchPanel from '@components/refetch_panel';
import AddNewCertificateModal from '../add_new_certificate_modal';

interface ReusableCertificatesModalProps {}
export default function ReusableCertificatesModal({}: ReusableCertificatesModalProps) {
  const { isSuccess, isLoading, data, refetch } =
    useGetCertificateTemplatesQuery();
  const [deleteCertificateTemplate] = useDeleteCertificateTemplateMutation();

  return (
    <div className="template-keywords-modal">
      <ModalContainer
        title="Reusable certificates"
        controlsPosition="end"
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
        {isLoading ? (
          <LoadingSpinner />
        ) : isSuccess ? (
          <div className="fields-edit-content">
            <div className="fields-edit-items">
              {data.map(({ id, title }) => (
                <KeywordFieldItem
                  key={id}
                  name={title}
                  textGrow
                  onEdit={() => {
                    modal(
                      <AddNewCertificateModal
                        defaultValue={{ id: id.toString(), title: title }}
                      />,
                      { ...DEFAULT_MODAL, width: '90%', height: '90%' },
                      'certificateModal',
                    ).open();
                  }}
                  onDelete={() => {
                    deleteCertificateTemplate(id);
                    //TODO add toast to indicate the operation result
                  }}
                />
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
                modal(<AddNewCertificateModal />, {
                  ...DEFAULT_MODAL,
                  width: '90%',
                  height: '90%',
                }).open();
              }}
            />
          </div>
        ) : (
          <RefetchPanel action={refetch} />
        )}
      </ModalContainer>
    </div>
  );
}
