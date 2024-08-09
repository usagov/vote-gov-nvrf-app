import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentSuffix(props){
  const uuid = "eeff4fa1-00f2-474b-a791-1a4146dab11a";
  const field = getField(props.fieldContent, uuid);
  const stateField = getField(props.stateData.nvrf_fields, field.uuid);

  return (
    <FieldContainer
      fieldType={'select'} inputData={{
      id: 'suffix',
      dataTest: 'select',
      required: "0",
      label: field.label,
      options: field.options,
      value: stateField.value,
    }} saveFieldData={props.saveFieldData} fieldData={props.fieldData} stringContent={props.stringContent} />
  )
}

export default CurrentSuffix;