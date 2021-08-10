[{name:"react",variants:["componentName"],template:[
  [
    '{{componentName}}.tsx',
    `
  import React from 'react';
  import './index.scss';
  interface {{componentName}} {
  }
  
  function {{componentName}}({}: {{componentName}}) {
    return (
      <div className="{{componentName}}"></div>
    );
  }
  
  export default {{componentName}};
  
  `,
  ],
  [
    'index.ts',
    `import {{componentName}} from './{{componentName}}';
    export default {{componentName}};`,
  ],
  [
    'style/index.scss',
    `.{{componentName}}{
    
  }`,
  ],
  ["{{componentName}}.stories.tsx",
  `import React, { ComponentProps } from 'react';
  import type { Story } from '@storybook/react';
  import  {{componentName}}  from './{{componentName}}';
  //👇 This default export determines where your story goes in the story list
  export default {
    title: '{{componentName}}',
    component: {{componentName}},
  };
  const Template: Story<ComponentProps<typeof {{componentName}}>> = (args) => <{{componentName}} {...args} />;
  export const FirstStory = Template.bind({});
  FirstStory.args = {
  };`
]
]
}];