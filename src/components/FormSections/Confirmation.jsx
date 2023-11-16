import { Alert, Button, Checkbox } from '@trussworks/react-uswds';
import React, { useState, useEffect } from "react";
import {fetchData} from '../HelperFunctions/JsonHelper.jsx';
import "../../styles/pages/Confirmation.css";

function Confirmation(props){
    const [content, setContent] = useState();
    useEffect(() => {
        fetchData("confirmation.json", setContent);
    }, []);

    const fieldData = props.fieldData;
    const prevName = fieldData.prev_title + fieldData.prev_first_name + fieldData.prev_middle_name + fieldData.prev_last_name + fieldData.prev_suffix;
    const prevAddress = fieldData.prev_street_address + fieldData.prev_apt_num + fieldData.prev_city + fieldData.prev_state + fieldData.prev_zip_code;
    const prevMailAddress = fieldData.mail_street_address + fieldData.mail_apt_num + fieldData.mail_city + fieldData.mail_state + fieldData.mail_zip_code;


    //field data overrides for confirm page printing only
    const fieldDataOverride_race = (fieldData.race === '') ? "Not required for your state" : fieldData.race;
    const fieldDataOverride_party = (fieldData.party_choice === '') ? "No party entered": fieldData.party_choice;
    const fieldDataOverride_state = props.stateData.name;
    fieldData.state = fieldDataOverride_state;

    //field data overrides for id dates
    const fieldDataOverride_id_issue_date = (fieldData.id_issue_date_month === '') ? "" : `${fieldData.id_issue_date_month}/${fieldData.id_issue_date_day}/${fieldData.id_issue_date_year}`;
    const fieldDataOverride_id_expire_date = (fieldData.id_expire_date_month === '') ? "" : `${fieldData.id_expire_date_month}/${fieldData.id_expire_date_day}/${fieldData.id_expire_date_year}`;

    if (content) {
        return (
            <>
                <div className="confirm-info">
                    <h1>{content.confirmation_heading}</h1>
                    <p>{content.confirmation_text}</p>

                    <h2>Personal Information
                        <span style={{ marginLeft:'0.5rem' }}>
            <Button
                type="button"
                onClick={props.handleGoBackSteps(4)}
                unstyled>
                Edit
            </Button>
            </span>
                    </h2>

                    {/*Jump to Personal Info Section (Step 1) */}
                    <p><strong>Current Name</strong></p>
                    <ul>
                        <li>Title: {fieldData.title}</li>
                        <li>First Name: {fieldData.first_name}</li>
                        <li>Middle Name: {fieldData.middle_name}</li>
                        <li>Last Name: {fieldData.last_name}</li>
                        <li>Suffix: {fieldData.suffix}</li>
                    </ul>

                    <p><strong>Previous Name</strong></p>
                    {!prevName && (
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
                    <span className="divider-grey"></span>

                    <h2>Address
                        <span style={{ marginLeft:'0.5rem' }}>
            <Button
                type="button"
                onClick={props.handleGoBackSteps(3)}
                unstyled>
                Edit
            </Button>
            </span>
                    </h2>
                    <p><strong>Current Address</strong></p>
                    <ul>
                        <li>Street Address: {fieldData.street_address}</li>
                        <li>Apt. or Lot #: {fieldData.apt_num}</li>
                        <li>City: {fieldData.city}</li>
                        <li>State: {fieldDataOverride_state}</li>
                        <li>Zip code: {fieldData.zip_code}</li>
                    </ul>

                    <p><strong>Previous Address</strong></p>
                    {!prevAddress && (
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
                    {!prevMailAddress && (
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
                    <span className="divider-grey"></span>

                    <h2>Identification
                        <span style={{ marginLeft:'0.5rem' }}>
                <Button
                    type="button"
                    onClick={props.handleGoBackSteps(2)}
                    unstyled>
                    Edit
                </Button>
            </span>
                    </h2>
                    <ul>
                        <li>ID number: {fieldData.id_number}</li>
                        <li>ID issue date: {fieldDataOverride_id_issue_date} </li>
                        <li>ID expire date: {fieldDataOverride_id_expire_date}</li>
                    </ul>
                    <span className="divider-grey"></span>
                    <h2>Choice of Political Party
                        <span style={{ marginLeft:'0.5rem' }}>
                <Button
                    type="button"
                    onClick={props.handleGoBackSteps(1)}
                    unstyled>
                    Edit
                </Button>
            </span>
                    </h2>
                    <ul>
                        <li>Political party: {fieldDataOverride_party}</li>
                    </ul>
                </div>

                <div className="usa-alert usa-alert--info">
                    <div className="usa-alert__body">
                        <h4>{content.acknowledge_heading}</h4>
                        <p>{content.acknowledge_text}</p>
                    </div>
                </div>

                <div className={props.error ? 'error-container margin-y-4' : 'margin-y-4'}>
                    <Checkbox
                        id="acknowledge-check"
                        name="acknowledge-check"
                        required
                        defaultChecked={props.hasAcknowledged}
                        label="I can confirm my information is correct to the best of my knowledge."
                        onChange={(e) => props.acknowledgeCheckbox(e.target.checked)}
                    />
                    {props.error &&
                        <span id="first-name-error" role="alert" className='error-text text-bold'>
                    Checkbox must be checked to continue.
                </span>
                    }
                </div>
            </>
        );
    }
}

export default Confirmation;