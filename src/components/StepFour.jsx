// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker, Address } from '@trussworks/react-uswds';
import React, { useState } from "react";
import ProgressBar from './ProgressBar';
import PersonalInfo from "./FormSections/PersonalInfo";
import Addresses from "./FormSections/Addresses"
import content from "../data/step-four.json";
import Identification from './FormSections/Identification';
import Confirmation from './FormSections/Confirmation';
import DeliveryOptions from "./FormSections/DeliveryOptions";
import PoliticalParty from './FormSections/PoliticalParty';

function StepFour(props) {
     {/* functions/variables code goes here */}

    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 6 && setStep(step + 1);
      }

    const handlePrev = () => {
    step != 1 && setStep(step - 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log('Submitted!')
    }

    //Form section variables
    const personalInfoSection =
        <PersonalInfo
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={props.handlePrev}
            handleNext={handleNext}
        />

    const addressSection =
        <Addresses
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const identificationSection =
        <Identification
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const politicalPartySection =
        <PoliticalParty
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const confirmationSection =
        <Confirmation
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />
    const deliverySection =
        <DeliveryOptions
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={props.handleNext}
        />
    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <ProgressBar step={step}/>
        <h1>{content.main_heading}</h1>
        <p>{content.intro_text}</p>

        <Form onSubmit={(e) => {handleSubmit(e)}}>
            {step === 1 && personalInfoSection}
            {step === 2 && addressSection}
            {step === 3 && identificationSection}
            {step === 4 && politicalPartySection}
            {step === 5 && confirmationSection}
            {step === 6 && deliverySection}
        </Form>
        </>
    );
}

export default StepFour;