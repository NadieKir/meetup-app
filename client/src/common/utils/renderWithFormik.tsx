import { ComponentProps, PropsWithChildren } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { Formik, Form } from 'formik';

type FormikProps = ComponentProps<typeof Formik>;

export type FormikPropsWithOptionalSubmit = Omit<FormikProps, 'onSubmit'> & {
  onSubmit?: FormikProps['onSubmit'];
};

const mockSubmit = jest.fn();

interface FormikWrapperProps {
  formikProps: FormikPropsWithOptionalSubmit;
}

export function FormikWrapper({
  formikProps,
  children,
}: PropsWithChildren<FormikWrapperProps>) {
  return (
    <Formik onSubmit={mockSubmit} {...formikProps}>
      <Form>{children}</Form>
    </Formik>
  );
}

export const renderWithFormik =
  (formikProps: FormikPropsWithOptionalSubmit) =>
  (
    ui: JSX.Element,
    renderOptions?: Partial<Omit<RenderOptions, 'wrapper'>>,
  ) => {
    const Wrapper = ({ children }: PropsWithChildren) =>
      FormikWrapper({ formikProps, children });

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };
