import { Label, TextInput, Button, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/registration-form.json";
import { focusNext, restrictLength, restrictType, expirationValidate } from './ValidateField';

function Identification(props){
    const[expireValid, setExpireValid] = useState();

    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const idNumReq = stateFieldRequirements.ID_num;
    const idNumVisible = stateFieldVisible.ID_num;

    const expirationDate = props.fieldData.id_expire_date_year + "-" + props.fieldData.id_expire_date_month + "-" + props.fieldData.id_expire_date_day;

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
                <Label htmlFor="state-id-num">State Driver's License Number</Label>
                <TextInput id="state-id-num" name="state-id-num" value={props.fieldData.id_number} onChange={props.saveFieldData('id_number')} type="text" autoComplete="off" required={idNumReq}/>

                <Fieldset legend="Issue Date" style={{ marginTop:'30px'}}>
                    <span className="usa-hint" id="id-issue-date-hint">
                    For example: mm/dd/yyyy
                    </span>
                    <div id="id-issue-date" className="usa-memorable-date" name="date-of-birth" autoComplete="off" required={idNumReq} data-testid="dateInputGroup">
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Month
                            </label>
                            <input id="id_issue_date_month" className="usa-input" name="id_issue_date_month" label="Month" unit="month"
                                required={true} type="number" inputMode="numeric" value={props.fieldData.id_issue_date_month} 
                                onChange={props.saveFieldData('id_issue_date_month')}
                                onKeyUp={(e) => focusNext(e, "id_issue_date_day")}
                                onKeyDown={(e) => restrictLength(e, e.target.value, e.target.maxLength)}
                                min={1} max={12} minLength={2} maxLength={2}
                            />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Day
                            </label>
                            <input id="id_issue_date_day" className="usa-input" name="id_issue_date_day" label="Day" unit="day"
                                required={true} type="number" inputMode="numeric" value={props.fieldData.id_issue_date_day} 
                                onChange={props.saveFieldData('id_issue_date_day')}
                                onKeyUp={(e) => focusNext(e, "id_issue_date_year")}
                                onKeyDown={(e) => restrictLength(e, e.target.value, e.target.maxLength)}
                                min={1} max={31} minLength={2} maxLength={2}
                            />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Year
                            </label>
                            <input id="id_issue_date_year" className="usa-input" name="id_issue_date_year" label="Year" unit="year"
                                required={true} type="text" inputMode="numeric" value={props.fieldData.id_issue_date_year} 
                                onChange={props.saveFieldData('id_issue_date_year')}
                                onKeyDown={(e) => restrictType(e, 'number')}
                                minLength={4} maxLength={4}
                            />
                            </div>
                    </div>
                </Fieldset>

                <Fieldset legend="Expire Date" style={{ marginTop:'30px'}}>
                    <span className="usa-hint" id="id-issue-date-hint">
                    For example: mm/dd/yyyy
                    </span>
                    <div id="id-expire-date" className="usa-memorable-date" name="date-of-birth" autoComplete="off" required={idNumReq} data-testid="dateInputGroup">
                        <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Month
                            </label>
                            <input id="id_expire_date_month" className="usa-input" name="id_expire_date_month" label="Month" unit="month"
                                required={true} type="number" inputMode="numeric" value={props.fieldData.id_expire_date_month} 
                                onChange={props.saveFieldData('id_expire_date_month')}
                                onKeyUp={(e) => focusNext(e, "id_expire_date_day")}
                                onKeyDown={(e) => restrictLength(e, e.target.value, e.target.maxLength)}
                                min={1} max={12} minLength={2} maxLength={2}
                            />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Day
                            </label>
                            <input id="id_expire_date_day" className="usa-input" name="id_expire_date_day" label="Day" unit="day"
                                required={true} type="number" inputMode="numeric" value={props.fieldData.id_expire_date_day} 
                                onChange={props.saveFieldData('id_expire_date_day')}
                                onKeyUp={(e) => focusNext(e, "id_expire_date_year")}
                                onKeyDown={(e) => restrictLength(e, e.target.value, e.target.maxLength)}
                                min={1} max={31} minLength={2} maxLength={2}
                            />
                            </div>
                            <div data-testid="formGroup" className="usa-form-group usa-form-group--month">
                            <label data-testid="label" className="usa-label" htmlFor="testDateInput">
                                Year
                            </label>
                            <input id="id_expire_date_year" className="usa-input" name="id_expire_date_year" label="Year" unit="year"
                                required={true} type="text" inputMode="numeric" value={props.fieldData.id_expire_date_year} 
                                onChange={props.saveFieldData('id_expire_date_year')}
                                onKeyDown={(e) => restrictType(e, 'number')}
                                minLength={4} maxLength={4}
                            />
                            </div>
                    </div>
                </Fieldset>
            </div>
        )}
            {/* <Button onClick={setExpireValid(expirationValidate(expirationDate))}> */}
            {/* <Button>
                Check expiration date
            </Button> */}
            {/* <p>{!expireValid && "Expiration date is not valid!"}</p> */}
            <Button type="submit">
                Continue to political party
            </Button>
        </>
    );
}

export default Identification;