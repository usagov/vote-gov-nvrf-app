import React from "react";
import { Label, TextInput } from '@trussworks/react-uswds';
import TextInputField from './FieldComponents/TextInputField';
import SelectField from './FieldComponents/SelectField';
import DateFields from './FieldComponents/DateFields';

function FieldBuilder({ fieldType, fieldData }) {
  function renderField(fieldType) {
    switch (fieldType) {
      case 'text':
        return
        <TextInputField fieldData={fieldData} />;
      case 'select':
        return
        <SelectField fieldData={fieldData} />;
      case 'dates':
        return
        <DateFields fieldData={fieldData} />;
    }
  };

  return (
    <>
      {fieldType != 'dates' ?
        <div className="input-parent">
          <Label className="text-bold" htmlFor={fieldData.id}>
            {fieldData.label}{(fieldData.required === "1") && <span className='required-text'>*</span>}
          </Label>
          <span className="usa-hint" id={`${fieldData.id} + '-hint'`}>
            {dobField.help_text}
          </span>
          {renderField(fieldType)}
          <span id={`${fieldData.id}` + '_error'} role="alert" className={'error-text'} data-test="errorText">
            {fieldData.error_msg}
          </span>
        </div>
        :
        <div className="input-parent">
          <Fieldset className="fieldset" legend={fieldData.required ? [<span key={0} className="text-bold">{fieldData.label}</span>, <span key={1} className='required-text'>*</span>] : (fieldData.stringContent)} style={{ marginTop: '30px' }}>
            <Label className="text-bold" htmlFor={fieldData.id}>
              {fieldData.label}{(fieldData.required === "1") && <span className='required-text'>*</span>}
            </Label>
            <span className="usa-hint" id={`${fieldData.id} + '-hint'`}>
              {dobField.help_text}
            </span>
            {renderField(fieldType)}
            <span id={`${fieldData.id}` + '_error'} role="alert" className={'error-text'} data-test="errorText">
              {fieldData.error_msg}
            </span>
          </Fieldset>
        </div>
      }
    </>
  )
}

export default FieldBuilder;