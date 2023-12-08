import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

function AppFormField({ name, style, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
        style={style}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
