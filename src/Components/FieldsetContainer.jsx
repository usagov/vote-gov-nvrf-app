import React, { useState} from "react";
import { Fieldset } from '@trussworks/react-uswds';
import DateFields from 'Components/FieldComponents/DateFields';

function FieldsetContainer({ fieldType, inputData, saveFieldData, dateFormat, fieldData }) {
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
            <Fieldset className={fieldError.length > 0 ? "vote-error-container" : "input-parent"} legend={inputData.required ? [<span key={0} className="text-bold">{inputData.label}</span>, <span key={1} className='required-text'>*</span>] : (inputData.stringContent)} style={{ marginTop: '30px' }}>
                    <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
                        {inputData.help_text}
                    </span>
                {renderField(fieldType)}

                {fieldError.map((error, index) => (
                    <span id={`${error.id}` + '_error'} role="alert" key={index} className={'vote-error-text'}
                          data-test="errorText">
                            {error.message}
                        </span>
                ))}
            </Fieldset>
        </>
    )
}

export default FieldsetContainer;