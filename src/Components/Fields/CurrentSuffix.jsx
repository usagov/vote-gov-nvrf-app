import React from "react";
import FieldContainer from 'Components/FieldContainer';
import {getField} from "Utils/fieldParser";

function CurrentSuffix(props) {
  const uuid = "eeff4fa1-00f2-474b-a791-1a4146dab11a";
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

export default CurrentSuffix;