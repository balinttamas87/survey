import * as React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface FormCheckboxProps {
  control: Control;
  name: string;
  title: string;
  choices: string[];
}

export const FormCheckbox = ({
  control,
  name,
  title = "",
  choices
}: FormCheckboxProps) => {
  return (
    <FormGroup>
      {choices.map((choice) => {
        return (
          <Controller
            control={control}
            name={`${name}_${choice}`}
            render={({
              field: { onChange, onBlur, value = false, name, ref },
              fieldState: { isTouched, isDirty, error },
              formState
            }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      inputRef={ref}
                    />
                  }
                  label={choice}
                />
              </>
            )}
          />
        );
      })}
    </FormGroup>
  );
};
