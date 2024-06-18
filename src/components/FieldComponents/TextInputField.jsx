import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { checkForErrors, toggleError } from '../HelperFunctions/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md text-semibold"
        aria-describedby={`${inputData.id}` + '_error'}
        name={inputData.id}
        type="text"
        autoComplete="off"
        required={parseInt(inputData.required)}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        />
    )
}

export default TextInputField;