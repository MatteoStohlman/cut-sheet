import * as React from "react";
import {
  Radio as RadioMui,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Box
} from "@material-ui/core";

interface IRadioProps {
  value?: string | number | null;
  onChange?: (id: string, value: string | number | undefined) => void;
  options: string[];
  name: string;
  label?: React.ReactNode;
}
export const Radio = ({
  value,
  onChange,
  options,
  name,
  label
}: IRadioProps) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(name, e.target.value);
    },
    [onChange, name]
  );
  return (
    <Box mb="20px" minWidth="200px">
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <RadioGroup name={name} value={value} onChange={handleChange}>
          {options.map(option => {
            return (
              <FormControlLabel
                value={option}
                control={<RadioMui />}
                label={option}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Radio;
