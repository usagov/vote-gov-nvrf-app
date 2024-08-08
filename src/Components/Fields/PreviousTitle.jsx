import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousTitle(props){
    const uuid = "34d2669a-d30b-4001-b897-280fe71b3cb0";
    const field = getField(props.fieldContent, uuid);

    return (
        <FieldContainer
            fieldType={'select'} inputData={{
            id: 'prev_title',
            dataTest: 'select',
            required: false,
            label: field.label,
            options: field.options,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData} stringContent={props.stringContent}/>
    )
}

export default PreviousTitle;

