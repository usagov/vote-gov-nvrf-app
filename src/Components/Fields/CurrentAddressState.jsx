import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentAddressState(props){
    const uuid = "fe3a2a1d-34bd-472b-a843-3fa0635c4f40";
    const field = getField(props.fieldContent, uuid);
    const stateField = getField(props.stateData.nvrf_fields, field.uuid);

    return (
        <FieldContainer
            fieldType={'select'} inputData={{
            id: 'state',
            dataTest: 'select',
            required: stateField.required,
            label: field.label,
            disabled: true,
            options: props.statesList,
            stringContent: props.stringContent.selectState,
            value: props.stateData.name,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
    )
}

export default CurrentAddressState;