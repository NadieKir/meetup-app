import { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';

import { Typography, TypographyComponent } from 'components/Typography';
import { getFileSizeString } from 'common/helpers';
import { FileWithUrl } from 'common/types';

import styles from './ImageDropbox.module.scss';
import { ReactComponent as UploadIcon } from './upload.svg';

const ACCEPT_FORMATS = ['.jpg', '.jpeg', '.png'];

const MAX_FILESIZE = 10_485_760; // bytes

interface ImageDropboxProps {
  onDrop: (image: FileWithUrl) => void;
  externalError?: string;
}

export const ImageDropbox = ({
  onDrop,
  externalError,
}: ImageDropboxProps): JSX.Element => {
  const intl = useIntl();

  const [internalErrors, setInternalErrors] = useState<string[]>([]);

  const acceptOptions = ACCEPT_FORMATS.reduce((formats, format) => {
    return {
      ...formats,
      ...{
        ['image/' + format.slice(1)]: [],
      },
    };
  }, {});

  const acceptFileExtensions = ACCEPT_FORMATS.join(' ');

  const translateError = (error: string): string => {
    return error
      .replace('File type must be', intl.formatMessage({ id: 'fileTypeRule' }))
      .replace(
        'File is larger than',
        intl.formatMessage({ id: 'fileSizeRule' }),
      )
      .replace('bytes', intl.formatMessage({ id: 'bytes' }));
  };

  const handleAcceptedDrop = (acceptedFiles: File[]): void => {
    if (acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];

      const image: FileWithUrl = Object.assign(acceptedFile, {
        url: URL.createObjectURL(acceptedFile),
      });

      onDrop(image);
    }
  };

  const handleRejectedDrop = (fileRejections: FileRejection[]): void => {
    // https://github.com/react-dropzone/react-dropzone/pull/938
    const errors = fileRejections
      .flatMap(({ errors }: FileRejection): FileError[] => errors)
      .map(({ message }: FileError): string => message)
      .map(translateError);

    setInternalErrors(errors);
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } =
    useDropzone({
      accept: acceptOptions,
      noClick: true,
      noKeyboard: true,
      multiple: false,
      maxSize: MAX_FILESIZE,
      onDropAccepted: handleAcceptedDrop,
      onDropRejected: handleRejectedDrop,
    });

  const errors: string[] =
    internalErrors.length > 0
      ? internalErrors
      : externalError
      ? [externalError]
      : [];

  const classList = classNames(
    styles.dropbox,
    isDragAccept ? styles.willAccept : '',
    isDragReject || errors.length > 0 ? styles.willReject : '',
  );

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={classList}>
        <input {...getInputProps()} type="file" data-testid="fileUploader" />
        <UploadIcon />
        <Typography
          component={TypographyComponent.Paragraph}
          className={styles.promptText}
        >
          {intl.formatMessage({ id: 'dropImageHere' })}
          <br />
          {intl.formatMessage({ id: 'or' })}
          <button
            type="button"
            className={styles.browseFileLink}
            onClick={open}
          >
            {intl.formatMessage({ id: 'browse' })}
          </button>
        </Typography>
        <div className={styles.constraints}>
          <Typography component={TypographyComponent.Paragraph}>
            {intl.formatMessage({ id: 'allowedFormates' })}:{' '}
            {acceptFileExtensions}
          </Typography>
          <Typography component={TypographyComponent.Paragraph}>
            {intl.formatMessage({ id: 'maxFileSize' })}:{' '}
            {getFileSizeString(MAX_FILESIZE)}
          </Typography>
        </div>
        {errors.length > 0 ? (
          <ul className={styles.errors}>
            {errors.map((error: string, index: number) => (
              <li key={index}>
                <Typography
                  component={TypographyComponent.Paragraph}
                  className={styles.error}
                >
                  {error}
                </Typography>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
