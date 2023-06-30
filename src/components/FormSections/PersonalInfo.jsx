import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import React, { useState } from "react";
import content from "../../data/step-four.json";

function PersonalInfo(props){
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;

    const nameVisible = stateFieldVisible.name;
    const nameReq = stateFieldRequirements.name;
    const dobVisible = stateFieldVisible.DOB;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneVisible = stateFieldVisible.telephone;
    const telephoneReq = stateFieldRequirements.telephone;
    const partyVisible = stateFieldVisible.party;
    const partyReq = stateFieldRequirements.party
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
        <h4>{content.personal_info_heading}</h4>
        <p>{content.personal_info_text}</p>

        {nameVisible && (
            <div>
                <Label htmlFor="title-select">Title</Label>
                <Dropdown id="title-select" name="title-select" autocomplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name">First Name</Label>
                <TextInput id="first-name" name="first-name" type="text" autocomplete="off" required={nameReq}/>

                <Label htmlFor="middle-name">Middle Name</Label>
                <TextInput id="middle-name" name="middle-name" type="text" autocomplete="off"/>

                <Label htmlFor="last-name">Last Name</Label>
                <TextInput id="last-name" name="last-name" type="text" autocomplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select">Suffix</Label>
                <Dropdown id="suffix-select" name="suffix-select" autocomplete="off" required={nameReq}>
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
                <h4>Previous Name</h4>
                <Label htmlFor="title-select-2">Title</Label>
                <Dropdown id="title-select-2" name="title-select-2" autocomplete="off">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name-2">First Name</Label>
                <TextInput id="first-name-2" name="first-name-2" type="text" autocomplete="off" required={nameReq}/>

                <Label htmlFor="middle-name-2">Middle Name</Label>
                <TextInput id="middle-name-2" name="middle-name-2" type="text" autocomplete="off" required={nameReq}/>

                <Label htmlFor="last-name-2">Last Name</Label>
                <TextInput id="last-name-2" name="last-name-2" type="text" autocomplete="off" required={nameReq}/>

                <Label htmlFor="suffix-select-2">Suffix</Label>
                <Dropdown id="suffix-select-2" name="suffix-select-2" autocomplete="off" required={nameReq}>
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
                <DatePicker aria-describedby="date-of-birth-hint" aria-labelledby="date-of-birth-label" id="date-of-birth" name="date-of-birth" autocomplete="off" required={dobReq}/>
            </div>
        )}

        {telephoneVisible && (
            <div>
                <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
                <TextInput id="phone-number" name="phone-number" type="text" autocomplete="off" required={telephoneReq}/>
            </div>
        )}

        {partyVisible && (
            <div>
                <Label htmlFor="political-party">Choice of Party</Label>
                <TextInput id="political-party" name="political party" type="text" autocomplete="off" required={partyReq}/>
            </div>
        )}

        {raceVisible && (
            <div>
                <Label htmlFor="race-ethic-group-select">Race</Label>
                <Dropdown id="race-ethic-group-select" name="race-ethic-group-select" autocomplete="off" required={raceReq}>
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
        </>
    );
}

export default PersonalInfo;
