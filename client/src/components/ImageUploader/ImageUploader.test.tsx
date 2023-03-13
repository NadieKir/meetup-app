import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FormikPropsWithOptionalSubmit,
  FormikWrapper,
  renderWithIntl,
} from 'common/utils';
import { ImagePreviewMode } from 'components/ImagePreview';

import { ImageUploader } from './ImageUploader';

const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const formikProps: FormikPropsWithOptionalSubmit = {
  initialValues: { image: '' },
};

const formikPropsWithInitialImage: FormikPropsWithOptionalSubmit = {
  initialValues: { image: mockFile.name },
};

it('Stores chosen file', () => {
  renderWithIntl()(
    <FormikWrapper formikProps={formikProps}>
      <ImageUploader
        name="image"
        variant={ImagePreviewMode.Thumbnail}
        labelText="Изображение"
      />
    </FormikWrapper>,
  );

  const input = screen.getByTestId('fileUploader') as HTMLInputElement;
  userEvent.upload(input, mockFile);

  expect(input.files![0]).toStrictEqual(mockFile);
});

it('Clear value on button click', () => {
  renderWithIntl()(
    <FormikWrapper formikProps={formikPropsWithInitialImage}>
      <ImageUploader
        name="image"
        variant={ImagePreviewMode.Thumbnail}
        labelText="Изображение"
      />
    </FormikWrapper>,
  );

  const closeBtn = screen.getByRole('button');
  userEvent.click(closeBtn);

  const input = screen.getByTestId('fileUploader') as HTMLInputElement;

  expect(input.files).toHaveLength(0);
});
