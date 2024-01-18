import { TextInput, Dropdown, Checkbox } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { restrictType, checkForErrors } from '../HelperFunctions/ValidateField';
import DOMPurify from 'dompurify';
import FieldContainer from '../FieldContainer';

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
    const driverIDFieldReq = (nvrfStateFields.find(item => item.uuid === driverLicenseField.uuid));
    const stateIDFieldDReq = (nvrfStateFields.find(item => item.uuid === stateIDField.uuid));
    const ssnFullFieldReq = (nvrfStateFields.find(item => item.uuid === ssnFullField.uuid));
    const ssnFieldReq = (nvrfStateFields.find(item => item.uuid === ssnField.uuid));
    const noIdFieldReq = (nvrfStateFields.find(item => item.uuid === noIdField.uuid));

    //Error handling
    const [handleErrors, setHandleErrors] = useState({
        id_selection: false,
        id_number: false,
        issue_date: false,
        expire_date: false,
        id_ssn: false,
        id_none: false
    })

    const idTypesField = 
        <Dropdown
            id="id-num-dropdown"
            name="input-dropdown"
            value={props.idType}
            required={true}
            onChange={(e) => props.saveIdType(e)}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_selection: checkForErrors(e, 'check value exists')
            })}>
            <option key="default" value="">{"Select Identification"}</option>
            {(driverIDFieldReq) && <option key="driver-id-num" value="driver-id-num">{driverLicenseField.label}</option>}
            {(stateIDFieldDReq) && <option key="state-id-num" value="state-id-num">{stateIDField.label}</option>}
            {(ssnFullFieldReq) && <option key="ssn-full" value="ssn-full">{ssnFullField.label}</option>}
            {(ssnFieldReq) && <option key="ssn" value="ssn">{ssnField.label}</option>}
            {(noIdFieldReq) && <option key="id-none" value="none">{noIdField.label}</option>}
        </Dropdown>

    const driverIdField = 
        <TextInput
            id="driver-id-num"
            className="radius-md"
            name="driver-id-num"
            aria-describedby="driver-id-num-error"
            type="text"
            autoComplete="off"
            required={parseInt(driverIDFieldReq.required)}
            value={props.fieldData.id_number}
            onChange={props.saveFieldData('id_number')}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_number: checkForErrors(e, 'check value exists')
            })}
        />
    
    const stateIdField =
        <TextInput
            id="state-id-num"
            className="radius-md"
            name="driver-id-num"
            aria-describedby="state-id-num-error"
            type="text"
            autoComplete="off"
            required={parseInt(stateIDFieldDReq.required)}
            value={props.fieldData.id_number}
            onChange={props.saveFieldData('id_number')}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_number: checkForErrors(e, 'check value exists')
            })}
        /> 
        
    const ssnInputField =
        <TextInput
            id="ssn-input"
            className="radius-md"
            name="ssn-input"
            aria-describedby="ssn-input-error"
            autoComplete="off"
            required={parseInt(ssnFieldReq.required)}
            type="text"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={props.fieldData.ssn_number}
            onChange={props.saveFieldData('ssn_number')}
            onKeyDown={(e) => restrictType(e, 'number')}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_ssn: checkForErrors(e, 'check value length')
            })}
        />

    const ssnFullInputField = ssnFullFieldReq &&
        <TextInput
            id="ssn-full-input"
            className="radius-md"
            name="ssn-full-input"
            autoComplete="off"
            aria-describedby="ssn-full-input-error"
            required={parseInt(ssnFullFieldReq.required)}
            type="text"
            inputMode="numeric"
            minLength={9}
            maxLength={9}
            value={props.fieldData.ssn_number}
            onChange={props.saveFieldData('ssn_number')}
            onKeyDown={(e) => restrictType(e, 'number')}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_ssn: checkForErrors(e, 'check value length')
            })}
        />

    return (
        <>
        <h2>{headings.step_label_3}</h2>

            {idStateInstructions && 
                <div className="usa-alert usa-alert--info" role="alert">
                    <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
                </div>}

            {(stateData.abbrev === "mo") && 
                <Checkbox id="id-none" name="id-none" checked={props.hasNoID} onChange={props.onChangeHasNoIdCheckbox} label={noIdField.label} />
            }

            {(stateData.abbrev != "mo") && 
                <>
                <h3 className={'margin-top-5'}>{idTypeField.label}<span className='required-text'>*</span></h3>
                <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>
                <div className="mobile-width">
                    <FieldContainer 
                        inputField={idTypesField}
                        // label={""}
                        // classes={""}
                        // helpText={""}
                        fieldRequired={true}
                        htmlFor={"id-num"}
                        showError={handleErrors.id_selection}
                        errorId={"id-num-error"}
                        errorMsg={stateIDField.error_msg}
                    />
                </div>
                </>
            }

            {((props.idType === 'driver-id-num') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                <FieldContainer 
                    inputField={driverIdField}
                    label={driverLicenseField.label}
                    // classes={""}
                    // helpText={""}
                    fieldRequired={driverIDFieldReq}
                    htmlFor={"driver-id-num"}
                    showError={handleErrors.id_number}
                    errorId={"driver-id-num-error"}
                    errorMsg={driverLicenseField.error_msg}
                />
            }

            {((props.idType === 'state-id-num') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                <FieldContainer 
                    inputField={stateIdField}
                    label={driverLicenseField.label}
                    // classes={""}
                    // helpText={""}
                    fieldRequired={stateIDFieldDReq.required}
                    htmlFor={"state-id-num"}
                    showError={handleErrors.id_number}
                    errorId={"state-id-num-error"}
                    errorMsg={stateIDField.error_msg}
                />
            }

            {((props.idType === 'ssn') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                <FieldContainer 
                    inputField={ssnInputField}
                    label={ssnField.label}
                    // classes={""}
                    // helpText={""}
                    fieldRequired={ssnFieldReq.required}
                    htmlFor={"ssn-input"}
                    showError={handleErrors.id_ssn}
                    errorId={"ssn-input-error"}
                    errorMsg={ssnField.error_msg}
                />
            }

            {props.idType === 'ssn-full' &&
                <FieldContainer 
                    inputField={ssnFullInputField}
                    label={ssnFullField.label}
                    // classes={""}
                    helpText={ssnFullField.help_text}
                    fieldRequired={ssnFullFieldReq.required}
                    htmlFor={"ssn-full-input"}
                    showError={handleErrors.id_ssn}
                    errorId={"ssn-full-input-error"}
                    errorMsg={ssnFullField.error_msg}
                />
            }

            {props.idType === 'none' && <div dangerouslySetInnerHTML={{__html: noIdFieldInstructions}}/>}

        </>
    );
}

export default Identification;