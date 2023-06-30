import { useState } from 'react';
import { Button } from '@trussworks/react-uswds';

function StepThree(props) {
    const [buttonOneStyle, setbuttonOneStyle] = useState(true)
    const [buttonTwoStyle, setbuttonTwoStyle] = useState(true)
    const [buttonSelected, setButtonSelected] = useState()

    // const styleOne = buttonSelected === 'update' ? true : false;
    // const styleTwo = buttonSelected === 'new' ? true : false;

    const handleClick = (id) => {
        if (id === 'update') {
            // setbuttonOneStyle(true);
            // setbuttonTwoStyle(false);
            setButtonSelected('update')
        } else if (id === 'new') {
            // setbuttonTwoStyle(true);
            // setbuttonOneStyle(false);
            setButtonSelected('new')
        }
    }

    return (
        <>
        <h1>Let’s get started with your {props.stateData.name} voting registration</h1>
        <p>Choose your path to update your registration or to begin a new registration. You’ll be taken to a digital registration form to answer a few questions. This form should take you between 5 to 10 minutes.</p>
        <h2>Select one of the options below to continue.</h2>
        <p>Use this path to update your registration information due to a change of name or change of address, or to register with a political party. </p>
        <Button id="update" onClick={e => {{props.getRegPath(e.target.id)}; handleClick(e.target.id);}} outline={buttonSelected === 'update' ? false : true}>
            I'd like to update my registration
        </Button>
        <p>Use this path to register for the first time or to register in a new state. As a first time voter in your location, you are legally required to show proof of identification when you first vote. We recommend you have a driver’s license or non-driver identification number available for registration.</p>
        <Button id="new" onClick={e => {{props.getRegPath(e.target.id)}; handleClick(e.target.id);}} outline={buttonSelected === 'new' ? false : true}>
            I'd like to register for the first time
        </Button>
        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext}>
            Continue to the digital form
            </Button>
        </div>
        </>
    );
}

export default StepThree;