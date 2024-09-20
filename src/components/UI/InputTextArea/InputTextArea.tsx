import TextArea, { TextAreaProps } from 'antd/es/input/TextArea';
import { Input } from 'antd';
import classNames from 'classnames';
interface InputTextArea extends TextAreaProps {
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent) => void;
}
function InputTextArea(props: InputTextArea) {
  const { className = '', placeholder = '', ...rest } = props;
  return (
    <Input.TextArea
      placeholder={placeholder}
      className={classNames({
        [className]: !!className,
      })}
      {...rest}
    />
  );
}

export default InputTextArea;
