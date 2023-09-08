import { Form } from '@trussworks/react-uswds';
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
import { phoneFormat } from './FormSections/ValidateField';

function MultiStepForm(props) {
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
        if (name === 'phone_number') {
            setFieldData({ ...fieldData, [name]: phoneFormat(event.target.value) });
        } else {
            setFieldData({ ...fieldData, [name]: event.target.value });
        }
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
    }

    //Email and Print controls
    const [deliveryButtonSelected, setDeliveryButtonSelected] = useState('email')

    const handleClickDeliveryButton = (deliveryType) => {
        if (deliveryType === 'email') {
            setDeliveryButtonSelected('email')
        } else if (deliveryType === 'print') {
            setDeliveryButtonSelected('print')
        }
    }

    //Form Sections controls//
        //Addresses
    const [hasNoAddress, setHasNoAddress] = useState(false);
    const hasNoAddressCheckbox = (e) => {
        setHasNoAddress(e.target.checked);
        //clear any address form data when check is true
        e.target.checked && setFieldData({ 
            ...fieldData, 
            street_address:'', apt_num:'', city:'', state:'', zip_code:'',
            prev_address_check: false, prev_street_address:'', prev_apt_num:'', prev_city:'', prev_state:'', prev_zip_code:'',
            mail_address_check: false, mail_street_address:'', mail_apt_num:'', mail_city:'', mail_state:'', mail_zip_code:''
        })
    }

    const [hasPreviousAddress, setHasPreviousAddress] = useState(false);
    const onChangePreviousAddressCheckbox = (e) => {
        setHasPreviousAddress(e.target.checked);
    }

    const [previousAddress, setPreviousAddress] = useState("");
    const onChangePreviousAddress = (e) => {
        setPreviousAddress(e.target.value);
    }

    const [hasMailAddress, setHasMailAddress] = useState(false);
    const onChangeMailAddressCheckbox = (e) => {
        setHasMailAddress(e.target.checked);
    }

    const [mailAddress, setMailAddress] = useState("");
    const onChangeMailAddress = (e) => {
        setMailAddress(e.target.value);
    }

        //Identification
    const [idType, setIdType] = useState('')
    const saveIdType = (e) => {
        setIdType(e.target.value)
        e.target.value === 'none' ? setFieldData({ ...fieldData, id_number: 'none' }) : setFieldData({ ...fieldData, id_number: '' });
    }

    return (
        <>
        <ProgressBar step={step}/>
        {step != 7 &&
        <div>
            <h1>{content.main_heading}: {props.stateData.name}</h1>
            <p>{content.intro_text}</p>
        </div>
        }

        <Form autoComplete="off" style={{ maxWidth:'none' }} onSubmit={(e) => {handleSubmit(e), handleNext()}}>
            {step === 1 &&
                <PersonalInfo
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={props.handlePrev}
                />
            }
            {step === 2 &&
                <Addresses
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                hasNoAddress={hasNoAddress}
                hasNoAddressCheckbox={hasNoAddressCheckbox}
                hasPreviousAddress={hasPreviousAddress}
                onChangePreviousAddressCheckbox={onChangePreviousAddressCheckbox}
                previousAddress={previousAddress}
                onChangePreviousAddress={onChangePreviousAddress}
                hasMailAddress={hasMailAddress}
                onChangeMailAddressCheckbox={onChangeMailAddressCheckbox}
                mailAddress={mailAddress}
                onChangeMailAddress={onChangeMailAddress}
                />
            }
            {step === 3 &&
                <Identification
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                saveIdType={saveIdType}
                idType={idType}/>
            }
            {step === 4 &&
                <PoliticalParty
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}/>
            }
            {step === 5 &&
                <Confirmation
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}/>
            }
            {step === 6 &&
                <DeliveryOptions
                state={props.state}
                stateData={props.stateData}
                fieldData={fieldData}
                saveFieldData = {saveFieldData}
                registrationPath={props.registrationPath}
                handlePrev={handlePrev}
                deliveryButtonSelected = {deliveryButtonSelected}
                handleClickDeliveryButton = {handleClickDeliveryButton}
                />
            }
        </Form>
        {step === 7 &&
            <SuccessPage
            deliveryButtonSelected = {deliveryButtonSelected}
            state={props.state}
            stateData={props.stateData}
            />
        }
        </>
    );
}

export default MultiStepForm;