import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousAddressState(props){
    const uuid = "5a8a4b6d-c0f1-42f2-b991-8ea49a32e997";
    const field = getField(props.fieldContent, uuid);
    const stateField = getField(props.stateData.nvrf_fields, field.uuid);

    return (
        <FieldContainer
            fieldType={'select'} inputData={{
            id: 'prev_state',
            dataTest: 'state',
            required: stateField.required,
            label: field.label,
            options: props.statesList,
            stringContent: props.stringContent.selectState,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
    )
}

export default PreviousAddressState;