import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-five.json";

function Confirmation(props){
    const fieldData = props.fieldData;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    //field data overrides for confirm page printing only
    const fieldDataOverride_race = (fieldData.race === '') ? "Not required for your state" : fieldData.race;
    const fieldDataOverride_party = (fieldData.party_choice === '') ? "No party entered": fieldData.party_choice;

    //Acknowledment field controls
    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const onChangeAcknowledgeCheckbox = (e) => {
        setHasAcknowledged(e.target.checked);
    }

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Edit registration information
        </Button>

        <h2>{content.confirmation_heading}</h2>
        <p>{content.confirmation_text}</p>

        <h3>Personal Information</h3>
        <p>Current Name</p>
        <ul>
            <li>Title: {fieldData.title}</li>
            <li>First Name: {fieldData.first_name}</li>
            <li>Middle Name: {fieldData.middle_name}</li>
            <li>Last Name: {fieldData.last_name}</li>
            <li>Suffix: {fieldData.prev_suffix}</li>
        </ul>

        <p>Previous Name</p>
        {/* Replace changeRegistrationVisible to the checkbox states corresponding to each set of fields */}
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
            <li>Date of birth: NEED TO FIX {fieldData.date_of_birth}</li>
            <li>Phone Number: {fieldData.phone_number}</li>
            <li>Race/Ethnicity: {fieldDataOverride_race}</li>
        </ul>
        <hr />

        <h3>Address</h3>
        <p>Current Address</p>
        <ul>
            <li>Street Address: {fieldData.street_address}</li>
            <li>Apt. or Lot #: {fieldData.apt_num}</li>
            <li>City: {fieldData.city}</li>
            <li>State: NEED TO FIX {fieldData.state}</li>
            <li>Zip code: {fieldData.zip_code}</li>
        </ul>

        <p>Previous Address</p>
        {!changeRegistrationVisible && <p>You are not registering with a change of address, so these fields are blank.</p>}
        <ul>
            <li>Street Address: {fieldData.prev_street_address}</li>
            <li>Apt. or Lot #: {fieldData.prev_apt_num}</li>
            <li>City: {fieldData.prev_city}</li>
            <li>State: NEED TO FIX {fieldData.prev_state}</li>
            <li>Zip code: {fieldData.prev_zip_code}</li>
        </ul>

        <p>Mailing Address</p>
        {!changeRegistrationVisible && <p>You do not have an alternate mailing address, so these fields are blank.</p>}
        <ul>
            <li>Street Address: {fieldData.mail_street_address}</li>
            <li>Apt. or Lot #: {fieldData.mail_apt_num}</li>
            <li>City: {fieldData.mail_city}</li>
            <li>State: NEED TO FIX {fieldData.mail_state}</li>
            <li>Zip code: {fieldData.mail_zip_code}</li>
        </ul>
        <hr />

        <h3>Identification</h3>
        <ul>
            <li>ID number: {fieldData.id_number}</li>
            <li>ID issue date: {fieldData.id_issue_date}</li>
            <li>ID expire date: NEED TO FIX {fieldData.id_expire_date}</li>
        </ul>
        <hr />
        <h3>Choice of Political Party</h3>
        <ul>
            <li>Political party: {fieldDataOverride_party}</li>
        </ul>

        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.acknowledge_text}</p>
            </div>
        </div>

        <Checkbox id="acknowledge-check" name="acknowledge-check" checked={hasAcknowledged} onChange={onChangeAcknowledgeCheckbox} label="I can confirm my information is correct to the best of my knowledge." />

        <Button type="submit" disabled={!hasAcknowledged} onClick={props.handleNext}>
            Confirm information
        </Button>
        </>
    );
}

export default Confirmation;