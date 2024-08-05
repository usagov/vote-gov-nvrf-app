import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    const textType = inputData.type || 'text';
    const errorCheckType = inputData.check || 'check value exists';

    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={`${inputData.id}` + '_error'}
        name={inputData.id}
        type={textType}
        autoComplete="off"
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        inputMode={inputData.inputMode}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onBlur={(e) => toggleError(e, checkForErrors(e, errorCheckType))}
        onKeyDown={(e) => restrictType(e, inputData.inputMode)}
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        />
    )
}

export default TextInputField;