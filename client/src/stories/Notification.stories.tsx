import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INotification, Notification, NotificationVariant } from 'components';
import { usePushNotification } from 'common/hooks';

export default {
  title: 'Components/Notification',
  component: Notification,
  args: {
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => {
  const { pushNotification } = usePushNotification();

  const params = args as INotification;

  return (
    <button
      onClick={() =>
        pushNotification({
          heading: params.heading,
          variant: params.variant,
          message: params.message,
        })
      }
    >
      Click to trigger notification
    </button>
  );
};

export const Success = Template.bind({});

Success.args = {
  variant: NotificationVariant.Success,
  heading: 'Success',
};

export const Warning = Template.bind({});
Warning.args = {
  variant: NotificationVariant.Warning,
  heading: 'Warning',
};

export const Error = Template.bind({});
Error.args = {
  variant: NotificationVariant.Error,
  heading: 'Error',
};

export const Info = Template.bind({});
Info.args = {
  variant: NotificationVariant.Info,
  heading: 'Info',
};
