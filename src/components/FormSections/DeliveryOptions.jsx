import { Button } from '@trussworks/react-uswds';
import React, { useState } from "react";
import Email from "../DeliveryOptions/Email";
import Print from "../DeliveryOptions/Print";
import content from "../../data/step-four.json";

function DeliveryOptions(props){
    const [buttonSelected, setButtonSelected] = useState('no selection')

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
            <Button type="button" onClick={() => handleClick('email')}>
                Email, print, and mail
            </Button>
            <Button type="button" onClick={() => handleClick('print')}>
                Print and mail
            </Button>

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
        </>
    );
}

export default DeliveryOptions;