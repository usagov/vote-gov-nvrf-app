import { useState } from 'react';
import { Button, Radio } from '@trussworks/react-uswds';

function Online(props) {

    const handleRadio = () => {
        console.log('add validation functionality here')
    }

    return (
        <>
        <h1>Here's what you need to know about voting in {props.state}</h1>
        <h2>Eligibility requirements</h2>

        <p>To register in {props.state} you must:</p>
        <ul style={{ listStyleType:'disc' }}>
            <li>be a citizen of the United States</li>
            <li>be at least 18 years old within 90</li>
            <li>days of completing this registration</li>
            <li>be a resident of {props.state}</li>
            <li>not be a convicted felon (unless unconditionally discharged)</li>
            <li>not be registered to vote in another State</li>
        </ul>

        <h2>Voter registration deadlines</h2>
        <ul style={{ listStyleType:'disc' }}>
            <li>Online registration deadline: 30 days before Election Day</li>
            <li>Register by mail deadline: Must be postmarked 30 days before Election Day</li>
            <li>In person registration deadline: 30 days before Election Day</li>
        </ul>

        <h2>Online voter registration</h2>
        <p>{props.state} residents that meet the eligibility requirements listed above may be able to register online. You must have a valid {props.state} driver's license or state ID card and the information you enter when registering must match the information on your Division of Motor Vehicles (DMV) record. If you do not have a valid {props.state} driver's license or state ID (identification), or your information cannot be validated, you may select to register using a paper registration form.</p>

        <h2>Mail-in registration form</h2>
        <p>If you do not have one of these forms of identification, you may fill out the National Voter Registration Form here on Vote.gov, then print and mail in your application.</p>

        <h3>Confirm eligibility</h3>

        I am a U.S citizen 
        <form>
        <Radio id="yes-citizen" name="input-radio" label="Yes" onClick={e => handleRadio(e.target.id)}/>
        <Radio id="no-citizen" name="input-radio" label="No" onClick={e => handleRadio(e.target.id)} />            
        </form>

        I will be at least 18 years old by any election 
        <form>
        <Radio id="yes-age" name="input-radio" label="Yes" onClick={e => handleRadio(e.target.id)} />
        <Radio id="no-age" name="input-radio" label="No" onClick={e => handleRadio(e.target.id)} />            
        </form>


        <p>If you checked "No" in response to either of these questions, do not continue with registration on Vote.gov.</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <a href="">
                <Button type="button">
                Go to state online registration
                </Button>
            </a>
        </div>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext}>
            Start your registration on Vote.gov
            </Button>
        </div>
        </>
    );
}

export default Online;