import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import PreviewInfo from './PreviewInfo';
export default {
  title: 'PreviewInfo',
  component: PreviewInfo,
};
const Template: Story<ComponentProps<typeof PreviewInfo>> = (args) => (
  <PreviewInfo {...args} />
);
export const FirstStory = Template.bind({});
FirstStory.args = {
  title: 'Patient',
  previewInfoObj: {
    Name: 'John Brown',
    dateOfBirth: '1998/04/25 (24yo)',
    FirstVisit: '2022/05/20 ',
  },
};
