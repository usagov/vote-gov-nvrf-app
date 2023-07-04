import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function Confirmation(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const idNumReq = stateFieldRequirements.ID_num;
    const idNumVisible = stateFieldVisible.ID_num;

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Edit registration information
        </Button>
        <h2>{content.confirmation_heading}</h2>
            <Button type="button" onClick={props.handleNext}>
                Confirm information
            </Button>
        </>
    );
}

export default Confirmation;