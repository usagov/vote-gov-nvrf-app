import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentMiddleName(props){
    const uuid = "38020ec6-1b53-4227-99e5-feea5f60af07";
    const field = getField(props.fieldContent, uuid);
    const stateField = getField(props.stateData.nvrf_fields, field.uuid);

    return (
        <FieldContainer
            fieldType={'text'} inputData={{
            id: 'middle_name',
            dataTest: 'middleName',
            required: "0",
            label: field.label,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
    )
}

export default CurrentMiddleName;