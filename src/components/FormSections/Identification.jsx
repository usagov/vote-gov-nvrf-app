import { Label, TextInput, Dropdown, Grid, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import { focusNext, restrictLength, restrictType, checkExpiration, checkForErrors } from '../HelperFunctions/ValidateField';

function Identification(props){
    const content = props.content;
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const idNumReq = stateFieldRequirements.ID_num;
    const idNumVisible = stateFieldVisible.ID_num;

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
                <h3>{content.choose_id_heading}</h3>
                <p>{content.choose_id_text}</p>

                <div className={(idNumReq && handleErrors.id_selection) ? 'error-container' : ''}>
                <Dropdown
                id="id-num-dropdown"
                name="input-dropdown"
                value={props.idType}
                required={idNumReq}
                onChange={(e) => props.saveIdType(e)}
                onBlur={(e) => setHandleErrors({ ...handleErrors, id_selection: checkForErrors(e, 'check value exists') })}
                >
                    <option key="default" value="">{content.selector_default}</option>
                    <option key="driver-id-num" value="driver-id-num">{content.selector_driver_id}</option>
                    <option key="state-id-num" value="state-id-num">{content.selector_state_id}</option>
                    <option key="ssn" value="ssn">{content.selector_ssn}</option>
                    <option key="id-none" value="none">{content.selector_none}</option>
                </Dropdown>
                {(idNumReq && handleErrors.id_selection) &&
                    <span id="id-num-dropdown-error" role="alert" className='error-text'>
                        {content.selector_error}
                    </span>
                }
                </div>

                {((props.idType === 'driver-id-num') || (props.idType === 'state-id-num')) &&
                <>
                <div className={(idNumReq && handleErrors.id_number) ? 'error-container' : ''}>
                    {(props.idType === 'driver-id-num') &&

                        <Label htmlFor="state-id-num-error">{content.selector_driver_id}{idNumReq && <span className='required-text'>*</span>}
                        <TextInput
                        id="driver-id-num"
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

                        <Label htmlFor="state-id-num-error">{content.selector_state_id}{idNumReq && <span className='required-text'>*</span>}
                        <TextInput
                        id="driver-id-num"
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
                    <Fieldset className="fieldset"  legend={idNumReq ? ["Issue Date", <span className='required-text'>*</span>] : "Issue Date"} style={{ marginTop:'30px'}}>
                        <span className="usa-hint" id="id-issue-date-hint">
                        {content.id_hint}
                        </span>
                        <div
                            id="id-issue-date"
                            className="usa-memorable-date"
                            name="date-of-birth"
                            autoComplete="off"
                            required={idNumReq}
                            onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) checkDateValues('issue'); }}
                            data-testid="dateInputGroup"
                        >
                                <div className="usa-form-group usa-form-group--month usa-form-group--select">
                                    <label className="usa-label" htmlFor="id_issue_date_month">
                                        Month
                                    <select
                                        className="usa-select"
                                        id="id_issue_date_month"
                                        name="id_issue_date_month"
                                        aria-describedby="issue-date-error"
                                        required={true}
                                        value={props.fieldData.id_issue_date_month}
                                        onInput={props.saveFieldData('id_issue_date_month')}
                                        onChange={(e) => {focusNext(e, "id_issue_date_day", "month")}}
                                    >
                                        <option value="">- Select -</option>
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                    </label>
                                </div>
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                    <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                        Day
                                    <input
                                        id="id_issue_date_day"
                                        className="usa-input"
                                        name="id_issue_date_day"
                                        aria-describedby="issue-date-error"
                                        label="Day"
                                        unit="day"
                                        required={true}
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        max={31}
                                        minLength={2}
                                        maxLength={2}
                                        value={props.fieldData.id_issue_date_day}
                                        onInput={props.saveFieldData('id_issue_date_day')}
                                        onChange={(e) => {focusNext(e, "id_issue_date_year"), restrictLength(e, e.target.value, e.target.maxLength) }}
                                />
                                    </label>
                                </div>
                                <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                    <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                        Year
                                    <input
                                        id="id_issue_date_year"
                                        className="usa-input"
                                        name="id_issue_date_year"
                                        aria-describedby="issue-date-error"
                                        label="Year"
                                        unit="year"
                                        required={true}
                                        type="text"
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
                        <span id="issue-date-error" role="alert" className='error-text'>
                        {content.id_issue_date_error}
                        </span>
                    }
                    </Fieldset>
                    </div>
                    </Grid>

                    <Grid tablet={{ col: true }}>
                    <div className={(idNumReq && handleErrors.expire_date) ? 'error-container' : ''}>
                    <Fieldset className="fieldset" legend={idNumReq ? ["Expire Date", <span className='required-text'>*</span>] : "Expire Date"} style={{ marginTop:'30px'}}>
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
                                <div className="usa-form-group usa-form-group--month usa-form-group--select">
                                    <label className="usa-label" htmlFor="id_expire_date_month">
                                        Month
                                    <select
                                        className="usa-select"
                                        id="id_expire_date_month"
                                        name="id_expire_date_month"
                                        aria-describedby="expire-date-error"
                                        required={true}
                                        value={props.fieldData.id_expire_date_month}
                                        onInput={props.saveFieldData('id_expire_date_month')}
                                        onChange={(e) => {focusNext(e, "id_expire_date_day", "month")}}
                                    >
                                        <option value="">- Select -</option>
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                    </label>
                                </div>

                                <div data-testid="formGroup" className="usa-form-group usa-form-group--day">
                                <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                    Day
                                    <input
                                        id="id_expire_date_day"
                                        className="usa-input"
                                        name="id_expire_date_day"
                                        aria-describedby="expire-date-error"
                                        label="Day"
                                        unit="day"
                                        required={true}
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        max={31}
                                        minLength={2}
                                        maxLength={2}
                                        value={props.fieldData.id_expire_date_day}
                                        onInput={props.saveFieldData('id_expire_date_day')}
                                        onChange={(e) => {focusNext(e, "id_expire_date_year"), restrictLength(e, e.target.value, e.target.maxLength) }}
                                    />
                                    </label>
                                </div>

                                <div data-testid="formGroup" className="usa-form-group usa-form-group--year">
                                    <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                        Year
                                    <input
                                        id="id_expire_date_year"
                                        className="usa-input"
                                        name="id_expire_date_year"
                                        aria-describedby="expire-date-error"
                                        label="Year" unit="year"
                                        required={true}
                                        type="text"
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
                        <span id="expire-date-error" role="alert" className='error-text'>
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
                <Label htmlFor="ssn-input-error">{content.selector_ssn}{idNumReq && <span className='required-text'>*</span>}</Label>
                <span className="usa-hint" id="ssn-hint">{content.ssn_hint}</span>
                <TextInput
                    id="ssn-input"
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
                    <span id="ssn-input-error" role="alert" className='error-text'>
                        {content.ssn_error}
                    </span>
                    }
                </div>}

                {props.idType === 'none' && <p>{content.id_none_text}</p>}

            </div>


        )}
        </>
    );
}

export default Identification;