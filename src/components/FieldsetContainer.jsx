import React from "react";
import { Label } from '@trussworks/react-uswds';
import DOBFields from './FieldComponents/DOBFields';

function FieldsetContainer({ fieldType, inputData, saveFieldData, fieldData }) {
    function renderField(fieldType) {
        switch (fieldType) {
            case 'dates':
                return <DOBFields inputData={inputData} saveFieldData={saveFieldData} fieldData={fieldData} />;
        }
    };

    return (
        <>
            <div className="input-parent">
                <Fieldset className="fieldset" legend={inputData.required ? [<span key={0} className="text-bold">{inputData.label}</span>, <span key={1} className='required-text'>*</span>] : (inputData.stringContent)} style={{ marginTop: '30px' }}>
                    <Label className="text-bold" htmlFor={inputData.id}>
                        {inputData.label}{(inputData.required === "1") && <span>*</span>}
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
        </>
    )
}

export default FieldsetContainer;