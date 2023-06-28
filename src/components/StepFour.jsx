// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, FormGroup, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import StateSelector from './StateSelector';
import states from "../data/states.json";
import React, { useState } from "react";

function StepFour(props) {
    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 3 && setStep(step + 1);
      }

      const handlePrev = () => {
        step != 1 && setStep(step - 1);
      }

      const stepProgress = (count) => {
        if (step === count) {
          return "current"
        }
        else if (step > count) {
          return "complete"
        }
        else null
      }

    {/* functions/variables code goes here */}
    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log('Submitted!')
    }

    //Checkbox controls
    //Previous name fields controls
    const [hasPreviousName, setHasPreviousName] = useState(false);
    const onChangePreviousNameCheckbox = (e) => {
        setHasPreviousName(e.target.checked);
    }

    const [previousName, setPreviousName] = useState("");
    const onChangePreviousName = (e) => {
        setPreviousName(e.target.value);
    }

    //Previous address fields controls
    const [hasPreviousAddress, setHasPreviousAddress] = useState(false);
    const onChangePreviousAddressCheckbox = (e) => {
        setHasPreviousAddress(e.target.checked);
    }

    const [previousAddress, setPreviousAddress] = useState("");
    const onChangePreviousAddress = (e) => {
        setPreviousAddress(e.target.value);
    };

    //Mail address fields controls
    const [hasMailAddress, setHasMailAddress] = useState(false);
    const onChangeMailAddressCheckbox = (e) => {
        setHasMailAddress(e.target.checked);
    };

    const [mailAddress, setMailAddress] = useState("");
    const onChangeMailAddress = (e) => {
        setMailAddress(e.target.value);
    };
    //Harcoded variables
    const changeRegistrationVisible = true;
    const stateFieldRequirements = states[0].fields_required;//Alaska - need to pass correct index from step 1
    const stateFieldVisible = states[0].fields_visible;
    //Field requirement states
    const nameReq = stateFieldRequirements.name;
    const addressReq = stateFieldRequirements.address;
    const mailAddressReq = stateFieldRequirements.mailing_address;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneReq = stateFieldRequirements.telephone;
    const idNumReq = stateFieldRequirements.ID_num;
    const partyReq = stateFieldRequirements.party
    const raceReq = stateFieldRequirements.race;
    const acknowledgementReq = stateFieldRequirements.acknowledgement;
    //Field visibility states
    const nameVisible = stateFieldVisible.name;
    const addressVisible = stateFieldVisible.address;
    const mailAddressVisible = stateFieldVisible.mailing_address;
    const dobVisible = stateFieldVisible.DOB;
    const telephoneVisible = stateFieldVisible.telephone;
    const idNumVisible = stateFieldVisible.ID_num;
    const partyVisible = stateFieldVisible.party;
    const raceVisible = stateFieldVisible.race;
    const acknowldgementVisible = stateFieldVisible.acknowledgement;

    console.log(changeRegistrationVisible);

    //Form section variables
    const personalInfoSection =
        <>
        {nameVisible && (
            <div>
                <h4>Personal Information</h4>
                <Label htmlFor="title-select">Title</Label>
                <Dropdown id="title-select" name="title-select">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name">First Name</Label>
                <TextInput id="first-name" name="first-name" type="text" required={nameReq}/>

                <Label htmlFor="middle-name">Middle Name</Label>
                <TextInput id="middle-name" name="middle-name" type="text"/>

                <Label htmlFor="last-name">Last Name</Label>
                <TextInput id="last-name" name="last-name" type="text" required={nameReq}/>

                <Label htmlFor="suffix-select">Suffix</Label>
                <Dropdown id="suffix-select" name="suffix-select" required={nameReq}>
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
                <Dropdown id="title-select-2" name="title-select-2">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name-2">First Name</Label>
                <TextInput id="first-name-2" name="first-name-2" type="text" required={nameReq}/>

                <Label htmlFor="middle-name-2">Middle Name</Label>
                <TextInput id="middle-name-2" name="middle-name-2" type="text" required={nameReq}/>

                <Label htmlFor="last-name-2">Last Name</Label>
                <TextInput id="last-name-2" name="last-name-2" type="text" required={nameReq}/>

                <Label htmlFor="suffix-select-2">Suffix</Label>
                <Dropdown id="suffix-select-2" name="suffix-select-2" required={nameReq}>
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
                <DatePicker aria-describedby="date-of-birth-hint" aria-labelledby="date-of-birth-label" id="date-of-birth" name="date-of-birth" required={dobReq}/>
            </div>
        )}

        {telephoneVisible && (
            <div>
                <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
                <TextInput id="phone-number" name="phone-number" type="text" required={telephoneReq}/>
            </div>
        )}

        {partyVisible && (
            <div>
                <Label htmlFor="political-party">Choice of Party</Label>
                <TextInput id="political-party" name="political party" type="text" required={partyReq}/>
            </div>
        )}

        {raceVisible && (
            <div>
                <Label htmlFor="race-ethic-group-select">Race</Label>
                <Dropdown id="race-ethic-group-select" name="race-ethic-group-select" required={raceReq}>
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

    const addressSection =
        <>
        {addressVisible && (
            <div>
                <h4>Home Address</h4>
                <Label htmlFor="street-address">Street Address</Label>
                <TextInput id="street-address" name="street-address" type="text" required={addressReq}/>

                <Label htmlFor="apt-num">Apartment of Lot #</Label>
                <TextInput id="apt-num" name="apt-num" type="text"/>

                <Label htmlFor="city">City</Label>
                <TextInput id="city" name="city" type="text" required={addressReq}/>

                <Label>State</Label>
                <StateSelector id="state" statesList={props.statesList} required={addressReq}/>

                <Label htmlFor="zipcode">Zipcode (123456)</Label>
                <TextInput id="zipcode" name="zip-code" type="text" required={addressReq}/>

                { changeRegistrationVisible && (
                    <div>
                        <Checkbox id="prev-res-addr" name="prev-res-addr" checked={hasPreviousAddress} onChange={onChangePreviousAddressCheckbox} label="I have a previous residential address." />
                        <Checkbox id="alt-mail-addr" name="alt-mail-addr" checked={hasMailAddress} onChange={onChangeMailAddressCheckbox} label="I get my mail at a different address from the one above." />
                    </div>
                )}
            </div>
        )}

        {hasPreviousAddress && (
            <div value={previousAddress} onChange={onChangePreviousAddress}>
                <h4>Previous Address</h4>
                <Label htmlFor="street-address-3">Street Address</Label>
                <TextInput id="street-address-3" name="street-address-3" type="text" required={addressReq}/>

                <Label htmlFor="apt-num-3">Apartment of Lot #</Label>
                <TextInput id="apt-num-3" name="apt-num-3" type="text"/>

                <Label htmlFor="city-3">City</Label>
                <TextInput id="city-3" name="city-3" type="text" required={addressReq}/>

                <Label>State</Label>
                <StateSelector id="state-3" statesList={props.statesList} required={addressReq}/>

                <Label htmlFor="zipcode-3">Zipcode (123456)</Label>
                <TextInput id="zipcode-3" name="zip-code-3" type="text" required={addressReq}/>
            </div>
        )}

        {hasMailAddress && (
            <div value={mailAddress} onChange={onChangeMailAddress}>
                <h4>Mailing Address</h4>
                <Label htmlFor="street-address-2">Street Address</Label>
                <TextInput id="street-address-2" name="street-address-2" type="text" required={addressReq}/>

                <Label htmlFor="apt-num-2">Apartment of Lot #</Label>
                <TextInput id="apt-num-2" name="apt-num-2" type="text"/>

                <Label htmlFor="city-2">City</Label>
                <TextInput id="city-2" name="city-2" type="text" required={addressReq}/>

                <Label>State</Label>
                <StateSelector id="state-2" statesList={props.statesList} required={addressReq}/>

                <Label htmlFor="zipcode-2">Zipcode (123456)</Label>
                <TextInput id="zipcode-2" name="zip-code-2" type="text" required={addressReq}/>
            </div>
        )}
    </>

    const identificationSection =
        <>
        {idNumVisible && (
            <div>
                <h4>Identification</h4>
                <Label htmlFor="state-id-num">State Driver's License Number</Label>
                <TextInput id="state-id-num" name="state-id-num" type="text" required={idNumReq}/>

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
        </>
    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <Form onSubmit={(e) => {handleSubmit(e)}}>
            {step === 1 && personalInfoSection}
            {step === 2 && addressSection}
            {step === 3 && identificationSection}

            <div className="button-container" style={{ margin:'20px' }}>
                <Button type="button" onClick={handlePrev}>
                    Previous
                </Button>
                {(step < 3) && (
                    <Button type="button" onClick={handleNext}>
                        Next
                    </Button>
                )}
                {(step === 3) && (
                    <Button outline type="submit">
                        Confirm your information
                    </Button>
                )}
            </div>
        </Form>
        </>
    );
}

export default StepFour;