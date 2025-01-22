import React, {useState} from "react";
import {Fieldset} from '@trussworks/react-uswds';
import DateFields from 'Components/FieldComponents/DateFields';

function FieldsetContainer({
                             fieldType,
                             inputData,
                             saveFieldData,
                             dateFormat,
                             fieldData
                           }) {
  const [fieldError, setFieldError] = useState([]);

  function renderField(fieldType) {
    switch (fieldType) {
      case 'date':
        return <DateFields
          inputData={inputData}
          saveFieldData={saveFieldData}
          dateFormat={dateFormat}
          fieldData={fieldData}
          setFieldError={setFieldError}/>;
    }
  };

  return (
    <>
      <div
        className={fieldError.length > 0 ? "vote-error-container" : "input-parent"}>
        <Fieldset legend={inputData.required ? [<span key={0}
                                                      className="text-bold">{inputData.label}</span>,
          <span key={1}
                className='required-text'>*</span>] : (inputData.stringContent)}
                  style={{marginTop: '30px'}}>
                    <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
                        {inputData.help_text}
                    </span>

          {renderField(fieldType)}

          {fieldError.map((error, index) => (
            <span id={`${error.id}` + '_error'} role="alert"
                  aria-live="assertive" key={index}
                  className={'vote-error-text'}
                  data-test="errorText">
                            {error.message}
                        </span>
          ))}

          {fieldError.length === 0 && (
            <span id={inputData.id + '_error'} role="alert"
                  aria-live="assertive" className={'vote-error-text'}
                  data-test="errorText">
                            {inputData.error_msg}
                        </span>
          )}
        </Fieldset>
      </div>
    </>
  )
}

export default FieldsetContainer;