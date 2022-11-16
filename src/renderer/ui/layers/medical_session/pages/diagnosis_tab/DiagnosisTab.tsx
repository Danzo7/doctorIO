import Input from '@components/inputs/input';
import {
  useDiagnosis,
  useMedicalSessionStore,
} from '@stores/medicalSessionStore';
import { useForm } from 'react-hook-form';
import './style/index.scss';

type Data = {
  diagnosis: string;
};
export default function DiagnosisTab() {
  const diagnosis = useDiagnosis();
  const { control } = useForm<Data>({
    mode: 'onChange',
    defaultValues: { diagnosis: diagnosis ?? '' },
  });

  return (
    <div className="notice-tab">
      <Input
        type="textarea"
        name="diagnosis"
        control={control}
        placeholder="write something..."
        onChange={(e) => {
          useMedicalSessionStore.getState().setDiagnosis(e);
        }}
      />
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
