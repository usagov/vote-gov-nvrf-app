import { Label, TextInput, Dropdown, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { restrictType, checkForErrors, jumpTo } from '../HelperFunctions/ValidateField';
import DOMPurify from 'dompurify';

function Identification(props){
    const headings = props.headings;
    const stateData = props.stateData;
    const fields = props.fieldContent;
    const nvrfStateFields = props.stateData.nvrf_fields;

    //Drupal field data
    const idTypeField = fields.find(item => item.uuid === "27d3a15c-f8c0-4035-9b0a-c2c0f674519c");
    const driverLicenseField = fields.find(item => item.uuid === "acd7f272-7a37-43f0-b51a-c78daf31e5fd");
    const stateIDField = fields.find(item => item.uuid === "e2da00fa-0f1b-4e98-9472-c00649266eb4");
    const ssnField = fields.find(item => item.uuid === "1e030197-52e7-426e-923c-b67ef521ae3b");
    const ssnFullField = fields.find(item => item.uuid === "fe8cf91e-f872-4ed7-848c-09c99a7d83c8");
    const noIdField = fields.find(item => item.uuid === "eb0ce8c5-b4f7-4aae-a0b9-84f0434d2edb");
    const idTypeFieldInstructions = DOMPurify.sanitize(idTypeField.instructions);
    const idStateInstructions = DOMPurify.sanitize(stateData.id_inst);
    const noIdFieldInstructions = DOMPurify.sanitize(noIdField.instructions);

    //Field requirements by state data
    const idFieldState = (nvrfStateFields.find(item => item.uuid === driverLicenseField.uuid));

    //Error handling
    const [handleErrors, setHandleErrors] = useState({
        id_selection: false,
        id_number: false,
        issue_date: false,
        expire_date: false,
        id_ssn: false,
        id_none: false
    })

    //conditional ssn field
    let ssnOption;
    if ((stateData.abbrev === "ky") ||
        (stateData.abbrev === "nm") ||
        (stateData.abbrev === "tn") ||
        (stateData.abbrev === "va") ||
        (stateData.abbrev === "ut")) {
        ssnOption = <option key="ssn-full" value="ssn-full">{ssnFullField.label}</option>;
    } else {
        ssnOption = <option key="ssn" value="ssn">{ssnField.label}</option>;
    }

    return (
        <>
        <h2>{headings.step_label_3}</h2>

            {idStateInstructions && (
                <div className="usa-alert usa-alert--info">
                    <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
                </div>)}

            <h3 className={'margin-top-6'}>{idTypeField.label}</h3>
            <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>

            <div className={handleErrors.id_selection ? 'error-container' : ''}>
                <Dropdown
                    id="id-num-dropdown"
                    name="input-dropdown"
                    value={props.idType}
                    required={parseInt(idFieldState.required)}
                    onChange={(e) => props.saveIdType(e)}
                    onBlur={(e) => setHandleErrors({
                        ...handleErrors,
                        id_selection: checkForErrors(e, 'check value exists')
                    })}
                >
                    <option key="default" value="">{"Select Identification"}</option>
                    <option key="driver-id-num" value="driver-id-num">{driverLicenseField.label}</option>
                    <option key="state-id-num" value="state-id-num">{stateIDField.label}</option>
                    {ssnOption}
                    <option key="id-none" value="none">{noIdField.label}</option>
                </Dropdown>
                {handleErrors.id_selection &&
                    <span id="id-num-dropdown-error" role="alert" className='error-text text-bold'>
                    {stateIDField.error_msg}
                </span>
                }
            </div>

            {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num')) &&
                <>
                    <div className={handleErrors.id_number ? 'error-container' : ''}>
                        {(props.idType === 'driver-id-num') &&

                            <Label className="text-bold"
                                   htmlFor="state-id-num-error">{driverLicenseField.label}{(idFieldState.required === "1") &&
                                <span className='required-text'>*</span>}
                                <TextInput
                                    id="driver-id-num"
                                    className="radius-md"
                                    name="driver-id-num"
                                    type="text"
                                    autoComplete="off"
                                    required={parseInt(idFieldState.required)}
                                    value={props.fieldData.id_number}
                                    onChange={props.saveFieldData('id_number')}
                                    onBlur={(e) => setHandleErrors({
                                        ...handleErrors,
                                        id_number: checkForErrors(e, 'check value exists')
                                    })}
                                />
                                {handleErrors.id_number &&
                                    <span id="state-id-num-error" role="alert" className='error-text'>
                            {driverLicenseField.error_msg}
                        </span>
                                }
                            </Label>
                        }
                        {(props.idType === 'state-id-num') &&

                            <Label className="text-bold"
                                   htmlFor="state-id-num-error">{stateIDField.label}{(idFieldState.required === "1") &&
                                <span className='required-text'>*</span>}
                                <TextInput
                                    id="driver-id-num"
                                    className="radius-md"
                                    name="driver-id-num"
                                    type="text"
                                    autoComplete="off"
                                    required={parseInt(idFieldState.required)}
                                    value={props.fieldData.id_number}
                                    onChange={props.saveFieldData('id_number')}
                                    onBlur={(e) => setHandleErrors({
                                        ...handleErrors,
                                        id_number: checkForErrors(e, 'check value exists')
                                    })}
                                />
                                {handleErrors.id_number &&
                                    <span id="state-id-num-error" role="alert" className='error-text'>
                            {stateIDField.error_msg}
                        </span>
                                }
                            </Label>
                        }
                    </div>
                </>
            }


            {props.idType === 'ssn' &&
                <div className={handleErrors.id_ssn ? 'error-container' : ''}>
                    <Label className="text-bold"
                           htmlFor="ssn-input-error">{ssnField.label}{(idFieldState.required === "1") &&
                        <span className='required-text'>*</span>}</Label>
                    <span className="usa-hint" id="ssn-hint">{ssnField.help_text}</span>
                    <TextInput
                        id="ssn-input"
                        className="radius-md"
                        name="ssn-input"
                        autoComplete="off"
                        required={parseInt(idFieldState.required)}
                        type="text"
                        inputMode="numeric"
                        minLength={4}
                        maxLength={4}
                        value={props.fieldData.id_number}
                        onChange={props.saveFieldData('id_number')}
                        onKeyDown={(e) => restrictType(e, 'number')}
                        onBlur={(e) => setHandleErrors({
                            ...handleErrors,
                            id_ssn: checkForErrors(e, 'check value length')
                        })}
                    />
                    {handleErrors.id_ssn &&
                        <span id="ssn-input-error" role="alert" className='error-text text-bold'>
                    {ssnField.error_msg}
                </span>
                    }
                </div>}

            {props.idType === 'ssn-full' &&
                <div className={handleErrors.id_ssn ? 'error-container' : ''}>
                    <Label className="text-bold"
                           htmlFor="ssn-input-error">{ssnFullField.label}{(idFieldState.required === "1") &&
                        <span className='required-text'>*</span>}</Label>
                    <span className="usa-hint" id="ssn-hint">{ssnFullField.help_text}</span>
                    <TextInput
                        id="ssn-full-input"
                        className="radius-md"
                        name="ssn-full-input"
                        autoComplete="off"
                        required={parseInt(idFieldState.required)}
                        type="text"
                        inputMode="numeric"
                        minLength={9}
                        maxLength={9}
                        value={props.fieldData.id_number}
                        onChange={props.saveFieldData('id_number')}
                        onKeyDown={(e) => restrictType(e, 'number')}
                        onBlur={(e) => setHandleErrors({
                            ...handleErrors,
                            id_ssn: checkForErrors(e, 'check value length')
                        })}
                    />
                    {handleErrors.id_ssn &&
                        <span id="ssn-input-error" role="alert" className='error-text text-bold'>
                    {ssnFullField.error_msg}
                </span>
                    }
                </div>}

            {props.idType === 'none' && <div dangerouslySetInnerHTML={{__html: noIdFieldInstructions}}/>}

        </>
    );
}

export default Identification;