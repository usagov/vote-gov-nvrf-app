import React from "react";
import { Fieldset } from '@trussworks/react-uswds';
import DateFields from 'Components/FieldComponents/DateFields';

function FieldsetContainer({ fieldType, inputData, saveFieldData, dateFormat, fieldData }) {
    function renderField(fieldType) {
        switch (fieldType) {
            case 'date':
                return <DateFields
                    inputData={inputData}//includues month, day, year field data
                    saveFieldData={saveFieldData}
                    dateFormat={dateFormat}
                    fieldData={fieldData} />;
        }
    };

    return (
        <>
            <div className="input-parent">
                <Fieldset className="fieldset" legend={inputData.required ? [<span key={0} className="text-bold">{inputData.label}</span>, <span key={1} className='required-text'>*</span>] : (inputData.stringContent)} style={{ marginTop: '30px' }}>
                    <span className="usa-hint" id={`${inputData.id} + '-hint'`}>
                        {inputData.help_text}
                    </span>
                    {renderField(fieldType)}
                    <span id={`${inputData.field_month.nvrf_id}` + '_error'} role="alert" className={'vote-error-text'} data-test="errorText">
                        {inputData.field_month.error_msg}
                    </span>
                    <span id={`${inputData.field_day.nvrf_id}` + '_error'} role="alert" className={'vote-error-text'} data-test="errorText">
                        {inputData.field_day.error_msg}
                    </span>
                    <span id={`${inputData.field_year.nvrf_id}` + '_error'} role="alert" className={'vote-error-text'} data-test="errorText">
                        {inputData.field_year.error_msg}
                    </span>
                </Fieldset>
            </div>
        </>
    )
}

export default FieldsetContainer;