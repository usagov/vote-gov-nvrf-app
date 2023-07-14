// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, Label, TextInput, Button, Dropdown,Checkbox, DatePicker, Address } from '@trussworks/react-uswds';
import React, { useState } from "react";
import ProgressBar from './ProgressBar';
import PersonalInfo from "./FormSections/PersonalInfo";
import Addresses from "./FormSections/Addresses"
import content from "../data/registration-form.json";
import Identification from './FormSections/Identification';
import Confirmation from './FormSections/Confirmation';
import DeliveryOptions from "./FormSections/DeliveryOptions";
import PoliticalParty from './FormSections/PoliticalParty';
import SuccessPage from './FormSections/SuccessPage';

function MultiStepForm(props) {
     {/* functions/variables code goes here */}
    //Field data controls
    const [fieldData, setFieldData] = useState({
        title:'', first_name: '', middle_name: '', last_name: '', suffix:'',
        prev_name_check: false, prev_title:'', prev_first_name: '', prev_middle_name: '', prev_last_name: '', prev_suffix:'',
        date_of_birth_month:'', date_of_birth_day:'', date_of_birth_year:'', phone_number:'',race:'',
        street_address:'', apt_num:'', city:'', state:'', zip_code:'',
        prev_address_check: false, prev_street_address:'', prev_apt_num:'', prev_city:'', prev_state:'', prev_zip_code:'',
        mail_address_check: false, mail_street_address:'', mail_apt_num:'', mail_city:'', mail_state:'', mail_zip_code:'',
        id_number:'', id_issue_date_month:'', id_issue_date_day:'', id_issue_date_year:'', id_expire_date_month:'', id_expire_date_day:'', id_expire_date_year:'',
        party_choice:'',
        email_address:'', sms_alert_phone_number:''});

    const saveFieldData = (name) => {
        return (event) => {
        setFieldData({ ...fieldData, [name]: event.target.value });
        };
    };

    //Multiple step NVRF controls
    const [step, setStep] = useState(1);
    const handleNext = () => {
        step != 7 && setStep(step + 1);
        document.getElementById('scroll-to-top').scrollIntoView();
      }

    const handlePrev = () => {
        step != 1 && setStep(step - 1);
        document.getElementById('scroll-to-top').scrollIntoView();
    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log('Submitted!')
    }

    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <ProgressBar step={step}/>
        <h1>{content.main_heading}: {props.stateData.name}</h1>
        <p>{content.StateSelection_text}</p>

        <Form style={{ maxWidth:'none' }} onSubmit={(e) => {handleSubmit(e)}}>
            {step === 1 && 
                <PersonalInfo
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={props.handlePrev}
                handleNext={handleNext}/>
            }
            {step === 2 &&         
                <Addresses
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleNext={handleNext}/>
            }
            {step === 3 &&         
                <Identification
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleNext={handleNext}/>
            }
            {step === 4 &&         
                <PoliticalParty
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleNext={handleNext}
                />
            }
            {step === 5 && 
                <Confirmation
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleNext={handleNext}
                />
            }
            {step === 6 && 
                <DeliveryOptions
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                handleNext={handleNext}
                />
            }
        </Form>
        {step === 7 && 
            <SuccessPage/>
        }
        </>
    );
}

export default MultiStepForm;