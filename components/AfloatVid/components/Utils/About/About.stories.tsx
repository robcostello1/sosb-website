import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import About from './About';

export default {
  title: "Utils/About",
  component: About,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof About>;

const Template: ComponentStory<typeof About> = (args) => {
  return <About {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
