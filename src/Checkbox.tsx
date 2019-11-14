import * as React from "react";
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Box
} from "@material-ui/core";

interface ICheckboxProps {
  value?: boolean;
  onChange?: (id: string, value: string | number | undefined | boolean) => void;
  name: string;
  label?: React.ReactNode;
}
export const Radio = ({ value, onChange, name, label }: ICheckboxProps) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(name, e.target.checked && (label as string));
    },
    [onChange, name, label]
  );
  return (
    <Box minWidth="200px">
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={value} onChange={handleChange} value={name} />
            }
            label={label}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Radio;
