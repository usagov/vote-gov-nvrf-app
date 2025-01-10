import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function PreviousSuffix(props) {
  const uuid = "09cb2989-d302-4a01-bb3a-33173adcffb2";
  const field = getField(props.fieldContent, uuid);
  return (
    <FieldContainer
      fieldType={'select'} inputData={{
      id: field.nvrf_id,
      dataTest: 'select',
      required: "0",
      label: field.label,
      options: field.options,
      value: props.fieldData[field.nvrf_id],
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData}
      stringContent={props.stringContent}/>
  )
}

export default PreviousSuffix;
