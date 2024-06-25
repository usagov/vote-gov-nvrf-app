import React from "react";
import { Select } from '@trussworks/react-uswds';

function SelectField({ inputData, saveFieldData, fieldData }){
    return (
        <Select 
        data-test={inputData.dataTest}
        id={inputData.id}
        className="radius-md" 
        aria-describedby={`${inputData.id}` + '_error'}
        name={inputData.id}
        required={parseInt(inputData.required)}
        value={fieldData[inputData.id]}
        onChange={saveFieldData(inputData.id)}
        autoComplete="off"
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        >
        <React.Fragment key=".0">                        
            <option value={''}>{inputData.stringContent}</option>
            {inputData.options.map((item, index) => (
                <option key={index} value={item.value}>{item.key}</option>
            ))}
        </React.Fragment>
        </Select>
    )
}

export default SelectField;