import TextButton from '@components/buttons/text_button';
import { color } from '@colors';
import PresentationItem from '@components/presentation_item';
interface RecentAppsItemProps {
  fullName: string;
  age: number;
}
export default function RecentAppsItem({ fullName, age }: RecentAppsItemProps) {
  return (
    <PresentationItem primaryText={fullName} secondaryText={`Age ${age}`}>
      <TextButton
        text="Run diagnosis..."
        backgroundColor={color.cold_blue}
        radius={7}
      />
      <TextButton text="Add" backgroundColor={color.good_green} radius={7} />
    </PresentationItem>
  );
}
