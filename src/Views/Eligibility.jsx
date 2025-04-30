import { useContext, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {Checkbox, Form, Fieldset} from '@trussworks/react-uswds';
import { DataContext } from 'Context/DataProvider';
import { sanitizeDOM } from 'Utils/JsonHelper';
import {getFieldLabel, getFieldError} from 'Utils/fieldParser';
import {focusError, toggleError} from 'Utils/ValidateField';
import NextButton from "Components/Buttons/NextButton";
import BackButton from 'Components/Buttons/BackButton';

function Eligibility(props) {
  const { pageContent, stateContent, fieldContent, stepContent } = useContext(DataContext);
  const returnPath = document.getElementById('root').getAttribute('data-returnPath');

  const step = stepContent.eligibility;

  const content = pageContent.data.find(item => item.uuid === '94eab1c9-8343-4747-94b4-08732a175614');
  const contentBody = sanitizeDOM(content.body);
  const contentBodyParts = contentBody.split('@reg_confirm_eligibility');

  const eligibility = fieldContent.data.find(item => item.uuid === "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c");
  const eligibilityInstructions = sanitizeDOM(eligibility.instructions);

  //Analytics values - do not change or translate
  const analyticsLabels = {
    eligibilityTitle: "Before you get started page",
  }

  //Confirm eligibility checkbox controls
  const [hasConfirmed, setHasConfirmed] = useState(null);
  const confirmCheckbox = (checkStatus) => {
    setHasConfirmed(checkStatus);
  }

  const mailDeadline = () => (
    <ul>
      <li
        dangerouslySetInnerHTML={{__html: stateContent.data.postmarked_mail_deadline || stateContent.data.received_mail_deadline}}/>
    </ul>
  );

  return (
    <>
      <BackButton link={returnPath} text={step.back_button_label} />
      <div className={'margin-top-5 maxw-tablet margin-x-auto'}>
        <h1>{content.title.replace('@state_name', stateContent.data.name)}</h1>

        <div className={'margin-top-5'} dangerouslySetInnerHTML={{
          __html: contentBodyParts[0].replace('@state_name', stateContent.data.name)
            .replace('@reg_eligibility_desc', stateContent.data.reg_eligibility_desc),
        }}/>

        <Form id="eligibility" autoComplete="off" className={'margin-top-2'}
              style={{maxWidth: 'none'}}
              onSubmit={(e) => {
                e.preventDefault(), props.handleNext(),
                  dataLayer.push({
                    'NVRF_page_title': analyticsLabels.eligibilityTitle,
                    'event': 'NVRF_STEP_SUBMIT'
                  })
              }}>
          <div className="input-parent">
            <Fieldset className="fieldset"
                      onBlur={(e) => toggleError(e, !hasConfirmed)}>
              <legend className={'margin-top-1'}>
                <strong>{eligibility.name}</strong>
              </legend>
              <Checkbox
                data-test="checkbox-eligibility"
                id="eligibility-checkbox"
                name="eligibility-checkbox"
                value="eligibility-checkbox"
                label={getFieldLabel(fieldContent.data, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                aria-required="true"
                aria-describedby="eligibility-checkbox_error"
                required={true}
                defaultChecked={hasConfirmed}
                onChange={(e) => confirmCheckbox(e.target.checked)}
                onInvalid={(e) => e.target.setCustomValidity(' ')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
              <span id="eligibility-checkbox_error" role="alert"
                    className='vote-error-text' data-test="errorText">
                        {getFieldError(fieldContent.data, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                    </span>
            </Fieldset>
          </div>
          <div className={'margin-top-2'}
               dangerouslySetInnerHTML={{__html: eligibilityInstructions}}/>


          <div className={'margin-top-5'} dangerouslySetInnerHTML=
            {{__html: contentBodyParts[1].replace("@state_name", stateContent.data.name).replace("@mail_deadline", renderToStaticMarkup(mailDeadline()))}}/>

          <NextButton
            type={'submit'}
            onClick={(e) => focusError('eligibility')}
            text={step.next_button_label}
          />
        </Form>
      </div>
    </>
  );
}

export default Eligibility;