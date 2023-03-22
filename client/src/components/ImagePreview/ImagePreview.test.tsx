import { screen } from '@testing-library/react';
import { renderWithIntl } from 'common/utils';

import { ImagePreview, ImagePreviewMode } from './ImagePreview';

import image from 'assets/images/logo.svg';

const fn = jest.fn();

it('Renders only image', async () => {
  renderWithIntl()(
    <ImagePreview
      variant={ImagePreviewMode.Large}
      image={image}
      onClear={fn}
    />,
  );

  expect(screen.getByAltText('Загруженное изображение')).toBeInTheDocument();
  expect(screen.queryByText(/Размер файла/)).not.toBeInTheDocument();
});

it('Renders image with info', async () => {
  renderWithIntl()(
    <ImagePreview
      variant={ImagePreviewMode.Thumbnail}
      image={image}
      onClear={fn}
    />,
  );

  expect(screen.getByAltText('Загруженное изображение')).toBeInTheDocument();
  expect(screen.getByText(/Размер файла/)).toBeInTheDocument();
});
