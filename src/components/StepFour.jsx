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
    //Field data controls
    const [fieldData, setFieldData] = useState({
        title:'', first_name: '', middle_name: '', last_name: '', suffix:'',
        prev_name_check: false, prev_title:'', prev_first_name: '', prev_middle_name: '', prev_last_name: '', prev_suffix:'',
        date_of_birth:'', phone_number:'',race:'',
        street_address:'', apt_num:'', city:'', state:'', zip_code:'',
        prev_address_check: false, prev_street_address:'', prev_apt_num:'', prev_city:'', prev_state:'', prev_zip_code:'',
        mail_address_check: false, mail_street_address:'', mail_apt_num:'', mail_city:'', mail_state:'', mail_zip_code:'',
        id_number:'', id_issue_date:'', id_expire_date:'', party_choice:''});

    const saveFieldData = (name) => {
        return (event) => {
        setFieldData({ ...fieldData, [name]: event.target.value });
        };
    };

    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 6 && setStep(step + 1);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }

    const handlePrev = () => {
        step != 1 && setStep(step - 1);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
            registrationPath={props.registrationPath}
            handlePrev={props.handlePrev}
            handleNext={handleNext}
        />

    const addressSection =
        <Addresses
            state={props.state}
            stateData={props.stateData}
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const identificationSection =
        <Identification
            state={props.state}
            stateData={props.stateData}
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const politicalPartySection =
        <PoliticalParty
            state={props.state}
            stateData={props.stateData}
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />

    const confirmationSection =
        <Confirmation
            state={props.state}
            stateData={props.stateData}
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
            registrationPath={props.registrationPath}
            handlePrev={handlePrev}
            handleNext={handleNext}
        />
    const deliverySection =
        <DeliveryOptions
            state={props.state}
            stateData={props.stateData}
            fieldData={fieldData}
            saveFieldData = {saveFieldData}
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