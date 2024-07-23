import React from "react";
import FieldsetContainer from 'Components/FieldsetContainer';
import {getField} from "Utils/fieldParser";

function CurrentDateOfBirth(props){
    const uuid = "d31b2a64-36a9-4bc6-a9d1-e68d2be8c211";
    const field = getField(props.fieldContent, uuid);
    const stateField = getField(props.stateData.nvrf_fields, field.uuid);

    return (
        <FieldsetContainer
            fieldType={'date'} inputData={{
            id: 'date_of_birth',
            required: stateField.required,
            label: field.label,
            stringContent: props.stringContent,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData} checkDateValues={props.checkDateValues} dateFormat={props.dateFormat} />
    )
}

export default CurrentDateOfBirth;