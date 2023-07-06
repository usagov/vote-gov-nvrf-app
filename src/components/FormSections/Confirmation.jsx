import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function Confirmation(props){
    const fieldData = props.fieldData;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Edit registration information
        </Button>

        <h2>{content.confirmation_heading}</h2>
        <p>Be sure to review your information carefully before continuing. Once you confirm, you can choose to print now or send the completed form to yourself to print and mail upon receipt.</p>

        <h3>Personal Information</h3>
        <p>Current Name</p>
        <ul>
            <li>Title: {fieldData.title}</li>
            <li>First Name: {fieldData.first_name}</li>
            <li>Middle Name: {fieldData.middle_name}</li>
            <li>Last Name: {fieldData.last_name}</li>
            <li>Suffix: {fieldData.prev_suffix}</li>
            <li>Date of birth placeholder</li>
        </ul>
        <p>Previous Name</p>
        {!changeRegistrationVisible && <p>You have not changed your name, so these fields are blank.</p>}
        <ul>
            <li>Title: {fieldData.prev_title}</li>
            <li>First Name: {fieldData.prev_first_name}</li>
            <li>Middle Name: {fieldData.prev_middle_name}</li>
            <li>Last Name: {fieldData.prev_last_name}</li>
            <li>Suffix: {fieldData.prev_suffix}</li>
        </ul>
        <p>Other Information</p>
        <ul>
            <li>Phone Number: {fieldData.phone_number}</li>
            <li>Race/Ethnicity: {fieldData.race}</li>
        </ul>
        <hr />

        <h3>Address</h3>
        <ul>

        </ul>
        <hr />
        <h3>Identification</h3>
        <ul>

        </ul>
        <hr />
        <h3>Choice of Political Party</h3>
        <ul>

        </ul>

        <Button type="button" onClick={props.handleNext}>
            Confirm information
        </Button>
        </>
    );
}

export default Confirmation;