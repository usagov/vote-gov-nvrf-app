import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousApartmentNumber(props){
    const uuid = "c8e2ff17-fb1f-4971-a664-ffbb557b305a";
    const field = getField(props.fieldContent, uuid);

    return (
        <FieldContainer
            fieldType={'text'} inputData={{
            id: field.nvrf_id,
            dataTest: 'prevAptNumber',
            label: field.label,
            error_msg: field.error_msg,
            help_text: field.help_text,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}/>
    )
}

export default PreviousApartmentNumber;