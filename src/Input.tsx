import * as React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import {
  TextFieldProps,
  OutlinedTextFieldProps
} from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { useCallback } from "react";
import { useToggle } from "react-use";
import { single } from "validate.js";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface InputProps {
  inputType?: "name" | "email" | "tel";
}

export const Input = ({
  inputType = "name",
  onChange,
  ...props
}: InputProps & TextFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>();
  const [isError, toggleError] = useToggle(false);
  function getAdornmentIcon() {
    switch (inputType) {
      case "name":
        return <AccountCircleIcon />;
      case "email":
        return <EmailIcon />;
      case "tel":
        return <PhoneIcon />;
      default:
        return null;
    }
  }
  const runValidation = useCallback(() => {
    let typesToValidate = ["email", "tel", "name"];
    if (typesToValidate.includes(inputType)) {
      let inputValue = inputRef && inputRef.current && inputRef.current.value;
      switch (inputType) {
        case "email":
          let emailError = single(inputValue, {
            presence: true,
            email: true
          });
          toggleError(!!(emailError && emailError.length));
          break;
        case "tel":
          let phoneError = single(inputValue, {
            presence: true,
            format: {
              pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
            }
          });
          toggleError(!!(phoneError && phoneError.length));
          break;
        case "name":
          let nameError = single(inputValue, {
            presence: true,
            length: {
              minimum: 6,
              message: "must be at least 6 characters"
            }
          });
          toggleError(!!(nameError && nameError.length));
          break;
        default:
          return true;
      }
    }
    return true;
  }, [toggleError, inputType]);

  const handleOnChange = useCallback(
    e => {
      onChange && onChange(e);
      runValidation();
    },
    [onChange, runValidation]
  );
  const getLabel = useCallback(() => {
    switch (inputType) {
      case "name":
        return "Name";
      case "tel":
        return "Phone";
      case "email":
        return "Email";
      default:
        return "";
    }
  }, [inputType]);
  const getPlaceholder = useCallback(() => {
    switch (inputType) {
      case "name":
        return "Jon Ward";
      case "tel":
        return "1234567890";
      case "email":
        return "example@gmail.com";
      default:
        return "";
    }
  }, [inputType]);
  return (
    <TextField
      label={getLabel()}
      placeholder={getPlaceholder()}
      error={isError}
      type={inputType}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        inputProps: { ref: inputRef },
        startAdornment: (
          <InputAdornment position="start">{getAdornmentIcon()}</InputAdornment>
        )
      }}
      {...props}
      onChange={handleOnChange}
    />
  );
};
export const OutlinedInput = (props: InputProps & TextFieldProps) => (
  <Input {...props} variant="outlined" />
);
export default Input;
