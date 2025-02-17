import React, {
  FormEvent,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import "./input.scss";
import { Field } from "formik";

interface InputProps {
  showClear?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: string;
  disabled?: boolean;
  type?: "text" | "email" | "password" | "url" | "number";
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  label?: string;
  name?: string;
  showHelpTextIcon?: boolean;
  isFormElement?: boolean;
  labelHelpText?: string;
  required?: boolean;
  placeholder?: string;
  errorMsg?: string;
  matchRegex?: {
    regExp: string | RegExp | "";
    errorMsg: string;
  };
  readonly?: boolean;
  onClick?: (e: MouseEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseOver?: (e: MouseEvent) => void;
  onMouseOut?: (e: MouseEvent) => void;
  onInput?: (e: FormEvent) => void;
  onClear?: () => void;
  onChange?: (e: any) => void;
  mask?: string;
}

const Input: React.FC<InputProps> = ({
  onClear,
  showClear,
  onChange,
  prefix,
  suffix,
  label,
  required,
  disabled,
  readonly,
  errorMsg,
  isFormElement = true,
  labelHelpText,
  ...props
}) => {
  const [isPassword, setIsPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState(isPassword && "password");
  const [type, setType] = useState(props.type || "text");
  const inputRef = useRef(null);
  useEffect(() => {
    if (type === "password") {
      setIsPassword(true);
    }
  });
  function showHidePassword(type: "text" | "password"): void {
    setType(type);
    setIsShowPassword(!isShowPassword);
  }
  return (
    <div className="input-group">
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
          {labelHelpText && (
            <span className="help-icon ">
              <span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.99984 1.24984C2.92877 1.24984 1.24984 2.92877 1.24984 4.99984C1.24984 7.07091 2.92877 8.74984 4.99984 8.74984C7.07091 8.74984 8.74984 7.07091 8.74984 4.99984C8.74984 2.92877 7.07091 1.24984 4.99984 1.24984ZM0.416504 4.99984C0.416504 2.46853 2.46853 0.416504 4.99984 0.416504C7.53114 0.416504 9.58317 2.46853 9.58317 4.99984C9.58317 7.53114 7.53114 9.58317 4.99984 9.58317C2.46853 9.58317 0.416504 7.53114 0.416504 4.99984Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.58301 2.91667C4.58301 2.68655 4.76956 2.5 4.99967 2.5H5.00384C5.23396 2.5 5.42051 2.68655 5.42051 2.91667C5.42051 3.14679 5.23396 3.33333 5.00384 3.33333H4.99967C4.76956 3.33333 4.58301 3.14679 4.58301 2.91667Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75 4.58317C3.75 4.35305 3.93655 4.1665 4.16667 4.1665H5C5.23012 4.1665 5.41667 4.35305 5.41667 4.58317V6.6665C5.41667 6.89662 5.23012 7.08317 5 7.08317C4.76988 7.08317 4.58333 6.89662 4.58333 6.6665V4.99984H4.16667C3.93655 4.99984 3.75 4.81329 3.75 4.58317Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75 6.66667C3.75 6.43655 3.93655 6.25 4.16667 6.25H5.83333C6.06345 6.25 6.25 6.43655 6.25 6.66667C6.25 6.89679 6.06345 7.08333 5.83333 7.08333H4.16667C3.93655 7.08333 3.75 6.89679 3.75 6.66667Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div className="help-info">{labelHelpText}</div>
            </span>
          )}
        </label>
      )}
      <div
        className={`input-control ${disabled && "input-disabled"} ${
          readonly && "input-readonly "
        } ${errorMsg && "error"}`}
      >
        {prefix && <span className="affix prefix">{prefix}</span>}
        {isFormElement ? (
          <Field
            {...props}
            onChange={onChange}
            type={type}
            disabled={disabled}
            value={props?.value ? props?.value : ""}
          ></Field>
        ) : (
          <input
            {...props}
            type={type}
            ref={inputRef}
            onChange={onChange}
            disabled={disabled}
            value={props?.value ? props?.value : ""}
          ></input>
        )}
        {isPassword && !isShowPassword && (
          <div
            onClick={() => {
              showHidePassword("text");
            }}
            className="affix"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 469.333 469.333"
              xmlSpace="preserve"
            >
              <path d="M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z" />
              <path
                d="M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160
            c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333
            c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667
            S293.547,341.333,234.667,341.333z"
              />
            </svg>
          </div>
        )}
        {isPassword && isShowPassword && (
          <div onClick={() => showHidePassword("password")} className="affix">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 469.333 469.333"
              xmlSpace="preserve"
            >
              <path
                d="M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z"
                fill="#13ada4"
              />
              <path
                d="M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160
            c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333
            c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667
            S293.547,341.333,234.667,341.333z"
                fill="#13ada4"
              />
            </svg>
          </div>
        )}
        {suffix && <span className="affix suffix">{suffix}</span>}
      </div>
      {errorMsg && (
        <div className="error-message">
          <span className="custom-error-message">{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
export default Input;
