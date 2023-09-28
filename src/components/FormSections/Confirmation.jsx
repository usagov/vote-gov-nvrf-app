import { Alert, Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/confirmation.json";
import "../../styles/pages/Confirmation.css";
import GenerateFilledPDF from '../GenerateFilledPDF';

function Confirmation(props){
    const fieldData = props.fieldData;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    //field data overrides for confirm page printing only
    const fieldDataOverride_race = (fieldData.race === '') ? "Not required for your state" : fieldData.race;
    const fieldDataOverride_party = (fieldData.party_choice === '') ? "No party entered": fieldData.party_choice;
    const fieldDataOverride_state = props.stateData.name;
    fieldData.state = fieldDataOverride_state;

    //Acknowledgment field controls
    const [hasAcknowledged, setHasAcknowledged] = useState(null);
    const [error, setError] = useState(null)
    const acknowledgeCheckbox = (checkStatus) => {
        setHasAcknowledged(checkStatus);
        setError(!checkStatus);
    }

    const checkboxValid = () => {
        (hasAcknowledged === null) && setError(true);
    }

    return (
        <>

        <Button
            type="button"
            onClick={props.handlePrev}>
            Edit registration information
        </Button>

        <div className="confirm-info">
            <h2>{content.confirmation_heading}</h2>
            <p>{content.confirmation_text}</p>

            <h3>Personal Information
                <span style={{ marginLeft:'0.5rem' }}>
                <Button
                    type="button"
                    onClick={props.handleGoBackSteps(4)}
                    unstyled>
                    Edit
                </Button>
            </span>
            </h3>
            <ul>
                <li>ID number: {fieldData.id_number}</li>
                <li>ID issue date: {fieldData.id_issue_date_month}/{fieldData.id_issue_date_day}/{fieldData.id_issue_date_year}</li>
                <li>ID expire date: {fieldData.id_expire_date_month}/{fieldData.id_expire_date_day}/{fieldData.id_expire_date_year}</li>
            </ul>
            <hr />
            <h3>Choice of Political Party
                <span style={{ marginLeft:'0.5rem' }}>
                    <Button
                        type="button"
                        onClick={props.handleGoBackSteps(1)}
                        unstyled>
                        Edit
                    </Button>
                </span>
            </h3>
            <ul>
                <li>Political party: {fieldDataOverride_party}</li>
            </ul>

            <div className="usa-alert usa-alert--info">
                <div className="usa-alert__body">
                    <p>{content.acknowledge_text}</p>
                </div>
            </div>

            <div className={error && 'error-container'}>
                <Checkbox 
                    id="acknowledge-check"
                    name="acknowledge-check"
                    required 
                    checked={hasAcknowledged}
                    label="I can confirm my information is correct to the best of my knowledge." 
                    onChange={(e) => acknowledgeCheckbox(e.target.checked)}
                    />
                {error && 
                    <span id="first-name-error" role="alert" className='error-text'>
                        Checkbox must be checked to continue.
                    </span>
                }
            </div>
        </div>

            <Button onClick={() => {checkboxValid(), hasAcknowledged && GenerateFilledPDF(props.fieldData)}} type="submit">
                Confirm and Download Form
            </Button>
        </>
    );
}

export default Confirmation;