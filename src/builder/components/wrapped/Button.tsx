import * as React from "react";
import { Button as PfButton, TextInput } from "@patternfly/react-core";
// import { ComponentAdder } from "../componentAdder";

export const Button = ({ ...props }) => {
  const [value, setValue] = React.useState("");
  const handleTextInputChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <PfButton onClick={() => alert('Clicked button')} {...props}>
      {/* <TextInput value={value} type="text" onChange={handleTextInputChange} /> */}
      Button
    </PfButton>
  );
};
