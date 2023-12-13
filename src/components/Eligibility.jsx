import { Fieldset, Checkbox, Label } from '@trussworks/react-uswds';
import BackButton from './BackButton';
import NextButton from "./NextButton";
import DOMPurify from "dompurify";

function Eligibility(props) {
    const stateContent = props.stateData;
    const data = props.content;
    const navContent = props.navContent;
    const fields = props.fieldContent;

    if (data && fields && navContent) {
        const content = data.find(item => item.uuid === "94eab1c9-8343-4747-94b4-08732a175614");
        const eligibility = fields.find(item => item.uuid === "39fc63ad-ed5a-4ad5-98d3-aa236c96c61c");
        const contentBody = DOMPurify.sanitize(content.body);
        const eligibilityInstructions = DOMPurify.sanitize(eligibility.instructions);
        return (
            <>
                <BackButton type={'button'} onClick={props.handlePrev} text={navContent.back.state_reg_options}/>

                <h1>{content.title.replace("@state_name", props.stateData.name)}</h1>
                <div dangerouslySetInnerHTML= {{__html: contentBody.replace("@state_name", props.stateData.name)}}/>

                {stateContent.postmarked_mail_deadline_info}{stateContent.received_mail_deadline_info}

                <form onSubmit={(e) => {e.preventDefault(), props.handleNext()}}>
                    <Fieldset legend="Eligibility" legendStyle="srOnly">
                        <div className={props.error ? 'error-container' : ''}>
                            <Label htmlFor="eligibility-error" id="eligibility-error">
                                <strong>{eligibility.name}</strong>
                            </Label>
                            <div>
                                <Checkbox
                                    id="eligibility-checkbox"
                                    name="eligibility-checkbox"
                                    value="eligibility-checkbox"
                                    label={eligibility.label}
                                    aria-required="true"
                                    required={true}
                                    defaultChecked={props.hasConfirmed}
                                    onChange={(e) => props.confirmCheckbox(e.target.checked)}
                                />
                            </div>

                            {props.error &&

                                <span id="eligibility-error" rol="alert" className='error-text'>
                                {eligibility.error_msg}
                                </span>
                            }
                        </div>
                    </Fieldset>

                    <div dangerouslySetInnerHTML= {{__html: eligibilityInstructions}}/>

                    <div className="button-container" style={{ margin:'20px' }}>
                        <NextButton type={'submit'} onClick={() => props.checkboxValid()} text={navContent.next.continue}/>
                    </div>
                </form>
            </>
        );
    }
}

export default Eligibility;