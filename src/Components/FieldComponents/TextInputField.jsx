import React, { useState } from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    
    const hintId = inputData.id + '-hint';
    const errorId = inputData.id + '_error';
    const [scAnnounce, setScAnnounce] = useState(inputData.help_text ? hintId : errorId);

    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={scAnnounce}
        name={inputData.id}
        type="text"
        autoComplete="off"
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        onBlur={(e) => toggleError(e, checkForErrors(e, inputData.check || 'check value exists'))}
        onKeyDown={(e) => restrictType(e, inputData.inputType)}
        onInvalid={(e) => {e.target.setCustomValidity(' '), setScAnnounce(errorId)}}
        onInput={(e) => {e.target.setCustomValidity(''), setScAnnounce(hintId)}}
        />
    )
}

export default TextInputField;