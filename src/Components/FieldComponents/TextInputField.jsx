import React from "react";
import { TextInput } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';

function TextInputField({ inputData, saveFieldData, fieldData }){
    return (
        <TextInput
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md"
        aria-describedby={`${inputData.id}` + '_error'}
        name={inputData.id}
        type="text"
        autoComplete="off"
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        required={parseInt(inputData.required)}
        minLength={inputData.minLength}
        maxLength={inputData.maxLength}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
<<<<<<< HEAD
        onKeyDown={(e) => restrictType(e, inputData.inputType)}
        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
=======
        onBlur={(e) => toggleError(e, checkForErrors(e, inputData.check || 'check value exists'))}
        onKeyDown={(e) => restrictType(e, inputData.inputType)}
>>>>>>> 1fc1bd1cfb4c8aa868ec3a7a5855e9db3f55c5cb
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        />
    )
}

export default TextInputField;