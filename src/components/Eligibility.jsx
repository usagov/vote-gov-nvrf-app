import {Checkbox, Label, Form} from '@trussworks/react-uswds';
import BackButton from './BackButton';
import NextButton from "./NextButton";
import StepsList from './RegType/StepsList';
import { getFieldLabel, getFieldError } from './HelperFunctions/fieldParser';
import { renderToStaticMarkup } from "react-dom/server";
import { sanitizeDOM } from "./HelperFunctions/JsonHelper";
import { focusError, toggleError } from './HelperFunctions/ValidateField';

function Eligibility(props) {
    let content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;
    const stringContent = props.stringContent;
    const fields = props.fieldContent;
    const cards = props.cards;

    content = content.find(item => item.uuid === "94eab1c9-8343-4747-94b4-08732a175614");
    const eligibility = fields.find(item => item.uuid === "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c");
    const listContent = cards.find(item => item.uuid === "33a9859d-a62c-4f8e-9e92-5a70f529b62a");
    const contentBody = sanitizeDOM(content.body);
    const contentBodyParts = contentBody.split("@reg_confirm_eligibility");
    const eligibilityInstructions = sanitizeDOM(eligibility.instructions);

    const mailDeadline = () => (
        <ul>
            <li>{stateContent.postmarked_mail_deadline || stateContent.received_mail_deadline}</li>
        </ul>
    );

    return (
        <>
            <BackButton stringContent={stringContent} type={'button'} onClick={props.handlePrev} text={navContent.back.state_reg_options}/>
            <div className={'usa-prose margin-top-5 maxw-tablet margin-x-auto'}>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <StepsList content={listContent}/>

            <div className={'usa-prose margin-top-5'} dangerouslySetInnerHTML= {{__html: contentBodyParts[0].replace("@state_name", stateContent.name)
                    .replace("@reg_eligibility_desc", stateContent.reg_eligibility_desc)}}/>

            <Form id="eligibility" autoComplete="off" className={'margin-top-2'} style={{ maxWidth:'none' }} onSubmit={(e) => {e.preventDefault(), props.handleNext()}}>
                    <div data-test="checkBox" className="input-parent">
                        <Label htmlFor="eligibility-error" className={'margin-top-1'}>
                            <strong>{eligibility.name}</strong>
                        </Label>
                        <Checkbox
                            
                            id="eligibility-checkbox"
                            name="eligibility-checkbox"
                            value="eligibility-checkbox"
                            label={getFieldLabel(fields, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                            aria-required="true"
                            aria-describedby="eligibility-error"
                            required={true}
                            defaultChecked={props.hasConfirmed}
                            onChange={(e) => props.confirmCheckbox(e.target.checked)}
                            onInvalid={(e) => e.target.setCustomValidity(' ')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            onBlur={(e) => toggleError(e, !props.hasConfirmed)}
                        />
                        <span id="eligibility-error" role="alert" className='error-text' data-test="errorText">
                            {getFieldError(fields, "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c")}
                        </span>
                    </div>
                <div dangerouslySetInnerHTML= {{__html: eligibilityInstructions}}/>

                <div className={'usa-prose margin-top-5'} dangerouslySetInnerHTML= {{__html: contentBodyParts[1].replace("@state_name", stateContent.name)
                        .replace("@mail_deadline", renderToStaticMarkup(mailDeadline()))}}/>

                <NextButton stringContent={stringContent} type={'submit'} onClick={(e) => focusError('eligibility')} text={navContent.next.start}/>
            </Form>
            </div>
        </>
    );
}

export default Eligibility;