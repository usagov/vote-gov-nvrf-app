import { Form, Label, TextInput, Button, DateInputGroup, DateInput, Fieldset } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function Identification(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const idNumReq = stateFieldRequirements.ID_num;
    const idNumVisible = stateFieldVisible.ID_num;

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
                    For example: 05 10 2017
                    </span>
                    <DateInputGroup id="id-issue-date" name="id-issue-date" autoComplete="off" required={idNumReq}>
                        <DateInput
                            id="id-issue-date_month"
                            name="id-issue-date_month"
                            label="Month"
                            unit="month"
                            value={props.fieldData.id_issue_date_month} onChange={props.saveFieldData('id_issue_date_month')}
                            maxLength={2}
                            minLength={2}
                        />
                        <DateInput
                            id="id_issue_date_day"
                            name="id_issue_date_day"
                            label="Day"
                            unit="day"
                            value={props.fieldData.id_issue_date_day} onChange={props.saveFieldData('id_issue_date_day')}
                            maxLength={2}
                            minLength={2}
                        />
                        <DateInput
                            id="id_issue_date_year"
                            name="id_issue_date_year"
                            label="Year"
                            unit="year"
                            value={props.fieldData.id_issue_date_year} onChange={props.saveFieldData('id_issue_date_year')}
                            maxLength={4}
                            minLength={4}
                        />
                    </DateInputGroup>
                </Fieldset>

                <Fieldset legend="Expire Date" style={{ marginTop:'30px'}}>
                    <span className="usa-hint" id="id-expire-date-hint">
                    For example: 05 10 2025
                    </span>
                    <DateInputGroup id="id-expire-date" name="id-expire-date" autoComplete="off" required={idNumReq}>
                        <DateInput
                            id="id-expire-date_month"
                            name="id-expire-date_month"
                            label="Month"
                            unit="month"
                            value={props.fieldData.id_expire_date_month} onChange={props.saveFieldData('id_expire_date_month')}
                            maxLength={2}
                            minLength={2}
                        />
                        <DateInput
                            id="id_expire_date_day"
                            name="id_expire_date_day"
                            label="Day"
                            unit="day"
                            value={props.fieldData.id_expire_date_day} onChange={props.saveFieldData('id_expire_date_day')}
                            maxLength={2}
                            minLength={2}
                        />
                        <DateInput
                            id="id_expire_date_year"
                            name="id_expire_date_year"
                            label="Year"
                            unit="year"
                            value={props.fieldData.id_expire_date_year} onChange={props.saveFieldData('id_expire_date_year')}
                            maxLength={4}
                            minLength={4}
                        />
                    </DateInputGroup>
                </Fieldset>
            </div>
        )}
            <Button type="button" onClick={props.handleNext}>
                Continue to political party
            </Button>
        </>
    );
}

export default Identification;