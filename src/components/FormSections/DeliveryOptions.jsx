import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function DeliveryOptions(props){
    return (
        <>
        <h2>You're Almost Done!</h2>
            <Button type="button" onClick={props.handleNext}>
                Send the form to my email
            </Button>
            <Button type="button" onClick={props.handleNext}>
                Print the form
            </Button>
        </>
    );
}

export default DeliveryOptions;