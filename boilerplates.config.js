[
  {
    name: 'react',
    variants: ['componentName'],
    template: [
      [
        '{{componentName}sc}/{{componentName}pc}.tsx',
        `import './style/index.scss';
interface {{componentName}pc}Props {}
export default function {{componentName}pc}({}: {{componentName}pc}Props) {
  return <div className="{{componentName}kc}"></div>;
}
`,
      ],
      [
        '{{componentName}sc}/index.ts',
        `import {{componentName}pc} from './{{componentName}pc}';
export default {{componentName}pc};
`,
      ],
      [
        '{{componentName}sc}/style/index.scss',
        `@use '~styles/appColors' as *;
.{{componentName}kc} {
}
`,
      ],
      [
        '{{componentName}sc}/{{componentName}pc}.stories.tsx',
        `import { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import {{componentName}pc} from './{{componentName}pc}';
export default {
  title: '{{componentName}pc}',
  component: {{componentName}pc},
};
const Template: Story<ComponentProps<typeof {{componentName}pc}>> = (args) => (
  <{{componentName}pc} {...args} />
);
export const FirstStory = Template
FirstStory.args = {};
`,
      ],
    ],
  },
  {
    name: 'zustand',
    variants: ['storeName'],
    template: [
      [
        '{{storeName}cc}Store.ts',
        `import create from 'zustand';

interface {{storeName}pc}State {}

export const use{{storeName}pc}Store = create<{{storeName}pc}State>(
  (set) => ({}),
);
`,
      ],
    ],
  },
];
