import React from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import TextInputField from './FieldComponents/TextInputField';
import SelectField from './FieldComponents/SelectField';
import DOBFields from './FieldComponents/DOBFields';

function FieldBuilder({ fieldType, inputData, saveFieldData, fieldData }) {
  function renderField(fieldType) {
    switch (fieldType) {
      case 'text':
        return <TextInputField inputData={inputData} saveFieldData={saveFieldData} fieldData={fieldData} />;
      case 'select':
        return <SelectField inputData={inputData} saveFieldData={saveFieldData} fieldData={fieldData} />;
      case 'dates':
        return <DOBFields inputData={inputData} saveFieldData={saveFieldData} fieldData={fieldData} />;
    }
  };

  return (
    <>
      {fieldType != 'dates' ?
        <div className="input-parent">
          <Label className="text-bold" htmlFor={inputData.id}>
            {inputData.label}{(inputData.required === "1") && <span className='required-text'>*</span>}
          </Label>
          <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
            {inputData.help_text}
          </span>
          {renderField(fieldType)}
          <span id={`${inputData.id}` + '_error'} role="alert" className={'error-text'} data-test="errorText">
            {inputData.error_msg}
          </span>
        </div>
        :
        <div className="input-parent">
          <Fieldset className="fieldset" legend={inputData.required ? [<span key={0} className="text-bold">{inputData.label}</span>, <span key={1} className='required-text'>*</span>] : (inputData.stringContent)} style={{ marginTop: '30px' }}>
            <Label className="text-bold" htmlFor={inputData.id}>
              {inputData.label}{(inputData.required === "1") && <span className='required-text'>*</span>}
            </Label>
            <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
              {inputData.help_text}
            </span>
            {renderField(fieldType)}
            <span id={`${inputData.id}` + '_error'} role="alert" className={'error-text'} data-test="errorText">
              {inputData.error_msg}
            </span>
          </Fieldset>
        </div>
      }
    </>
  )
}

export default FieldBuilder;