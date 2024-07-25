import React, {useState} from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentPhoneNumber(props){
    const uuid = "2d61b54a-e568-410f-825a-0ca82dfd3f63";
    const field = getField(props.fieldContent, uuid);
    const stateField = getField(props.stateData.nvrf_fields, field.uuid);

    const [describedby, setDescribedby] = useState('phone_number-hint');

    const pointToHint = () => {
        setDescribedby('phone_number-hint');
    }
    const pointToError = () => {
        setDescribedby('phone_number_error');
    }

    return (
        <FieldContainer
            fieldType={'text'} inputData={{
            id: 'phone_number',
            dataTest: 'phoneNumber',
            required: stateField.required,
            label: field.label,
            error_msg: field.error_msg,
            help_text: field.help_text,
            maxLength: 14,
            minLength: 14,
            check: 'check value length',
            describedby: describedby,
            pointToHint: pointToHint,
            pointToError: pointToError,
        }} saveFieldData={props.saveFieldData} fieldData={props.fieldData} />
    )
}

export default CurrentPhoneNumber;