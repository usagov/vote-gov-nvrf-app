import { Label, TextInput, Button, Dropdown, Grid } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/registration-form.json";
import { focusNext, restrictLength, restrictType, checkExpiration, checkForErrors } from '../HelperFunctions/ValidateField';

function Identification(props){
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
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to address & location
        </Button>
        <h2>{content.identification_heading}</h2>
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.id_number_text}</p>
            </div>
        </div>
        {idNumVisible && (
            <div>
                <h3>Identification</h3>
                <p>{stateInstructions.ID_num_text}</p>

                <div className={(idNumReq && handleErrors.id_selection) ? 'error-container' : ''}>
                <Dropdown 
                id="id-num-dropdown"
                name="input-dropdown"
                value={props.idType}
                required={idNumReq}
                onChange={(e) => props.saveIdType(e)}
                onBlur={(e) => setHandleErrors({ ...handleErrors, id_selection: checkForErrors(e, 'check value exists') })}
                >
                    <option key="default" value="">Select Identification</option>
                    <option key="id-num" value="state-id-num">State ID Number</option>
                    <option key="ssn" value="ssn">Social Security Number (last 4 digits)</option>
                    <option key="id-none" value="none">I do not have a valid ID number</option>
                </Dropdown> 
                {(idNumReq && handleErrors.id_selection) && 
                    <span id="id-num-dropdown-error" role="alert" className='error-text'>
                        Identification selection must be made from the dropdown.
                    </span>
                }
                </div> 

                {props.idType === 'state-id-num' && 
                <>
                <div className={(idNumReq && handleErrors.id_number) ? 'error-container' : ''}>
                    <Label htmlFor="state-id-num-error">State ID Number{idNumReq && <span className='required-text'>*</span>}
                    <TextInput 
                        id="state-id-num" 
                        name="state-id-num" 
                        type="text" 
                        autoComplete="off" 
                        required={idNumReq}
                        value={props.fieldData.id_number} 
                        onChange={props.saveFieldData('id_number')} 
                        onBlur={(e) => setHandleErrors({ ...handleErrors, id_number: checkForErrors(e, 'check value exists') })}
                    />
                    {(idNumReq && handleErrors.id_number) && 
                        <span id="state-id-num-error" role="alert" className='error-text'>
                            ID number must be filled out.
                        </span>
                    }
                    </Label>
                </div>

                <Grid row gap>
                    <Grid tablet={{ col: true }}>   
                    <div className={(idNumReq && handleErrors.issue_date) ? 'error-container' : ''}>
                    <legend htmlFor="issue-date" className="usa-legend">Issue Date{idNumReq && <span className='required-text'>*</span>}</legend>
                        <span className="usa-hint" id="id-issue-date-hint">
                        For example: January 19 2000
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
                        Issue Date must follow the format of January 19 2000.
                        </span>
                    }
                    </div>
                    </Grid>

                    <Grid tablet={{ col: true }}>   
                    <div className={(idNumReq && handleErrors.expire_date) ? 'error-container' : ''}>
                    <legend htmlFor="expire-date" className="usa-legend">Expire Date{idNumReq && <span className='required-text'>*</span>}</legend>
                        <span className="usa-hint" id="id-issue-date-hint">
                        For example: January 19 2000
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
                        Expire Date must follow the format of January 19 2000 and be in the future.
                        </span>
                    }</div>
                    </Grid>
                </Grid>
                </>
                }
                
                

                {props.idType === 'ssn' && 
                <div className={(idNumReq && handleErrors.id_ssn) ? 'error-container' : ''}>
                <Label htmlFor="ssn-input-error">Social Security Number (last 4 digits){idNumReq && <span className='required-text'>*</span>}
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
                        Social Security Number must be 4 digits.
                    </span>
                    }
                    </Label>
                </div>}

                {props.idType === 'none' && <p>This option will print "none" on the PDF.</p>}

            </div>


        )}
            <Button type="submit">
                Continue to political party
            </Button>
        </>
    );
}

export default Identification;