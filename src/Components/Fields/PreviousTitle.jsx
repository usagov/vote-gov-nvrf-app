import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousTitle(props){
    const uuid = "86a544cd-cfe9-456a-b634-176a37a38d6d";
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

