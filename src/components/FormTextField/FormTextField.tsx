import * as React from "react";
import { FormHelperText, InputLabel, TextField } from "@mui/material";
import { Controller, Control, FieldErrorsImpl } from "react-hook-form";

interface FormTextFieldProps {
  control: Control;
  name: string;
  title: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: unknown;
    }>
  >;
}

export const FormTextField = ({
  control,
  name,
  title = "",
  errors
}: FormTextFieldProps) => {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value = "", name, ref },
        fieldState: { isTouched, isDirty, error }
      }) => (
        <>
          <InputLabel>{title}</InputLabel>
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={!!error}
          />
          <FormHelperText error={Boolean(errors[name]?.message)}>
            {errors[name]?.message as React.ReactNode}
          </FormHelperText>
        </>
      )}
      name={name}
      control={control}
      rules={{ required: true }}
    />
  );
};
