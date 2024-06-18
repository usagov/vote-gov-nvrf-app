import React from "react";
import { Select } from '@trussworks/react-uswds';
import { restrictType, checkForErrors, jumpTo, toggleError } from '../HelperFunctions/ValidateField';

function SelectField({ fieldData }){
    return (
        <Select 
        data-test="select"
        id="suffix" className="radius-md" name="suffix"
        value={props.fieldData.id}
        onChange={props.saveFieldData(fieldData.id)}
        autoComplete="off"
        onInvalid={(e) => e.target.setCustomValidity(' ')}
        onInput={(e) => e.target.setCustomValidity('')}
        >
        <React.Fragment key=".0">                        
            <option value={''}>{fieldData.stringContent}</option>
            {fieldData.options.map((item, index) => (
                <option key={index} value={item.value}>{item.key}</option>
            ))}
        </React.Fragment>
        </Select>
    )
}

export default SelectField;