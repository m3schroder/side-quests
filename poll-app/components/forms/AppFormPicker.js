import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import AppErrorMessage from "./AppErrorMessage";

function AppFormPicker({ items, placeholder, name, barWidth }) {
  const { setFieldValue, values, touched, errors } = useFormikContext();
  return (
    <>
      <AppPicker
        barWidth={barWidth}
        placeholder={placeholder}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
