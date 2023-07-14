import { Button } from '@trussworks/react-uswds';
import React, { useState } from "react";
import Email from "../DeliveryOptions/Email";
import Print from "../DeliveryOptions/Print";
import content from "../../data/registration-form.json";
import CardSelect from '../CardSelect';

function DeliveryOptions(props){
    const [buttonSelected, setButtonSelected] = useState('email')

    const handleClick = (deliveryType) => {
        if (deliveryType === 'email') {
            setButtonSelected('email')
        } else if (deliveryType === 'print') {
            setButtonSelected('print')
        }
    }

    return (
        <>
        <h2>You're Almost Done!</h2>
        <p>You can generate a printable document (.pdf) of your completed form and print now, or have a printable document sent to your email address to print later.</p>

        <h3>Select one of the options below to continue.</h3>
        <div onClick={() => {handleClick('email')}}>
        <CardSelect 
            iconPath={"/images/email-print-mail.svg"}
            text={"Email, print, and mail"} 
            cardStyle={buttonSelected === 'email' ? 'card-selected' : 'card'}
        />
        </div >
        <div onClick={() => {handleClick('print')}}>
        <CardSelect 
            iconPath={"/images/email-print-mail.svg"}
            text={"Print"} 
            cardStyle={buttonSelected === 'print' ? 'card-selected' : 'card'}
        />
        </div >

        {buttonSelected === 'email' &&
            <Email
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {buttonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }

        {buttonSelected === 'print' &&
            <Print
                state={props.state}
                stateData={props.stateData}
                fieldData={props.fieldData}
                saveFieldData = {props.saveFieldData}
                deliveryOption = {buttonSelected}
                handleNext={props.handleNext}
                buttonDisabled={props.buttonDisabled}
            />
        }
        <Button type="submit" onClick={props.handleNext}>
            {buttonSelected === 'email' ? 'Send Form to My Email Address' : 'Print'}
        </Button>
        </>
    );
}

export default DeliveryOptions;