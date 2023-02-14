import AsyncSelect from 'react-select/async';
import { useFormikContext } from 'formik';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import {
  InputField,
  InputFieldExternalProps,
  InputRenderProps,
} from 'components';
import { EmotionCacheProvider } from 'common/contexts';

import styles from './MultiSelect.module.scss';

export type MultiSelectOption<T> = {
  value: T;
  label: string;
};

type MultiSelectProps<T> = {
  options: MultiSelectOption<T>[];
  placeholderText?: string;
} & InputFieldExternalProps;

export function MultiSelect<T>({
  placeholderText,
  options,
  ...inputFieldProps
}: MultiSelectProps<T>) {
  const intl = useIntl();

  const { setFieldValue, setFieldTouched } = useFormikContext();

  const loadOptions = (
    value: string,
    callback: (options: MultiSelectOption<T>[]) => void,
  ) => {
    const filterColors = (arr: MultiSelectOption<T>[]) => {
      return arr.filter((i) =>
        i.label.toLowerCase().includes(value.toLowerCase()),
      );
    };

    callback(filterColors(options));
  };

  return (
    <EmotionCacheProvider>
      <InputField {...inputFieldProps}>
        {({ field, className }: InputRenderProps): JSX.Element => (
          <AsyncSelect
            classNames={{
              control: (state) =>
                classNames(className, styles.multiSelect, {
                  [styles.multiSelectFocused]: state.isFocused,
                }),
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderColor: undefined,
                boxShadow: undefined,
              }),
            }}
            isMulti
            defaultOptions={options}
            cacheOptions
            loadOptions={loadOptions}
            onBlur={() => setFieldTouched(field.name, true)}
            onChange={(options) => {
              const values = options.map((option) => option.value);

              setFieldValue(
                field.name,
                values.length === 0 ? undefined : values,
              );
            }}
            placeholder={placeholderText}
            noOptionsMessage={() => intl.formatMessage({ id: 'noResults' })}
          />
        )}
      </InputField>
    </EmotionCacheProvider>
  );
}
