import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import StateSelector from '../StateSelector';
import React, { useState } from "react";
import states from "../../data/states.json";
import content from "../../data/step-four.json";

function Addresses(props){
    const changeRegistrationVisible = (props.registrationPath === 'update') ? true : false;
    const stateFieldRequirements = props.stateData.fields_required;
    const stateFieldVisible = props.stateData.fields_visible;

    const addressReq = stateFieldRequirements.address;
    const mailAddressReq = stateFieldRequirements.mailing_address;
    const addressVisible = stateFieldVisible.address;
    const mailAddressVisible = stateFieldVisible.mailing_address;

    //Previous address fields controls
    const [hasPreviousAddress, setHasPreviousAddress] = useState(false);
    const onChangePreviousAddressCheckbox = (e) => {
        setHasPreviousAddress(e.target.checked);
    }

    const [previousAddress, setPreviousAddress] = useState("");
    const onChangePreviousAddress = (e) => {
        setPreviousAddress(e.target.value);
    }

    //Mail address fields controls
    const [hasMailAddress, setHasMailAddress] = useState(false);
    const onChangeMailAddressCheckbox = (e) => {
        setHasMailAddress(e.target.checked);
    }

    const [mailAddress, setMailAddress] = useState("");
    const onChangeMailAddress = (e) => {
        setMailAddress(e.target.value);
    }

    //states list
    const statesList = []
    for (let i = 0; i < states.length; i++) {
        let stateName = states[i].name;
        statesList.push(stateName);
    };

    return (
        <>
        <Button
            type="button"
            onClick={props.handlePrev}>
            Back to personal information
        </Button>
        <h2>{content.address_heading}</h2>
        {addressVisible && (
            <div>
                <h4>{content.home_address_heading}</h4>
                <Label htmlFor="street-address">Street Address</Label>
                <TextInput id="street-address" name="street-address" type="text" autoComplete="off" required={addressReq}/>

                <Label htmlFor="apt-num">Apartment or Lot #</Label>
                <TextInput id="apt-num" name="apt-num" type="text" autoComplete="off"/>

                <Label htmlFor="city">City</Label>
                <TextInput id="city" name="city" type="text" autoComplete="off" required={addressReq}/>

                <Label>State</Label>
                <StateSelector id="state" statesList={statesList} autoComplete="off" required={addressReq}/>

                <Label htmlFor="zipcode">Zip Code (123456)</Label>
                <TextInput id="zipcode" name="zip-code" type="text" autoComplete="off" required={addressReq}/>

                { changeRegistrationVisible && (
                    <div>
                        <Checkbox id="prev-res-addr" name="prev-res-addr" checked={hasPreviousAddress} onChange={onChangePreviousAddressCheckbox} label="I have a previous residential address." />
                        {hasPreviousAddress && (
                            <div value={previousAddress} onChange={onChangePreviousAddress}>
                                <h3>{content.previous_address_heading}</h3>
                                <Label htmlFor="street-address-3">Street Address</Label>
                                <TextInput id="street-address-3" name="street-address-3" type="text" autoComplete="off" required={addressReq}/>

                                <Label htmlFor="apt-num-3">Apartment of Lot #</Label>
                                <TextInput id="apt-num-3" name="apt-num-3" type="text" autoComplete="off"/>

                                <Label htmlFor="city-3">City</Label>
                                <TextInput id="city-3" name="city-3" type="text" autoComplete="off" required={addressReq}/>

                                <Label>State</Label>
                                <StateSelector id="state-3" statesList={statesList} autoComplete="off" required={addressReq}/>

                                <Label htmlFor="zipcode-3">Zipcode (123456)</Label>
                                <TextInput id="zipcode-3" name="zip-code-3" type="text" autoComplete="off" required={addressReq}/>
                            </div>
                        )}
                        <Checkbox id="alt-mail-addr" name="alt-mail-addr" checked={hasMailAddress} onChange={onChangeMailAddressCheckbox} label="I get my mail at a different address from the one above." />
                        {hasMailAddress && (
                            <div value={mailAddress} onChange={onChangeMailAddress}>
                                <h3>{content.mail_address_heading}</h3>
                                <Label htmlFor="street-address-2">Street Address</Label>
                                <TextInput id="street-address-2" name="street-address-2" type="text" autoComplete="off" required={addressReq}/>

                                <Label htmlFor="apt-num-2">Apartment of Lot #</Label>
                                <TextInput id="apt-num-2" name="apt-num-2" type="text" autoComplete="off"/>

                                <Label htmlFor="city-2">City</Label>
                                <TextInput id="city-2" name="city-2" type="text" autoComplete="off" required={addressReq}/>

                                <Label>State</Label>
                                <StateSelector id="state-2" statesList={statesList} autoComplete="off" required={addressReq}/>

                                <Label htmlFor="zipcode-2">Zipcode (123456)</Label>
                                <TextInput id="zipcode-2" name="zip-code-2" type="text" autoComplete="off" required={addressReq}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}
            <Button
                type="button"
                onClick={props.handleNext}>
                Continue to identification
            </Button>
        </>
    );
}

export default Addresses;