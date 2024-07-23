import { Label, TextInput, Checkbox, Select } from '@trussworks/react-uswds';
import React, {useState, useEffect} from "react";
import { restrictType, checkForErrors, toggleError } from 'Utils/ValidateField';
import { sanitizeDOM } from 'Utils/JsonHelper';

function Identification(props){
    const headings = props.headings;
    const stateData = props.stateData;
    const fields = props.fieldContent;
    const stringContent = props.stringContent;
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

    // Used for no-id selection message
    // const [delayedId, setDelayedId] = useState(props.idType);
    // useEffect(() => {
    //     setTimeout(() => setDelayedId(props.idType), 10);
    // }, [props.idType]);

    return (
        <>
        <h2>{headings.step_label_3}</h2>

            {idStateInstructions && (
                <div id="id_alert" className="usa-alert usa-alert--info" role="region" aria-live="polite">
                    <div className="usa-alert__body">
                        <div className="usa-alert__text" dangerouslySetInnerHTML={{__html: idStateInstructions}}/>
                    </div>
                </div>)}

            {(stateData.abbrev === "mo") ? (
                <>
                    <Checkbox id="id-none" name="id-none" checked={props.hasNoID} onChange={props.onChangeHasNoIdCheckbox} label={noIdField.label} />
                </>
            ) : (
                <>
                    <h3 className={'margin-top-5'}>{idTypeField.label}<span className='required-text'>*</span></h3>
                    <div dangerouslySetInnerHTML={{__html: idTypeFieldInstructions}}/>
                    <div className="input-parent">
                        <Select
                            id="id-selection"
                            name="id-selection"
                            aria-label={stringContent.idSelectionAriaLabel}
                            aria-describedby="id-selection_error"
                            data-test="dropDown"
                            value={props.idType}
                            required={true}
                            aria-invalid={false}
                            onChange={(e) => props.saveIdType(e)}
                            onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => {e.target.setCustomValidity(''); toggleError(e, false)}}
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
                        <span id="id-selection_error" role="alert" className='error-text' data-test="errorText">
                            {props.idType === '' && stateIDField.error_msg}
                        </span>
                    </div>
                </>
            )}

        <div id="state-id" className="input-parent">
            {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                    <>
                        {((props.idType === 'driver-id-num') || (stateData.abbrev === "mo")) &&
                        <>
                            <Label className="text-bold" htmlFor="id-driver">
                                {driverLicenseField.label}{(driverIDFieldReq) && <span className='required-text'>*</span>}
                            </Label>
                            <TextInput
                                data-test="driverId"
                                id="id-driver"
                                className="radius-md"
                                name="id-driver"
                                aria-describedby="id-driver_error"
                                type="text"
                                autoComplete="off"
                                required={parseInt(driverIDFieldReq.required)}
                                value={props.fieldData.id_number}
                                onChange={props.saveFieldData('id_number')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                            <span id="id-driver_error" role="alert" className='error-text' data-test="errorText">
                                {driverLicenseField.error_msg}
                            </span>
                        </>
                        }
                        {(props.idType === 'state-id-num') &&
                        <>
                            <Label className="text-bold"
                                   htmlFor="id-state">{stateIDField.label}{(stateIDFieldDReq) &&
                                <span className='required-text'>*</span>}
                            </Label>
                            <TextInput
                                data-test="stateId"
                                id="id-state"
                                className="radius-md"
                                name="id-state"
                                aria-describedby="id-state_error"
                                type="text"
                                autoComplete="off"
                                required={parseInt(stateIDFieldDReq.required)}
                                value={props.fieldData.id_number}
                                onChange={props.saveFieldData('id_number')}
                                onBlur={(e) => toggleError(e, checkForErrors(e, 'check value exists'))}
                                onInvalid={(e) => e.target.setCustomValidity(' ')}
                                onInput={(e) => e.target.setCustomValidity('')}
                            />
                            <span id="id-state_error" role="alert" className='error-text' data-test="errorText">
                                {stateIDField.error_msg}
                            </span>
                        </>
                        }
                    </>}

            {((props.idType === 'ssn') || ((stateData.abbrev === "mo") && (props.idType != "none"))) &&
                <>
                    <Label className="text-bold" htmlFor="ssn">
                        {ssnField.label}{(ssnFieldReq) && <span className='required-text'>*</span>}
                    </Label>
                    <span className="usa-hint" id="ssn-hint">{ssnField.help_text}</span>
                    <TextInput
                        data-test="ssn"
                        id="ssn"
                        className="radius-md"
                        name="ssn"
                        aria-describedby="ssn_error"
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
                    <span id="ssn_error" role="alert" className='error-text' data-test="errorText">
                        {ssnField.error_msg}
                    </span>
                </>}

            {props.idType === 'ssn-full' &&
                <>
                    <Label className="text-bold" htmlFor="ssn-full">
                        {ssnFullField.label}{(ssnFullFieldReq) && <span className='required-text'>*</span>}
                    </Label>
                    <span className="usa-hint" id="ssn-hint">{ssnFullField.help_text}</span>
                    <TextInput
                        id="ssn-full"
                        className="radius-md"
                        name="ssn-full"
                        aria-describedby="ssn-full_error"
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
                    <span id="ssn-full_error" role="alert" className='error-text' data-test="errorText">
                        {ssnFullField.error_msg}
                    </span>
                </>}
            <div aria-live='polite'>
                {props.idType === 'none' && <div dangerouslySetInnerHTML={{__html: noIdFieldInstructions}}/>}
            </div>
        </div>
        </>
    );
}

export default Identification;