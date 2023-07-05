import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
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
        <h4>{content.identification_heading}</h4>
        <div class="usa-alert usa-alert--info">
            <div class="usa-alert__body">
                <p>{content.id_number_text}</p>
            </div>
        </div>
        {idNumVisible && (
            <div>
                <p>{stateInstructions.ID_num_text}</p>
                <Label htmlFor="state-id-num">State Driver's License Number</Label>
                <TextInput id="state-id-num" name="state-id-num" type="text" autoComplete="off" required={idNumReq}/>

                <Label htmlFor="issue-date" id="issue-date-label">Issue Date</Label>
                <div className="usa-hint" id="issue-date-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="issue-date-hint" aria-labelledby="issue-date-label" id="issue-date" name="issue-date" required={idNumReq}/>

                <Label htmlFor="expire-date" id="expire-date-label">Expire Date</Label>
                <div className="usa-hint" id="expire-date-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="expire-date-hint" aria-labelledby="expire-date-label" id="expire-date" name="expire-date" required={idNumReq}/>
            </div>
        )}
            <Button type="button" onClick={props.handleNext}>
                Confirm your information
            </Button>
        </>
    );
}

export default Identification;