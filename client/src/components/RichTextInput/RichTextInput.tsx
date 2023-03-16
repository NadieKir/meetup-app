import { FormikValues, useFormikContext } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import classNames from 'classnames';

import { InputField, InputFieldExternalProps } from 'components/InputField';

import styles from './RichTextInput.module.scss';

export function RichTextInput<T extends FormikValues>({
  name,
  ...inputFieldProps
}: InputFieldExternalProps) {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<T>();
  const value = values[name];

  return (
    <InputField name={name} {...inputFieldProps}>
      {({ className }) => (
        <div className={classNames(className, styles.richtext)}>
          <CKEditor
            editor={BalloonEditor}
            config={{
              toolbar: ['bold', 'italic', 'link', '|', 'undo', 'redo'],
            }}
            data={value}
            onChange={(event: any, editor: { getData: () => string }) => {
              setFieldValue(name, editor.getData());
              setFieldTouched(name, true, true);
            }}
            onBlur={() => {
              setFieldTouched(name, true, true);
            }}
          />
        </div>
      )}
    </InputField>
  );
}
