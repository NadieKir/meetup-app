import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CloseButton } from 'components';

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  argTypes: { onClick: { action: 'clicked' } },
  args: {
    disabled: false,
  },
} as ComponentMeta<typeof CloseButton>;

const Template: ComponentStory<typeof CloseButton> = (args) => (
  <CloseButton {...args} />
);

export const Example = Template.bind({});
