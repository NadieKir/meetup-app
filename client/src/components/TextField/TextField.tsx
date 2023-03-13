import { Input, InputType } from 'components/Input';
import { TextArea } from 'components/TextArea';
import {
  InputFieldExternalProps,
  InputField,
  InputRenderProps,
} from 'components/InputField';

type TextInputOrAreaProps = {
  placeholderText?: string;
} & (
  | {
      multiline: false | undefined;
    }
  | {
      multiline: true;
      maxLetterCount?: number;
    }
);

type TextFieldProps = InputFieldExternalProps & TextInputOrAreaProps;

export const TextField = (props: TextFieldProps): JSX.Element => {
  let placeholderText: string | undefined;
  let inputFieldProps: InputFieldExternalProps;
  let multiline: boolean | undefined;
  let maxLetterCount: number | undefined;

  switch (props.multiline) {
    case true:
      ({ placeholderText, multiline, maxLetterCount, ...inputFieldProps } =
        props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <TextArea
              {...field}
              className={className}
              placeholder={placeholderText}
              maxLetterCount={maxLetterCount}
            />
          )}
        </InputField>
      );
    case false:
    default:
      ({ placeholderText, ...inputFieldProps } = props);

      return (
        <InputField {...inputFieldProps}>
          {({ field, className }: InputRenderProps): JSX.Element => (
            <Input
              {...field}
              className={className}
              placeholder={placeholderText}
              type={InputType.Text}
            />
          )}
        </InputField>
      );
  }
};
