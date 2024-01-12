import { Label, TextInput, Dropdown } from '@trussworks/react-uswds';
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

    const identificationTypeField =
        <div>
            <Dropdown
            id="id-num-dropdown"
            name="id-num-dropdown"
            aria-describedby="id-num-dropdown-error"
            value={props.idType}
            required={true}
            onChange={(e) => props.saveIdType(e)}
            onBlur={(e) => setHandleErrors({
                ...handleErrors,
                id_selection: checkForErrors(e, 'check value exists')
            })}>
                <option key="default" value="">{"Select Identification"}</option>
                <option key="driver-id-num" value="driver-id-num">{driverLicenseField.label}</option>
                <option key="state-id-num" value="state-id-num">{stateIDField.label}</option>
                {ssnOption}
                <option key="id-none" value="none">{noIdField.label}</option>
            </Dropdown>
        </div>;
    
    const driverIdField = 
      <div>
        <TextInput
            id="driver-id-num"
            className="radius-md"
            name="driver-id-num"
            aria-describedby="driver-id-num-error"
            type="text"
            autoComplete="off"
            required={parseInt(idFieldState.required)}
            value={props.fieldData.id_number}
            onChange={props.saveFieldData("id_number")}
            onBlur={(e) =>
                setHandleErrors({
                ...handleErrors,
                id_number: checkForErrors(e, "check value exists"),
                })
            }/>
      </div>;

    const stateIdField =
        <div>
            <TextInput
                id="state-id-num"
                className="radius-md"
                name="state-id-num"
                aria-describedby="state-id-num-error"
                type="text"
                autoComplete="off"
                required={parseInt(idFieldState.required)}
                value={props.fieldData.id_number}
                onChange={props.saveFieldData('id_number')}
                onBlur={(e) => setHandleErrors({
                    ...handleErrors,
                    id_number: checkForErrors(e, 'check value exists')
                })}/>
        </div>
    
    const ssnInputField =
        <div>
            <TextInput
                id="ssn-input"
                className="radius-md"
                name="ssn-input"
                aria-describedby="ssn-input-error"
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
                })}/>
        </div>
    
    const ssnFullInputField =
        <div>
            <TextInput
                id="ssn-full-input"
                className="radius-md"
                name="ssn-full-input"
                aria-describedby="ssn-full-input-error"
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
        </div>

    return (
        <>
        <h2>{headings.step_label_3}</h2>

            {idStateInstructions && (
                <div className="usa-alert usa-alert--info" role="alert">
                    <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
                </div>)}

            <h3 className={'margin-top-6'}>{idTypeField.label}<span className='required-text'>*</span></h3>
            <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>

            <FieldContainer
                inputField={identificationTypeField}
                // label={""}
                fieldRequired={true}
                // helpText={""}
                htmlFor={"id-num-dropdown-error"}
                showError={handleErrors.id_selection}
                errorId={"id-num-dropdown-error"}
                errorMsg={stateIDField.error_msg}
            />

                {(props.idType === 'driver-id-num') &&
                        <FieldContainer
                            inputField={driverIdField}
                            label={driverLicenseField.label}
                            fieldRequired={idFieldState.required}
                            // helpText={""}
                            htmlFor={"driver-id-num"}
                            showError={handleErrors.id_number}
                            errorId={"driver-id-num-error"}
                            errorMsg={driverLicenseField.error_msg}
                        />
                }
                {(props.idType === 'state-id-num') &&
                        <FieldContainer
                            inputField={stateIdField}
                            label={stateIDField.label}
                            fieldRequired={idFieldState.required}
                            // helpText={""}
                            htmlFor={"state-id-num"}
                            showError={handleErrors.id_number}
                            errorId={"state-id-num-error"}
                            errorMsg={stateIDField.error_msg}
                        />
                }


                {props.idType === 'ssn' &&
                        <FieldContainer
                            inputField={ssnInputField}
                            label={ssnField.label}
                            fieldRequired={idFieldState.required}
                            helpText={ssnField.help_text}
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
                            fieldRequired={idFieldState.required}
                            helpText={ssnFullField.help_text}
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