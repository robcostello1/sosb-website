import React, { useEffect, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Controls from './Controls';

export default {
  title: "Utils/Controls",
  component: Controls,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Controls>;

const Template: ComponentStory<typeof Controls> = ({
  volume: extVolume,
  onChangeVolume: extOnChangeVolume,
  ...args
}) => {
  const [volume, setVolume] = useState(extVolume);

  useEffect(() => {
    setVolume(extVolume);
  }, [extVolume]);

  return <Controls onChangeVolume={setVolume} volume={volume} {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  volume: 60,
  fullscreen: false,
};
