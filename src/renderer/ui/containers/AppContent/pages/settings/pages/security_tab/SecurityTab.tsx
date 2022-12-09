import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import SettingOption from '@components/setting_option';
import { useState } from 'react';
import './style/index.scss';
interface SecurityTabProps {}
export default function SecurityTab({}: SecurityTabProps) {
  const [password, setPassword] = useState(false);
  return (
    <div className="security-tab">
      <SettingOption
        title="Secret key"
        description="The default secret key is provided by the current clinic only."
        controls={
          <TextButton
            text="Change..."
            fontColor={color.white}
            fontSize={13}
            fontWeight={600}
            backgroundColor={color.darkersec_color}
            radius={7}
            borderColor={color.border_color}
            afterBgColor={color.darkersec_color}
            afterFontColor={color.cold_red}
          />
        }
      />
      <SettingOption
        title="Password"
        description="When setting a password to the software you will be asked to provide the password each time you open the software."
        useToggleButton={{ isChecked: password, onChange: setPassword }}
        controls={
          <TextButton
            text="Change..."
            fontColor={color.white}
            fontSize={13}
            fontWeight={600}
            backgroundColor={color.darkersec_color}
            radius={7}
            borderColor={color.border_color}
            afterBgColor={color.darkersec_color}
            afterFontColor={color.cold_red}
            disabled={!password}
          />
        }
      />
      <span className="note-span">
        Note: password does not replace the secret key, you will still need a
        secret key to join a clinic server each time you disconnected.
      </span>
    </div>
  );
}
