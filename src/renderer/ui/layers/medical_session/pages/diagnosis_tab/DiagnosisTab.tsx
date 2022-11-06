import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import Input from '@components/inputs/input';
import {
  useDiagnosis,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  diagnosis: string;
};
export default function DiagnosisTab() {
  const diagnosis = useDiagnosis();
  const { control, getValues } = useForm<Data>({
    mode: 'onChange',
    defaultValues: { diagnosis: diagnosis ?? '' },
  });

  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="notice-tab">
      <Input
        type="textarea"
        name="diagnosis"
        control={control}
        placeholder="write something..."
      />
      <div className="save-btn-wrapper">
        <TextButton
          text={isSaved ? 'Saved' : 'Save'} //TODO  autosave
          backgroundColor={isSaved ? color.good_green : color.secondary_color}
          fontSize={14}
          onPress={() => {
            useMedicalSessionStore
              .getState()
              .setDiagnosis(getValues('diagnosis'));
            setIsSaved(true);
          }}
        />
      </div>
    </div>
  );
}
export function TimeLineDiagnosis({ diagnosis }: Data) {
  return (
    <div className="notice-tab">
      <div className="span-wrapper">
        <span>{diagnosis}</span>
      </div>
    </div>
  );
}
