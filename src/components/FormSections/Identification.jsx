import { Label, TextInput, Dropdown, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { restrictType, checkExpiration, checkForErrors, jumpTo } from '../HelperFunctions/ValidateField';
import DOMPurify from 'dompurify';

function Identification(props){
    const content = props.content;
    const fields = props.fieldContent;
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const idNumReq = stateFieldRequirements.ID_num;
    const idNumVisible = stateFieldVisible.ID_num;

    //Drupal field data
    const idTypeField = fields.find(item => item.uuid === "27d3a15c-f8c0-4035-9b0a-c2c0f674519c");
    const driverLicenseField = fields.find(item => item.uuid === "acd7f272-7a37-43f0-b51a-c78daf31e5fd");
    const stateIDField = fields.find(item => item.uuid === "e2da00fa-0f1b-4e98-9472-c00649266eb4");
    const ssnField = fields.find(item => item.uuid === "1e030197-52e7-426e-923c-b67ef521ae3b");
    const noIdField = fields.find(item => item.uuid === "eb0ce8c5-b4f7-4aae-a0b9-84f0434d2edb");
    const idTypeFieldInstructions = DOMPurify.sanitize(idTypeField.instructions);
    const noIdFieldInstructions = DOMPurify.sanitize(noIdField.instructions);

    //Error handling
    const [handleErrors, setHandleErrors] = useState({
        id_selection: false,
        id_number: false,
        issue_date: false,
        expire_date: false,
        id_ssn: false,
        id_none: false
    })

    const checkDateValues=(type)=> {
        let dateType = type === 'issue' ? 'issue_date' : 'expire_date';
        let dateValues = type === 'issue' ?
        [
            props.fieldData.id_issue_date_month.length === 2,
            props.fieldData.id_issue_date_day.length === 2,
            props.fieldData.id_issue_date_year.length === 4
        ] : [
            props.fieldData.id_expire_date_month.length === 2,
            props.fieldData.id_expire_date_day.length === 2,
            props.fieldData.id_expire_date_year.length === 4,
            checkExpiration(props.fieldData.id_expire_date_year + "-" + props.fieldData.id_expire_date_month + "-" + props.fieldData.id_expire_date_day)
        ]

        if (dateValues.includes(false)) {
            setHandleErrors({ ...handleErrors, [dateType]: (true) })
        } else {
            setHandleErrors({ ...handleErrors, [dateType]: (false) })
        }
     }

    return (
        <>
        <h2>{content.identification_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{stateInstructions.ID_num_text}</p>
            </div>
        </div>
        {idNumVisible && (
            <div>
                <h3>{idTypeField.label}</h3>
                <div dangerouslySetInnerHTML= {{__html: idTypeFieldInstructions}}/>

                <div className={(idNumReq && handleErrors.id_selection) ? 'error-container' : ''}>
                <Dropdown
                id="id-num-dropdown"
                name="input-dropdown"
                value={props.idType}
                required={idNumReq}
                onChange={(e) => props.saveIdType(e)}
                onBlur={(e) => setHandleErrors({ ...handleErrors, id_selection: checkForErrors(e, 'check value exists') })}
                >
                    <option key="default" value="">{"Select Identification"}</option>
                    <option key="driver-id-num" value="driver-id-num">{driverLicenseField.label}</option>
                    <option key="state-id-num" value="state-id-num">{stateIDField.label}</option>
                    <option key="ssn" value="ssn">{ssnField.label}</option>
                    <option key="id-none" value="none">{noIdField.label}</option>
                </Dropdown>
                {(idNumReq && handleErrors.id_selection) &&
                    <span id="id-num-dropdown-error" role="alert" className='error-text text-bold'>
                        {content.selector_error}
                    </span>
                }
                </div>

                {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num')) &&
                <>
                <div className={(idNumReq && handleErrors.id_number) ? 'error-container' : ''}>
                    {(props.idType === 'driver-id-num') &&

                        <Label className="text-bold" htmlFor="state-id-num-error">{driverLicenseField.label}{idNumReq && <span className='required-text'>*</span>}
                        <TextInput
                        id="driver-id-num"
                        className="radius-md"
                        name="driver-id-num"
                        type="text"
                        autoComplete="off"
                        required={idNumReq}
                        value={props.fieldData.id_number}
                        onChange={props.saveFieldData('id_number')}
                        onBlur={(e) => setHandleErrors({ ...handleErrors, id_number: checkForErrors(e, 'check value exists') })}
                        />
                        {(idNumReq && handleErrors.id_number) &&
                            <span id="state-id-num-error" role="alert" className='error-text'>
                                {content.id_error}
                            </span>
                        }
                        </Label>
                    }
                    {(props.idType === 'state-id-num') &&

                        <Label className="text-bold" htmlFor="state-id-num-error">{stateIDField.label}{idNumReq && <span className='required-text'>*</span>}
                        <TextInput
                        id="driver-id-num"
                        className="radius-md"
                        name="driver-id-num"
                        type="text"
                        autoComplete="off"
                        required={idNumReq}
                        value={props.fieldData.id_number}
                        onChange={props.saveFieldData('id_number')}
                        onBlur={(e) => setHandleErrors({ ...handleErrors, id_number: checkForErrors(e, 'check value exists') })}
                        />
                        {(idNumReq && handleErrors.id_number) &&
                            <span id="state-id-num-error" role="alert" className='error-text'>
                                {content.id_error}
                            </span>
                        }
                        </Label>
                    }
                </div>

                <Grid row gap>
                    <Grid tablet={{ col: true }}>
                    <div className={(idNumReq && handleErrors.issue_date) ? 'error-container' : ''}>
                    <Fieldset className="fieldset"  legend={idNumReq ? [<span className="text-bold">Issue Date</span>, <span className='required-text'>*</span>] : "Issue Date"} style={{ marginTop:'30px'}}>
                        <span className="usa-hint" id="id-issue-date-hint">
                        {content.id_hint}
                        </span>
                        <div
                            id="id-issue-date"
                            className="usa-memorable-date radius-md"
                            name="date-of-birth"
                            autoComplete="off"
                            required={idNumReq}
                            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) checkDateValues('issue'); }}
                            data-testid="dateInputGroup"
                        >
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                                    <label data-testid="label" className="usa-label" htmlFor="id_issue_date_month">
                                        Month
                                    <input
                                        id="id_issue_date_month"
                                        className="usa-input radius-md"
                                        aria-describedby="issue-date-error"
                                        name="id_issue_date_month"
                                        label="Month"
                                        unit="month"
                                        required={true}
                                        type="text"
                                        pattern="0[1-9]|1[1,2]"
                                        inputMode="numeric"
                                        maxLength={2}
                                        minLength={2}
                                        value={props.fieldData.id_issue_date_month}
                                        onInput={props.saveFieldData('id_issue_date_month')}
                                        onKeyUp={(e) => jumpTo(e, 'id_issue_date_day')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                        onBlur={(e) => props.dateFormat(e, 'id_issue_date_month')}
                                    />
                                    </label>
                                </div>
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                    <label data-testid="label" className="usa-label" htmlFor="id_issue_date_day">
                                        Day
                                    <input
                                        id="id_issue_date_day"
                                        className="usa-input radius-md"
                                        name="id_issue_date_day"
                                        aria-describedby="issue-date-error"
                                        label="Day"
                                        unit="day"
                                        required={true}
                                        type="text"
                                        pattern="0[1-9]|[12][0-9]|3[01]"
                                        inputMode="numeric"
                                        minLength={2}
                                        maxLength={2}
                                        value={props.fieldData.id_issue_date_day}
                                        onInput={props.saveFieldData('id_issue_date_day')}
                                        onKeyUp={(e) => jumpTo(e, 'id_issue_date_year')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                        onBlur={(e) => props.dateFormat(e, 'id_issue_date_day')}
                                    />
                                    </label>
                                </div>
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                    <label data-testid="label" className="usa-label" htmlFor="id_issue_date_year">
                                        Year
                                    <input
                                        id="id_issue_date_year"
                                        className="usa-input radius-md"
                                        name="id_issue_date_year"
                                        aria-describedby="issue-date-error"
                                        label="Year"
                                        unit="year"
                                        required={true}
                                        type="text"
                                        pattern="(19|20)\d{2}"
                                        inputMode="numeric"
                                        minLength={4}
                                        maxLength={4}
                                        value={props.fieldData.id_issue_date_year}
                                        onInput={props.saveFieldData('id_issue_date_year')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                    />
                                    </label>
                                </div>
                        </div>
                    {(idNumReq && handleErrors.issue_date) &&
                        <span id="issue-date-error" role="alert" className='error-text text-bold'>
                        {content.id_issue_date_error}
                        </span>
                    }
                    </Fieldset>
                    </div>
                    </Grid>

                    <Grid tablet={{ col: true }}>
                    <div className={(idNumReq && handleErrors.expire_date) ? 'error-container' : ''}>
                    <Fieldset className="fieldset" legend={idNumReq ? [<span className="text-bold">Expire Date</span>, <span className='required-text'>*</span>] : "Expire Date"} style={{ marginTop:'30px'}}>
                        <span className="usa-hint" id="id-issue-date-hint">
                        {content.id_hint}
                        </span>
                        <div
                            id="id-expire-date"
                            className="usa-memorable-date"
                            name="date-of-birth"
                            autoComplete="off"
                            required={idNumReq}
                            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) checkDateValues('expire'); }}
                            data-testid="dateInputGroup"
                        >
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                                    <label data-testid="label" className="usa-label" htmlFor="id_expire_date_month">
                                        Month
                                    <input
                                        id="id_expire_date_month"
                                        className="usa-input radius-md"
                                        aria-describedby="expire-date-error"
                                        name="id_expire_date_month"
                                        label="Month"
                                        unit="month"
                                        required={true}
                                        type="text"
                                        pattern="0[1-9]|1[1,2]"
                                        inputMode="numeric"
                                        maxLength={2}
                                        minLength={2}
                                        value={props.fieldData.id_expire_date_month}
                                        onInput={props.saveFieldData('id_expire_date_month')}
                                        onKeyUp={(e) => jumpTo(e, 'id_expire_date_day')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                        onBlur={(e) => props.dateFormat(e, 'id_expire_date_month')}
                                    />
                                    </label>
                                </div>
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                <label data-testid="label" className="usa-label" htmlFor="id_expire_date_day">
                                    Day
                                    <input
                                        id="id_expire_date_day"
                                        className="usa-input radius-md"
                                        name="id_expire_date_day"
                                        aria-describedby="expire-date-error"
                                        label="Day"
                                        unit="day"
                                        required={true}
                                        type="text"
                                        pattern="0[1-9]|[12][0-9]|3[01]"
                                        inputMode="numeric"
                                        minLength={2}
                                        maxLength={2}
                                        value={props.fieldData.id_expire_date_day}
                                        onInput={props.saveFieldData('id_expire_date_day')}
                                        onKeyUp={(e) => jumpTo(e, 'id_expire_date_year')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                        onBlur={(e) => props.dateFormat(e, 'id_expire_date_day')}
                                    />
                                    </label>
                                </div>

                                <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                    <label data-testid="label" className="usa-label" htmlFor="id_expire_date_year">
                                        Year
                                    <input
                                        id="id_expire_date_year"
                                        className="usa-input radius-md"
                                        name="id_expire_date_year"
                                        aria-describedby="expire-date-error"
                                        label="Year"
                                        unit="year"
                                        required={true}
                                        type="text"
                                        pattern="(19|20)\d{2}"
                                        inputMode="numeric"
                                        minLength={4}
                                        maxLength={4}
                                        value={props.fieldData.id_expire_date_year}
                                        onInput={props.saveFieldData('id_expire_date_year')}
                                        onKeyDown={(e) => restrictType(e, 'number')}
                                    />
                                    </label>
                                </div>
                        </div>
                    {(idNumReq && handleErrors.expire_date) &&
                        <span id="expire-date-error" role="alert" className='error-text text-bold'>
                        {content.id_expire_date_error}
                        </span>
                    }
                    </Fieldset>
                    </div>
                    </Grid>
                </Grid>
                </>
                }



                {props.idType === 'ssn' &&
                <div className={(idNumReq && handleErrors.id_ssn) ? 'error-container' : ''}>
                <Label className="text-bold" htmlFor="ssn-input-error">{ssnField.label}{idNumReq && <span className='required-text'>*</span>}</Label>
                <span className="usa-hint" id="ssn-hint">{content.ssn_hint}</span>
                <TextInput
                    id="ssn-input"
                    className="radius-md"
                    name="ssn-input"
                    autoComplete="off"
                    required={idNumReq}
                    type="text"
                    inputMode="numeric"
                    minLength={4}
                    maxLength={4}
                    value={props.fieldData.id_number}
                    onChange={props.saveFieldData('id_number')}
                    onKeyDown={(e) => restrictType(e, 'number')}
                    onBlur={(e) => setHandleErrors({ ...handleErrors, id_ssn: checkForErrors(e, 'check value length') })}
                    />
                    {(idNumReq && handleErrors.id_ssn) &&
                    <span id="ssn-input-error" role="alert" className='error-text text-bold'>
                        {content.ssn_error}
                    </span>
                    }
                </div>}

                {props.idType === 'none' && <div dangerouslySetInnerHTML= {{__html: noIdFieldInstructions}}/>}

            </div>


        )}
        </>
    );
}

export default Identification;