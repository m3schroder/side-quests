import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, color, style,}) {
  const { handleSubmit } = useFormikContext();

  async function newFunction() {
    //additionalFunc();
    handleSubmit();
  }
  return (
    <AppButton style={style} text={title} onPress={newFunction} />
  );
}

export default SubmitButton;
