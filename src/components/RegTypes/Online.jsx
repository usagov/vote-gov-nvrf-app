import { useState, useEffect } from 'react';
import { Button, Radio, Icon } from '@trussworks/react-uswds';
import data from "../../data/step-two.json";

function Online(props) {
    const content = data.online;
    const stateLink = props.stateData.election_website_url;

    return (
        <>
        <h1>{content.main_heading}</h1>
        <h2>{content.heading_one}</h2>

        <p>{content.heading_two}</p>
        <ul style={{ listStyleType:'disc' }}>
            <li>be a citizen of the United States</li>
            <li>be at least 18 years old within 90</li>
            <li>days of completing this registration</li>
            <li>be a resident of {props.state}</li>
            <li>not be a convicted felon (unless unconditionally discharged)</li>
            <li>not be registered to vote in another State</li>
        </ul>

        <h2>{content.heading_three}</h2>
        <ul style={{ listStyleType:'disc' }}>
            <li>Online registration deadline: 30 days before Election Day</li>
            <li>Register by mail deadline: Must be postmarked 30 days before Election Day</li>
            <li>In person registration deadline: 30 days before Election Day</li>
        </ul>

        <h2>{content.heading_four}</h2>
        <p>{props.state} residents that meet the eligibility requirements listed above may be able to register online. You must have a valid {props.state} driver's license or state ID card and the information you enter when registering must match the information on your Division of Motor Vehicles (DMV) record. If you do not have a valid {props.state} driver's license or state ID (identification), or your information cannot be validated, you may select to register using a paper registration form.</p>

        <h2>{content.heading_five}</h2>
        <p>{content.paragraph_five}</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <a href={stateLink} target="_blank">
                <Button type="button">
                Go to state online registration
                <Icon.Launch/>
                </Button>
            </a>
        </div>

        <h3>{content.heading_six}</h3>

        <p>I am a U.S citizen </p>
        <form>
        <Radio 
            id="yes-citizen" 
            name="input-radio" 
            label="Yes" 
            onClick={e => props.handleRadio(e.target.id)} 
            checked={props.radioValid.citizen === true ? true : false}
        />
        <Radio 
            id="no-citizen" 
            name="input-radio" 
            label="No" 
            onClick={e => props.handleRadio(e.target.id)}
        />            
        </form>

        <p>I will be at least 18 years old by any election </p>
        <form>
        <Radio 
            id="yes-age" 
            name="input-radio" 
            label="Yes" 
            onClick={e => props.handleRadio(e.target.id)} 
            checked={props.radioValid.age === true ? true : false}
        />
        <Radio 
            id="no-age" 
            name="input-radio" 
            label="No" 
            onClick={e => props.handleRadio(e.target.id)} 
        />            
        </form>

        <p>If you checked "No" in response to either of these questions, do not continue with registration on Vote.gov.</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext} disabled={props.buttonDisabled ? false : true}>
            Start your online registration on Vote.gov
            </Button>
        </div>
        </>
    );
}

export default Online;