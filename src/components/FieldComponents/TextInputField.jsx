import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, jumpTo, toggleError } from '../HelperFunctions/ValidateField';

function TextInputField({ fieldData }){
    return (
        <TextInput
        data-test={fieldData.dataTest}
        id={fieldData.id}
        className="radius-md text-semibold"
        aria-describedby={`${fieldData.id}` + '_error'}
        name={fieldData.id}
        type="text"
        autoComplete="off"
        required={parseInt(nameFieldState.required)}
        value={props.fieldData.id}
        onChange={saveFieldData(fieldData.id)}
        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        />;
    )
}

export default TextInputField;