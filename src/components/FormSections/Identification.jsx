import { Label, TextInput, Checkbox, Select } from '@trussworks/react-uswds';
import React from "react";
import { restrictType, checkForErrors, toggleError } from '../HelperFunctions/ValidateField';
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

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
    const idTypeFieldInstructions = sanitizeDOM(idTypeField.instructions);
    const idStateInstructions = sanitizeDOM(stateData.id_inst);
    const noIdFieldInstructions = sanitizeDOM(noIdField.instructions);

    //Field requirements by state data
    const driverIDFieldReq = (nvrfStateFields.find(item => item.uuid === driverLicenseField.uuid));
    const stateIDFieldDReq = (nvrfStateFields.find(item => item.uuid === stateIDField.uuid));
    const ssnFullFieldReq = (nvrfStateFields.find(item => item.uuid === ssnFullField.uuid));
    const ssnFieldReq = (nvrfStateFields.find(item => item.uuid === ssnField.uuid));
    const noIdFieldReq = (nvrfStateFields.find(item => item.uuid === noIdField.uuid));

    return (
        <>
        <h2>{headings.step_label_3}</h2>

            {idStateInstructions && (
                <div className="usa-alert usa-alert--info" role="alert">
                    <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
                </div>)}

            {(stateData.abbrev === "mo") && (
                <>
                <Checkbox id="id-none" name="id-none" checked={props.hasNoID} onChange={props.onChangeHasNoIdCheckbox} label={noIdField.label} />
                </>
            )}

            {(stateData.abbrev != "mo") && (
                <>
                    <h3 className={'margin-top-5'}>{idTypeField.label}<span className='required-text'>*</span></h3>
                    <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>
                    <div className="input-parent">
                        <Select
                            id="id-num-dropdown"
                            name="input-dropdown"
                            value={props.idType}
                            required={true}
                            onChange={(e) => props.saveIdType(e)}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        >
                        <React.Fragment key=".0">
                            <option key="default" value="">{"Select Identification"}</option>
                            {(driverIDFieldReq) && <option key="driver-id-num" value="driver-id-num">{driverLicenseField.label}</option>}
                            {(stateIDFieldDReq) && <option key="state-id-num" value="state-id-num">{stateIDField.label}</option>}
                            {(ssnFullFieldReq) && <option key="ssn-full" value="ssn-full">{ssnFullField.label}</option>}
                            {(ssnFieldReq) && <option key="ssn" value="ssn">{ssnField.label}</option>}
                            {(noIdFieldReq) && <option key="id-none" value="none">{noIdField.label}</option>}
                        </React.Fragment>
                        </Select>
                        <span id="id-num-dropdown-error" role="alert" className='error-text'>
                            {stateIDField.error_msg}
                        </span>
                    </div>
                </>)}

            {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                    <div id="state-id" className="input-parent">
                        {((props.idType === 'driver-id-num') || (stateData.abbrev === "mo")) &&
                        <>
                            <Label className="text-bold" htmlFor="state-id-num-error">
                                {driverLicenseField.label}{(driverIDFieldReq) && <span className='required-text'>*</span>}
                            </Label>
                            <TextInput
                                id="driver-id-num"
                                className="radius-md"
                                name="driver-id-num"
                                type="text"
                                autoComplete="off"
                                required={parseInt(driverIDFieldReq.required)}
                                value={props.fieldData.id_number}
                                onChange={props.saveFieldData('id_number')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                            <span id="state-id-num-error" role="alert" className='error-text'>
                                {driverLicenseField.error_msg}
                            </span>  
                        </>
                        }
                        {(props.idType === 'state-id-num') &&
                        <>
                            <Label className="text-bold"
                                   htmlFor="state-id-num-error">{stateIDField.label}{(stateIDFieldDReq) &&
                                <span className='required-text'>*</span>}
                            </Label>
                            <TextInput
                                id="driver-id-num"
                                className="radius-md"
                                name="driver-id-num"
                                type="text"
                                autoComplete="off"
                                required={parseInt(stateIDFieldDReq.required)}
                                value={props.fieldData.id_number}
                                onChange={props.saveFieldData('id_number')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                            <span id="state-id-num-error" role="alert" className='error-text'>
                                {stateIDField.error_msg}
                            </span>
                        </>
                        }
                    </div>}

            {((props.idType === 'ssn') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                <div className="input-parent">
                    <Label className="text-bold" htmlFor="ssn-input-error">
                        {ssnField.label}{(ssnFieldReq) && <span className='required-text'>*</span>}
                    </Label>
                    <span className="usa-hint" id="ssn-hint">{ssnField.help_text}</span>
                    <TextInput
                        id="ssn-input"
                        className="radius-md"
                        name="ssn-input"
                        autoComplete="off"
                        required={parseInt(ssnFieldReq.required)}
                        type="text"
                        inputMode="numeric"
                        minLength={4}
                        maxLength={4}
                        value={props.fieldData.ssn_number}
                        onChange={props.saveFieldData('ssn_number')}
                        onKeyDown={(e) => restrictType(e, 'number')}
                        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                    <span id="ssn-input-error" role="alert" className='error-text'>
                        {ssnField.error_msg}
                    </span>
                </div>}

            {props.idType === 'ssn-full' &&
                <div className="input-parent">
                    <Label className="text-bold" htmlFor="ssn-input-error">
                        {ssnFullField.label}{(ssnFullFieldReq) && <span className='required-text'>*</span>}
                    </Label>
                    <span className="usa-hint" id="ssn-hint">{ssnFullField.help_text}</span>
                    <TextInput
                        id="ssn-full-input"
                        className="radius-md"
                        name="ssn-full-input"
                        autoComplete="off"
                        required={parseInt(ssnFullFieldReq.required)}
                        type="text"
                        inputMode="numeric"
                        minLength={9}
                        maxLength={9}
                        value={props.fieldData.ssn_number}
                        onChange={props.saveFieldData('ssn_number')}
                        onKeyDown={(e) => restrictType(e, 'number')}
                        onBlur={(e) => toggleError(e, checkForErrors(e, 'check value length'))}
                        onInvalid={(e) => e.target.setCustomValidity(' ')}
                        onInput={(e) => e.target.setCustomValidity('')}
                    />
                    <span id="ssn-input-error" role="alert" className='error-text'>
                        {ssnFullField.error_msg}
                    </span>
                </div>}

            {props.idType === 'none' && <div dangerouslySetInnerHTML={{__html: noIdFieldInstructions}}/>}

        </>
    );
}

export default Identification;