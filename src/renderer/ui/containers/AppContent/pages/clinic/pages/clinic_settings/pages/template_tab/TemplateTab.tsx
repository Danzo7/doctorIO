import './style/index.scss';
import BorderSeparator from '@components/border_separator';
import Input from '@components/inputs/input';
import { useForm } from 'react-hook-form';
import SettingOption from '@components/setting_option';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { modal } from '@libs/overlay';

import TemplateKeywordsModal from '@containers/modals/reusable_certificates_modal';
import { DEFAULT_MODAL } from '@libs/overlay';
import HelpPanel from '@components/help_panel';
import useNavigation from '@libs/hooks/useNavigation';

interface TemplateTabProps {}
export default function TemplateTab({}: TemplateTabProps) {
  const { navigate } = useNavigation();
  const { control } = useForm<{ paperSize: 'A4' | 'A5' }>({
    defaultValues: { paperSize: 'A4' },
  });

  return (
    <div className="template-tab">
      <div className="template-tab-content">
        <SettingOption
          gap={2}
          flexDirection="row"
          title={{
            text: 'Template editor',
            fontSize: 15,
            fontWeight: 600,
            fontColor: color.white,
          }}
          description={{
            text: 'The template is used during printing.',
            fontSize: 14,
            fontWeight: 500,
            fontColor: color.text_gray,
          }}
          controls={
            <TextButton
              text="Open editor"
              fontColor={color.white}
              fontSize={13}
              fontWeight={600}
              backgroundColor={color.darkersec_color}
              radius={7}
              borderColor={color.border_color}
              afterBgColor={color.darkersec_color}
              onPress={() => {
                navigate('/templateEditor');
              }}
            />
          }
        />
        <BorderSeparator direction="horizontal" />
        <SettingOption
          flexDirection="row"
          gap={2}
          title={{
            text: 'Customize reusable certificates',
            fontSize: 15,
            fontWeight: 600,
            fontColor: color.white,
          }}
          description={{
            text: 'The reusable certificates can be used during a session.',
            fontSize: 14,
            fontWeight: 500,
            fontColor: color.text_gray,
          }}
          controls={
            <TextButton
              text="Edit"
              fontColor={color.white}
              fontSize={13}
              fontWeight={600}
              backgroundColor={color.darkersec_color}
              radius={7}
              borderColor={color.border_color}
              afterBgColor={color.darkersec_color}
              onPress={() => {
                modal(<TemplateKeywordsModal />, {
                  ...DEFAULT_MODAL,
                  width: '35%',
                }).open();
              }}
            />
          }
        />

        <BorderSeparator direction="horizontal" />
        <SettingOption
          gap={5}
          title={{
            text: 'Paper size',
            fontSize: 15,
            fontWeight: 600,
            fontColor: color.white,
          }}
          description={{
            text: 'Select the size of the paper to print on.',
            fontSize: 14,
            fontWeight: 500,
            fontColor: color.text_gray,
          }}
          controls={
            <Input
              control={control}
              background="none"
              name="paperSize"
              type={{
                type: 'multiCheck',
                onlyOne: true,
                mustOne: true,
                options: ['A4', 'A5'],
              }}
            />
          }
        />
      </div>
      <HelpPanel
        title="Predefined Keywords" //TODO correct the text values
        description="The software provide a predefined keywords that can be used in a text area to automatically insert a known value. It is similar to tags in social medial and other platforms$"
        textList={[
          '“@” is the mention keyword, It automatically finish the following known values: (Patient name, Doctor name, Date, bDate, age)',
          '“/” Is used to auto fill the notice with a defined text.',
        ]}
      />
    </div>
  );
}
