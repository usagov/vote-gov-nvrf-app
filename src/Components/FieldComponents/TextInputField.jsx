import React, { useState } from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    
    const hintId = inputData.id + '-hint';
    const errorId = inputData.id + '_error';
    const [a11yAnnounce, setA11yAnnounce] = useState(inputData.help_text ? hintId : errorId);

    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={a11yAnnounce}
        name={inputData.id}
        type="text"
        autoComplete="off"
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        inputMode="numeric"
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onKeyDown={(e) => restrictType(e, inputData.inputType)}
        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
        onInvalid={(e) => {e.target.setCustomValidity(' '), setA11yAnnounce(errorId)}}
        onInput={(e) => {e.target.setCustomValidity(''), setA11yAnnounce(hintId)}}
        />
    )
}

export default TextInputField;