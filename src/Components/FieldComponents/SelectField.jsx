import React from "react";
import { Select } from "@trussworks/react-uswds";
import { toggleError, checkForErrors } from "Utils/ValidateField";

function SelectField({ inputData, saveFieldData, fieldData, stringContent }) {
  return (
    <Select
      data-test={inputData.dataTest}
      id={inputData.id}
      className="radius-md"
      aria-describedby={`${inputData.id}` + "_error"}
      name={inputData.id}
      disabled={inputData.disabled}
      required={parseInt(inputData.required)}
      value={inputData.value}
      onChange={saveFieldData(inputData.id)}
      autoComplete="off"
      onBlur={(e) => {
        toggleError(e, checkForErrors(e, "check value exists"));
      }}
      onInvalid={(e) => e.target.setCustomValidity(" ")}
      onInput={(e) => e.target.setCustomValidity("")}
    >
      <React.Fragment key=".0">
        {inputData.options.map((item, index) => (
          <option
            key={index}
            value={item.value !== "default" ? item.value : ""}
          >
            {item.key}
          </option>
        ))}
      </React.Fragment>
    </Select>
  );
}

export default SelectField;
