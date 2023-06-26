// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, FormGroup, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import StateSelector from './StateSelector';
import states from "../data/states.json";
import React, { useState } from "react";

function StepFour(props) {
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
    const nameChangeVisible = true;
    const secondAddressVisible = true;
    const stateFieldRequirements = states[0].fields_required;//Georgia - need to pass correct index from step 1
    //Field visibility states
    const nameReq = stateFieldRequirements.name;
    const addressReq = stateFieldRequirements.address;
    const mailAddressReq = stateFieldRequirements.mailing_address;
    const dobReq = stateFieldRequirements.DOB;
    const telephoneReq = stateFieldRequirements.telephone;
    const idNumReq = stateFieldRequirements.idNumReq;
    const partyReq = stateFieldRequirements.party
    const raceReq = stateFieldRequirements.race;
    const acknowledgementReq = stateFieldRequirements.acknowledgement;

    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <Form onSubmit={(e) => {handleSubmit(e)}}>
            <FormGroup>
                <h4>Personal Information</h4>

                { nameReq && (
                    <div>
                        <Label htmlFor="title-select">Title</Label>
                        <Dropdown id="title-select" name="title-select">
                            <option>- Select -{' '}</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                        </Dropdown>

                        <Label htmlFor="first-name">First Name</Label>
                        <TextInput id="first-name" name="first-name" type="text" required/>

                        <Label htmlFor="middle-name">Middle Name</Label>
                        <TextInput id="middle-name" name="middle-name" type="text"/>

                        <Label htmlFor="last-name">Last Name</Label>
                        <TextInput id="last-name" name="last-name" type="text"/>

                        <Label htmlFor="suffix-select">Suffix</Label>
                        <Dropdown id="suffix-select" name="suffix-select">
                            <option>- Select -{' '}</option>
                            <option value="Jr.">Jr.</option>
                            <option value="Sr.">Sr.</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </Dropdown>
                    </div>
                )}

                {
                    nameChangeVisible &&
                    <Checkbox id="legal-name-change" name="legal-name-change" checked={hasPreviousName} onChange={onChangePreviousNameCheckbox} label="I have legally changed my name since the last time I registered to vote." />
                }

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
                        <TextInput id="first-name-2" name="first-name-2" type="text" required/>

                        <Label htmlFor="middle-name-2">Middle Name</Label>
                        <TextInput id="middle-name-2" name="middle-name-2" type="text"/>

                        <Label htmlFor="last-name-2">Last Name</Label>
                        <TextInput id="last-name-2" name="last-name-2" type="text"/>

                        <Label htmlFor="suffix-select-2">Suffix</Label>
                        <Dropdown id="suffix-select-2" name="suffix-select-2">
                            <option>- Select -{' '}</option>
                            <option value="Jr.">Jr.</option>
                            <option value="Sr.">Sr.</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </Dropdown>
                    </div>
                )}

                { dobReq && (
                    <div>
                        <Label htmlFor="date-of-birth" id="date-of-birth-label">Date of Birth</Label>
                        <div className="usa-hint" id="date-of-birth-hint">
                            mm/dd/yyyy
                        </div>
                        <DatePicker aria-describedby="date-of-birth-hint" aria-labelledby="date-of-birth-label" id="date-of-birth" name="date-of-birth"/>
                    </div>
                )}

                { telephoneReq && (
                    <div>
                        <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
                        <TextInput id="phone-number" name="phone-number" type="text" />
                    </div>
                )}

                { partyReq && (
                    <div>
                        <Label htmlFor="political-party">Choice of Party</Label>
                        <TextInput id="political-party" name="political party" type="text" />
                    </div>
                )}

                { raceReq && (
                    <div>
                        <Label htmlFor="race-ethic-group-select">Suffix</Label>
                        <Dropdown id="race-ethic-group-select" name="race-ethic-group-select">
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
            </FormGroup>
            <FormGroup>
                { addressReq && (
                    <div>
                        <h4>Home Address</h4>
                        <Label htmlFor="street-address">Street Address</Label>
                        <TextInput id="street-address" name="street-address" type="text"/>

                        <Label htmlFor="apt-num">Apartment of Lot #</Label>
                        <TextInput id="apt-num" name="apt-num" type="text"/>

                        <Label htmlFor="city">City</Label>
                        <TextInput id="city" name="city" type="text"/>

                        <Label>State</Label>
                        <StateSelector id="state" statesList={props.statesList}/>

                        <Label htmlFor="zipcode">Zipcode (123456)</Label>
                        <TextInput id="zipcode" name="zip-code" type="text"/>

                        <Checkbox id="prev-res-addr" name="prev-res-addr" checked={hasPreviousAddress} onChange={onChangePreviousAddressCheckbox} label="I have a previous residential address." />

                        <Checkbox id="alt-mail-addr" name="alt-mail-addr" checked={hasMailAddress} onChange={onChangeMailAddressCheckbox} label="I get my mail at a different address from the one above." />
                    </div>
                )}

                {(hasPreviousAddress) && (
                    <div value={previousAddress} onChange={onChangePreviousAddress}>
                        <h4>Previous Address</h4>
                        <Label htmlFor="street-address-3">Street Address</Label>
                        <TextInput id="street-address-3" name="street-address-3" type="text"/>

                        <Label htmlFor="apt-num-3">Apartment of Lot #</Label>
                        <TextInput id="apt-num-3" name="apt-num-3" type="text"/>

                        <Label htmlFor="city-3">City</Label>
                        <TextInput id="city-3" name="city-3" type="text"/>

                        <Label>State</Label>
                        <StateSelector id="state-3" statesList={props.statesList}/>

                        <Label htmlFor="zipcode-3">Zipcode (123456)</Label>
                        <TextInput id="zipcode-3" name="zip-code-3" type="text"/>
                    </div>
                )}

                {(hasMailAddress) && (
                    <div value={mailAddress} onChange={onChangeMailAddress}>
                        <h4>Mailing Address</h4>
                        <Label htmlFor="street-address-2">Street Address</Label>
                        <TextInput id="street-address-2" name="street-address-2" type="text"/>

                        <Label htmlFor="apt-num-2">Apartment of Lot #</Label>
                        <TextInput id="apt-num-2" name="apt-num-2" type="text"/>

                        <Label htmlFor="city-2">City</Label>
                        <TextInput id="city-2" name="city-2" type="text"/>

                        <Label>State</Label>
                        <StateSelector id="state-2" statesList={props.statesList}/>

                        <Label htmlFor="zipcode-2">Zipcode (123456)</Label>
                        <TextInput id="zipcode-2" name="zip-code-2" type="text"/>
                    </div>
                )}
            </FormGroup>
            <FormGroup>
                {idNumReq && (
                    <div>
                        <h4>Identification</h4>
                        <Label htmlFor="state-id-num">State Driver's License Number</Label>
                        <TextInput id="state-id-num" name="state-id-num" type="text"/>

                        <Label htmlFor="issue-date" id="issue-date-label">Issue Date</Label>
                        <div className="usa-hint" id="issue-date-hint">
                            mm/dd/yyyy
                        </div>
                        <DatePicker aria-describedby="issue-date-hint" aria-labelledby="issue-date-label" id="issue-date" name="issue-date"/>

                        <Label htmlFor="expire-date" id="expire-date-label">Expire Date</Label>
                        <div className="usa-hint" id="expire-date-hint">
                            mm/dd/yyyy
                        </div>
                        <DatePicker aria-describedby="expire-date-hint" aria-labelledby="expire-date-label" id="expire-date" name="expire-date"/>
                    </div>
                )}
            </FormGroup>

            <Button outline type="submit">
                Confirm your information
            </Button>
        </Form>
        </>
    );
}

export default StepFour;