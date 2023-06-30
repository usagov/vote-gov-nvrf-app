// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker, Address } from '@trussworks/react-uswds';
import React, { useState } from "react";
import PersonalInfo from "./FormSections/PersonalInfo";
import Addresses from "./FormSections/Addresses"
import content from "../data/step-four.json";
import Identification from './FormSections/Identification';

function StepFour(props) {
     {/* functions/variables code goes here */}

    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 3 && setStep(step + 1);
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
        />

    const addressSection =
        <Addresses
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
        />

    const identificationSection =
        <Identification
            state={props.state}
            stateData={props.stateData}
            registrationPath={props.registrationPath}
        />
    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <h1>{content.main_heading}</h1>
        <p>{content.intro_text}</p>

        <Form onSubmit={(e) => {handleSubmit(e)}}>
            {step === 1 && personalInfoSection}
            {step === 2 && addressSection}
            {step === 3 && identificationSection}

            <div className="button-container" style={{ margin:'20px' }}>
                {(step > 1 ) && (
                    <Button
                        type="button"
                        onClick={handlePrev}>
                        Previous
                    </Button>
                )}
                {(step < 3) && (
                    <Button
                        type="button"
                        onClick={(e) => {{handleNext()}; props.getFormStep(step)
                    }}>
                        Next
                    </Button>
                )}
                {(step === 3) && (
                    <Button outline type="submit" onClick={(e) => props.getFormStep(step)}>
                        Confirm your information
                    </Button>
                )}
            </div>
        </Form>
        </>
    );
}

export default StepFour;