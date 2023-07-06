import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function PersonalInfo(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const stateInstructions = props.stateData.state_field_instructions;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    const nameVisible = stateFieldVisible.name;
    const nameReq = stateFieldRequirements.name;
    const dobVisible = stateFieldVisible.DOB;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneVisible = stateFieldVisible.telephone;
    const telephoneReq = stateFieldRequirements.telephone;
    const raceVisible = stateFieldVisible.race;
    const raceReq = stateFieldRequirements.race;

     //Previous name fields controls
     const [hasPreviousName, setHasPreviousName] = useState(false);
     const onChangePreviousNameCheckbox = (e) => {
         setHasPreviousName(e.target.checked);
     }

     const [previousName, setPreviousName] = useState("");
     const onChangePreviousName = (e) => {
         setPreviousName(e.target.value);
     }

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to registration options
        </Button>
        <h2>{content.personal_info_heading}</h2>
        {!changeRegistrationVisible &&
            <p>{content.personal_info_text}</p>
        }
        <div className="usa-alert usa-alert--info">
            <div className="usa-alert__body">
                <p>{content.personal_info_alert_text}</p>
            </div>
        </div>

        {nameVisible && (
            <div>
                <Label htmlFor="title-select">Title</Label>
                <Dropdown id="title-select" name="title-select" value={props.fieldData.title} onChange={props.saveFieldData('title')} autoComplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name">First Name</Label>
                <TextInput id="first-name" name="first-name" value={props.fieldData.first_name} onChange={props.saveFieldData('first_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="middle-name">Middle Name(s)</Label>
                <TextInput id="middle-name" name="middle-name" value={props.fieldData.middle_name} onChange={props.saveFieldData('middle_name')} type="text" autoComplete="off"/>

                <Label htmlFor="last-name">Last Name</Label>
                <TextInput id="last-name" name="last-name" value={props.fieldData.last_name} onChange={props.saveFieldData('last_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select">Suffix</Label>
                <Dropdown id="suffix-select" name="suffix-select" value={props.fieldData.suffix} onChange={props.saveFieldData('suffix')} autoComplete="off" required={nameReq}>
                    <option>- Select -{' '}</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </Dropdown>
            </div>
        )}

        {changeRegistrationVisible && (
            <Checkbox id="legal-name-change" name="legal-name-change" checked={hasPreviousName} onChange={onChangePreviousNameCheckbox} label="I have legally changed my name since the last time I registered to vote." />
        )}

        {hasPreviousName && (
            <div value={previousName} onChange={onChangePreviousName}>
                <h3>Previous Name</h3>
                <Label htmlFor="title-select-2">Title</Label>
                <Dropdown id="title-select-2" name="title-select-2" value={props.fieldData.prev_title} onChange={props.saveFieldData('prev_title')} autoComplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name-2">First Name</Label>
                <TextInput id="first-name-2" name="first-name-2" value={props.fieldData.prev_first_name} onChange={props.saveFieldData('prev_first_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="middle-name-2">Middle Name</Label>
                <TextInput id="middle-name-2" name="middle-name-2" value={props.fieldData.prev_middle_name} onChange={props.saveFieldData('prev_middle_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="last-name-2">Last Name</Label>
                <TextInput id="last-name-2" name="last-name-2" value={props.fieldData.prev_last_name} onChange={props.saveFieldData('prev_last_name')} type="text" autoComplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select-2">Suffix</Label>
                <Dropdown id="suffix-select-2" name="suffix-select-2" value={props.fieldData.prev_suffix} onChange={props.saveFieldData('prev_suffix')} autoComplete="off" required={nameReq}>
                    <option>- Select -{' '}</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </Dropdown>
            </div>
        )}

        {dobVisible && (
            <div>
                <Label htmlFor="date-of-birth" id="date-of-birth-label">Date of Birth</Label>
                <div className="usa-hint" id="date-of-birth-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="date-of-birth-hint" aria-labelledby="date-of-birth-label" id="date-of-birth" name="date-of-birth" value={props.fieldData.date_of_birth} onChange={props.saveFieldData('date_of_birth')} autoComplete="off" required={dobReq}/>
            </div>
        )}

        {telephoneVisible && (
            <div>
                <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
                <TextInput id="phone-number" name="phone-number" value={props.fieldData.phone_number} onChange={props.saveFieldData('phone_number')} type="text" autoComplete="off" required={telephoneReq}/>
            </div>
        )}

        {raceVisible && (
            <div>
                <p>{content.race_text} {stateInstructions.race_text}</p>
                <Label htmlFor="race-ethic-group-select">Race</Label>
                <Dropdown id="race-ethic-group-select" name="race-ethic-group-select" value={props.fieldData.race} onChange={props.saveFieldData('race')} autoComplete="off" required={raceReq}>
                    <option>- Select -{' '}</option>
                    <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                    <option value="Asian or Pacific Islander">Asian or Pacific Islander</option>
                    <option value="Black, not of Hispanic Origin">Black, not of Hispanic Origin</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Multi‑racial">Multi‑racial</option>
                    <option value="White, not of Hispanic Origin">White, not of Hispanic Origin</option>
                    <option value="Other">Other</option>
                </Dropdown>
            </div>
        )}
            <Button
                type="button"
                onClick={props.handleNext}>
                Continue to address & location
            </Button>
        </>
    );
}

export default PersonalInfo;
