import { Alert, Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-five.json";

function Confirmation(props){
    const fieldData = props.fieldData;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    //field data overrides for confirm page printing only
    const fieldDataOverride_race = (fieldData.race === '') ? "Not required for your state" : fieldData.race;
    const fieldDataOverride_party = (fieldData.party_choice === '') ? "No party entered": fieldData.party_choice;
    const fieldDataOverride_state = props.stateData.name;

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
        <p><strong>Current Name</strong></p>
        <ul>
            <li>Title: {fieldData.title}</li>
            <li>First Name: {fieldData.first_name}</li>
            <li>Middle Name: {fieldData.middle_name}</li>
            <li>Last Name: {fieldData.last_name}</li>
            <li>Suffix: {fieldData.prev_suffix}</li>
        </ul>

        <p><strong>Previous Name</strong></p>
        {/* Replace changeRegistrationVisible to the checkbox states corresponding to each set of fields */}
        {!changeRegistrationVisible && (
            <Alert type="info" headingLevel="h4" noIcon>
                You have not changed your name, so these fields are blank.
            </Alert>
        )}
        <ul>
            <li>Title: {fieldData.prev_title}</li>
            <li>First Name: {fieldData.prev_first_name}</li>
            <li>Middle Name: {fieldData.prev_middle_name}</li>
            <li>Last Name: {fieldData.prev_last_name}</li>
            <li>Suffix: {fieldData.prev_suffix}</li>
        </ul>

        <p><strong>Other Information</strong></p>
        <ul>
            <li>Date of birth: {fieldData.date_of_birth_month}/{fieldData.date_of_birth_day}/{fieldData.date_of_birth_year}</li>
            <li>Phone Number: {fieldData.phone_number}</li>
            <li>Race/Ethnicity: {fieldDataOverride_race}</li>
        </ul>
        <hr />

        <h3>Address</h3>
        <p><strong>Current Address</strong></p>
        <ul>
            <li>Street Address: {fieldData.street_address}</li>
            <li>Apt. or Lot #: {fieldData.apt_num}</li>
            <li>City: {fieldData.city}</li>
            <li>State: {fieldDataOverride_state}</li>
            <li>Zip code: {fieldData.zip_code}</li>
        </ul>

        <p><strong>Previous Address</strong></p>
        {!changeRegistrationVisible && (
            <Alert type="info" headingLevel="h4" noIcon>
                You are not registering with a change of address, so these fields are blank.
            </Alert>
        )}
        <ul>
            <li>Street Address: {fieldData.prev_street_address}</li>
            <li>Apt. or Lot #: {fieldData.prev_apt_num}</li>
            <li>City: {fieldData.prev_city}</li>
            <li>State: {fieldData.prev_state}</li>
            <li>Zip code: {fieldData.prev_zip_code}</li>
        </ul>

        <p><strong>Mailing Address</strong></p>
        {!changeRegistrationVisible && (
            <Alert type="info" headingLevel="h4" noIcon>
                You do not have an alternate mailing address, so these fields are blank.
            </Alert>
        )}
        <ul>
            <li>Street Address: {fieldData.mail_street_address}</li>
            <li>Apt. or Lot #: {fieldData.mail_apt_num}</li>
            <li>City: {fieldData.mail_city}</li>
            <li>State: {fieldData.mail_state}</li>
            <li>Zip code: {fieldData.mail_zip_code}</li>
        </ul>
        <hr />

        <h3>Identification</h3>
        <ul>
            <li>ID number: {fieldData.id_number}</li>
            <li>ID issue date: {fieldData.id_issue_date_month}/{fieldData.id_issue_date_day}/{fieldData.id_issue_date_year}</li>
            <li>ID expire date: {fieldData.id_expire_date_month}/{fieldData.id_expire_date_day}/{fieldData.id_expire_date_year}</li>
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