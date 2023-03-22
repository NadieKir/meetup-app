import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { Typography, TypographyComponent } from 'components/Typography';
import { convertStringToFileWithUrl, getFileSizeString } from 'common/helpers';

import styles from './ImagePreview.module.scss';
import { ReactComponent as ImagePlaceholder } from './assets/image-placeholder.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as ChangeImageIcon } from './assets/change-photo.svg';

export enum ImagePreviewMode {
  Thumbnail = 'thumbnail',
  Large = 'large',
}

interface ImagePreviewProps {
  variant?: ImagePreviewMode;
  image: string;
  onClear: () => void;
}

export const ImagePreview = ({
  variant = ImagePreviewMode.Thumbnail,
  image,
  onClear,
}: ImagePreviewProps): JSX.Element => {
  const intl = useIntl();

  const { size, url } = convertStringToFileWithUrl(image);

  const handleClear = (): void => {
    onClear();
  };

  return (
    <div className={classNames(styles.preview, styles[variant])}>
      <figure className={styles.image}>
        {url ? (
          <img src={url} alt={intl.formatMessage({ id: 'uploadedImageAlt' })} />
        ) : (
          <ImagePlaceholder className={styles.placeholder} />
        )}
      </figure>
      {variant === ImagePreviewMode.Thumbnail && (
        <div className={styles.info}>
          <Typography
            component={TypographyComponent.Paragraph}
            className={styles.fileSize}
          >
            {intl.formatMessage({ id: 'fileSize' })}:{' '}
            {getFileSizeString(size, 1)}
          </Typography>
        </div>
      )}
      <button className={styles.clearBtn} onClick={handleClear}>
        {variant === ImagePreviewMode.Thumbnail ? (
          <CloseIcon />
        ) : (
          <ChangeImageIcon />
        )}
      </button>
    </div>
  );
};
