import { Button } from '@trussworks/react-uswds';
import React, { useState } from "react";
import Email from "../DeliveryOptions/Email";
import Print from "../DeliveryOptions/Print";
import content from "../../data/registration-form.json";
import CardSelect from '../CardSelect';

function DeliveryOptions(props){

    return (
        <>
        <h2>You're Almost Done!</h2>
        <p>You can generate a printable document (.pdf) of your completed form and print now, or have a printable document sent to your email address to print later.</p>

        <h3>Select one of the options below to continue.</h3>
        <div onClick={() => {props.handleClickDeliveryButton('email')}}>
        <CardSelect
            iconPath={"/images/email-print-mail.svg"}
            text={"Email, print, and mail"}
            cardStyle={props.deliveryButtonSelected === 'email' ? 'card-selected' : 'card'}
        />
        </div >
        <div onClick={() => {props.handleClickDeliveryButton('print')}}>
        <CardSelect
            iconPath={"/images/email-print-mail.svg"}
            text={"Print"}
            cardStyle={props.deliveryButtonSelected === 'print' ? 'card-selected' : 'card'}
        />
        </div >

        {props.deliveryButtonSelected === 'email' &&
            <Email
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {props.deliveryButtonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }

        {props.deliveryButtonSelected === 'print' &&
            <Print
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {props.deliveryButtonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }
        <Button type="submit" onClick={props.handleNext}>
            {props.deliveryButtonSelected === 'email' ? 'Send Form to My Email Address' : 'Print'}
        </Button>
        </>
    );
}

export default DeliveryOptions;