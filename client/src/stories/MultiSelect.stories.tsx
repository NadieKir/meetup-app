import { ComponentProps } from 'react';
import classNames from 'classnames';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import {
  Button,
  MultiSelect,
  Typography,
  TypographyComponent,
} from 'components';
import { ShortUser } from 'common/model';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof MultiSelect>;

interface FormValues {
  [speakers: string]: ShortUser[];
}

const options = [
  {
    value: { id: 1, name: 'John' },
    label: 'John',
  },
  {
    value: { id: 2, name: 'Bill' },
    label: 'Bill',
  },
  {
    value: { id: 3, name: 'Liz' },
    label: 'Liz',
  },
  {
    value: { id: 4, name: 'Bob' },
    label: 'Bob',
  },
  {
    value: { id: 5, name: 'Ann' },
    label: 'Ann',
  },
  {
    value: { id: 6, name: 'Millie' },
    label: 'Millie',
  },
];

const Template: ComponentStory<typeof MultiSelect> = (args) => (
  <Formik<FormValues>
    initialValues={{
      [args.name]: [],
    }}
    validationSchema={yup.object().shape({
      [args.name]: yup.array().required(`${args.labelText} is required`),
    })}
    onSubmit={(values: FormValues, { setSubmitting }) => {
      console.log(values[args.name]);
      setSubmitting(false);
    }}
  >
    {({ values }) => (
      <Form
        autoComplete="off"
        style={{
          width: '500px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '12px',
        }}
      >
        <MultiSelect {...args} />
        <Button type="submit">Submit (check console logs)</Button>
        <Typography
          component={TypographyComponent.Paragraph}
          className={classNames(
            'font-family-primary',
            'font-color-dark',
            'font-size-xs',
            'line-height-xs',
          )}
        >
          Field value:{' '}
          {values[args.name] && values[args.name].map((v) => v.name).join(', ')}
        </Typography>
      </Form>
    )}
  </Formik>
);

type MultiSelectProps = Partial<ComponentProps<typeof MultiSelect>>;

const multiSelectArgs: MultiSelectProps = {
  name: 'speakers',
  labelText: 'Speakers',
  placeholderText: 'Choose speakers',
  options: options,
};

export const Default = Template.bind({});

Default.args = multiSelectArgs;
