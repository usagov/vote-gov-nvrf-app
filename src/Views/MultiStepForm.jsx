import {Form} from '@trussworks/react-uswds';
import {useContext, useState, useEffect} from "react";
import { DataContext } from 'Context/DataProvider';
import {Helmet} from "react-helmet-async";
import ProgressBar from 'Components/ProgressBar';
import PersonalInfo from "Views/FormPages/PersonalInfo";
import Addresses from "Views/FormPages/Addresses"
import Identification from 'Views/FormPages/Identification';
import Confirmation from 'Views/FormPages/Confirmation';
import Delivery from 'Views/FormPages/Delivery';
import PoliticalParty from 'Views/FormPages/PoliticalParty';
import {phoneFormat, focusError} from 'Utils/ValidateField';
import BackButton from 'Components/Buttons/BackButton'
import NextButton from 'Components/Buttons/NextButton';
import {sanitizeDOM} from "Utils/JsonHelper";

function MultiStepForm(props) {
  const { pageContent, stateContent, statesContent, stringContent, fieldContent, stepContent } = useContext(DataContext);
  const mainContent = pageContent.data.find(item => item.uuid === "2c597df4-53b6-4ef5-8301-7817b04e1099");
  const mainContentTitle = sanitizeDOM(mainContent.title);
  const mainContentBody = sanitizeDOM(mainContent.body);

  const scrollToTop = document.getElementById('scroll-to-top');
  const lang = document.documentElement.lang;

  //Analytics values - do not change or translate
  const analyticsLabels = {
    stepLabel1: "Personal information page",
    stepLabel2: "Address and location page",
    stepLabel3: "Identification page",
    stepLabel4: "Political party page",
    stepLabel5: "Confirmation page",
    stepLabel6: "PDF Delivery page",
  }
  //Field data controls
  const [fieldData, setFieldData] = useState({
    current_title: '',
    current_first_name: '',
    current_middle_names: '',
    current_last_name: '',
    current_suffix: '',
    prev_title: '',
    prev_first_name: '',
    prev_middle_names: '',
    prev_last_name: '',
    prev_suffix: '',
    date_of_birth_month: '',
    date_of_birth_day: '',
    date_of_birth_year: '',
    phone_number: '',
    race_ethnic_group: '',
    current_street_address: '',
    current_apt_number: '',
    current_city: '',
    current_state: '',
    current_zip_code: '',
    prev_street_address: '',
    prev_apt_number: '',
    prev_city: '',
    prev_state: '',
    prev_zip_code: '',
    mail_street_address: '',
    mail_apt_number: '',
    mail_city: '',
    mail_state: '',
    mail_zip_code: '',
    id_number: '',
    ssn_number: '',
    party_choice: ''
  });
  const [hasData, setHasData] = useState(false)

  const saveFieldData = (name) => {
    return (event) => {
      event.target.value.length > 0 && setHasData(true)
      if (name === 'phone_number') {
        setFieldData({...fieldData, [name]: phoneFormat(event.target.value)});
      } else {
        setFieldData({...fieldData, [name]: event.target.value});
      }
    };
  };

  const dateFormat = (e, name) => {
    if (e.target.value.length === 0) {
      setFieldData({...fieldData, [name]: ''})
    } else if (e.target.value.length === 1) {
      let newValue = 0 + e.target.value;
      setFieldData({...fieldData, [name]: newValue})
      e.target.setCustomValidity('');
    } else if (e.target.value.length === 2) {
      setFieldData({...fieldData, [name]: e.target.value})
    }
  }


  // Sets up prompt that if user hits browser back/refresh button and has entered any data will alert that data will be lost
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    if (hasData !== false) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasData]);


  //Multiple step NVRF controls
  const [step, setStep] = useState(1);

  const setStepFocus = () => {
    scrollToTop.focus();
    scrollToTop.scrollIntoView({behavior: "instant"});
  }

  const handleNext = () => {
    step !== 6 && setStep(step + 1);
    step !== 6 && setStepFocus();
  }

  const handlePrev = () => {
    step !== 1 && setStep(step - 1);
    setStepFocus();
    step === 1 && props.handlePrev();
  }

  const handleGoBackSteps = (numSteps) => {
    return () => {
      step !== 1 && setStep(step - numSteps);
      setStepFocus();
    }
  }

  const pushPageTitleDataLayer = (title) => {
    dataLayer.push({'NVRF_page_title': title, 'event': 'NVRF_STEP_SUBMIT'});
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
  //Personal Info
  const [hasPreviousName, setPreviousName] = useState(false);
  const onChangePreviousName = (e) => {
    setPreviousName(e.target.checked);
    //clear prev name form data when box is unchecked
    !e.target.checked && setFieldData({
      ...fieldData,
      prev_title: '',
      prev_first_name: '',
      prev_middle_names: '',
      prev_last_name: '',
      prev_suffix: '',
    })
  }

  //Addresses
  const [hasNoAddress, setHasNoAddress] = useState(false);
  const [hasMailAddress, setHasMailAddress] = useState(false);
  const onChangeMailAddressCheckbox = (e) => {
    setHasMailAddress(e.target.checked);
    !e.target.checked && setFieldData({
      ...fieldData,
      mail_street_address: '',
      mail_apt_number: '',
      mail_city: '',
      mail_state: '',
      mail_zip_code: ''
    })
  }

  const hasNoAddressCheckbox = (e) => {
    setHasNoAddress(e.target.checked);
    setFieldData({
      ...fieldData,
      current_street_address: '', current_apt_number: '', current_city: '', current_state: '', current_zip_code: ''
    })

    if (!e.target.checked && document.getElementById("alt-mail-addr")) {
      if (!hasMailAddress) {
        setFieldData({
          ...fieldData,
          mail_street_address: '',
          mail_apt_number: '',
          mail_city: '',
          mail_state: '',
          mail_zip_code: ''
        })
      }
    }
  }

  const [hasPreviousAddress, setHasPreviousAddress] = useState(false);
  const onChangePreviousAddressCheckbox = (e) => {
    setHasPreviousAddress(e.target.checked);
    !e.target.checked && setFieldData({
      ...fieldData,
      prev_street_address: '',
      prev_apt_number: '',
      prev_city: '',
      prev_state: '',
      prev_zip_code: ''
    })
  }

  //Identification
  const [idType, setIdType] = useState('');
  const saveIdType = (e) => {
    setIdType(e.target.value)
    e.target.value === 'none' ?
      setFieldData({
        ...fieldData,
        id_number: 'none',
        ssn_number: '',
      })
      :
      setFieldData({
        ...fieldData,
        id_number: '',
        ssn_number: '',
      })
    document.getElementById('state-id').className = "";
    dataLayer.push({'NVRF_id_type': e.target.value, 'event': "NVRF_SELECT_ID"});
  }

  const [hasNoID, setHasNoID] = useState(false);
  const onChangeHasNoIdCheckbox = (e) => {
    setHasNoID(e.target.checked);
    setFieldData({
      ...fieldData,
      id_number: '', ssn_number: ''
    })
    if (e.target.checked) {
      setIdType("none");
    } else {
      setIdType("");
    }
  }

  //Acknowledgment field controls
  const [hasAcknowledged, setHasAcknowledged] = useState(null);
  const acknowledgeCheckbox = (checkStatus) => {
    setHasAcknowledged(checkStatus);
  }

  const backButtonText = (step) => {
    switch (step) {
      case 1:
        return stepContent.personal.back_button_label;
      case 2:
        return stepContent.address.back_button_label;
      case 3:
        return stepContent.identification.back_button_label;
      case 4:
        return stepContent.party.back_button_label;
      case 5:
        return stepContent.confirmation.back_button_label;
    }
  }

  const nextButtonText = (step) => {
    switch (step) {
      case 1:
        return stepContent.personal.next_button_label;
      case 2:
        return stepContent.address.next_button_label;
      case 3:
        return stepContent.identification.next_button_label;
      case 4:
        return stepContent.party.next_button_label;
      case 5:
        return stepContent.confirmation.next_button_label;
    }
  }

  const statesList = []
  for (let i = 0; i < statesContent.data.length; i++) {
    let stateName = statesContent.data[i].name;
    statesList.push(stateName);
  }

  return (
    <>
      {step != 6 && <BackButton type={'button'}
                                data-analytics="backBtn" onClick={handlePrev}
                                text={backButtonText(step)}/>}

      <ProgressBar step={step} steps={stepContent}
                   handleGoBack={handleGoBackSteps} setStep={setStep}/>
      <div className={'margin-top-8 maxw-tablet margin-x-auto'}>
        {step < 5 &&
          <>
            <h1>{mainContentTitle.replace("@state_name", stateContent.data.name)}</h1>
            <div dangerouslySetInnerHTML={{__html: mainContentBody}}/>
          </>
        }

        <Form autoComplete="off" id="nvrf" className={'margin-top-5'}
              style={{maxWidth: 'none'}}
              onSubmit={(e) => {
                handleSubmit(e), handleNext(),
                  pushPageTitleDataLayer(analyticsLabels["stepLabel" + step])
              }}
        >
          {step === 1 &&
            <PersonalInfo
              stateData={stateContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              dateFormat={dateFormat}
              registrationPath={props.registrationPath}
              previousName={hasPreviousName}
              onChangePreviousName={onChangePreviousName}
              handlePrev={props.handlePrev}
              content={pageContent.data}
              fieldContent={fieldContent.data}
              step={stringContent.data.step.find(item => item.step_id === 'personal')}
            />
          }
          {step === 2 &&
            <Addresses
              statesList={statesList}
              stateData={stateContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              registrationPath={props.registrationPath}
              handlePrev={handlePrev}
              hasNoAddress={hasNoAddress}
              hasNoAddressCheckbox={hasNoAddressCheckbox}
              hasPreviousAddress={hasPreviousAddress}
              onChangePreviousAddressCheckbox={onChangePreviousAddressCheckbox}
              hasMailAddress={hasMailAddress}
              onChangeMailAddressCheckbox={onChangeMailAddressCheckbox}
              content={pageContent.data}
              fieldContent={fieldContent.data}
              step={stringContent.data.step.find(item => item.step_id === 'address')}
            />
          }
          {step === 3 &&
            <Identification
              stateData={stateContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              dateFormat={dateFormat}
              registrationPath={props.registrationPath}
              handlePrev={handlePrev}
              saveIdType={saveIdType}
              onChangeHasNoIdCheckbox={onChangeHasNoIdCheckbox}
              hasNoID={hasNoID}
              idType={idType}
              content={pageContent.data}
              fieldContent={fieldContent.data}
              step={stringContent.data.step.find(item => item.step_id === 'identification')}
            />
          }
          {step === 4 &&
            <PoliticalParty
              stateData={stateContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              registrationPath={props.registrationPath}
              handlePrev={handlePrev}
              content={pageContent.data}
              fieldContent={fieldContent.data}
              step={stringContent.data.step.find(item => item.step_id === 'party')}
            />
          }
          {step === 5 &&
            <Confirmation
              stateData={stateContent.data}
              content={pageContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              registrationPath={props.registrationPath}
              handlePrev={handlePrev}
              handleGoBackSteps={handleGoBackSteps}
              hasAcknowledged={hasAcknowledged}
              acknowledgeCheckbox={acknowledgeCheckbox}
              fieldContent={fieldContent.data}
              strings={stringContent.data}
              steps={stepContent}
            />
          }
          {step === 6 &&
            <Delivery
              stateData={stateContent.data}
              content={pageContent.data}
              fieldData={fieldData}
              saveFieldData={saveFieldData}
              registrationPath={props.registrationPath}
              handlePrev={handlePrev}
              deliveryButtonSelected={deliveryButtonSelected}
              handleClickDeliveryButton={handleClickDeliveryButton}
              strings={stringContent.data}
            />
          }

          {step != 6 && (
            <NextButton type={'submit'}
                        onClick={() => {
                          focusError('nvrf')
                        }}
                        text={nextButtonText(step)}/>
          )}
        </Form>
        {/* Load Touchpoints feedback form */}
        {step === 6 && lang === 'en' &&
          <>
            <div id="touchpoints-form-embed"></div>
            <Helmet>
              <script
                src="https://touchpoints.app.cloud.gov/touchpoints/4da46508.js"
                async></script>
            </Helmet>
          </>
        }
      </div>
    </>
  );
}

export default MultiStepForm;