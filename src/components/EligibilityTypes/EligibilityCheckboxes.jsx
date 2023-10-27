import { Button, Link, Fieldset, Checkbox, Label } from '@trussworks/react-uswds';
import data from "../../data/eligibility.json";
import reactStringReplace from 'react-string-replace';

function EligibilityCheckboxes(props) {
    const content = data;
    const onlineContent = data.online;

    const downloadForm = reactStringReplace(
        content.download_form,
        '%link%',
        (match, i) => <Link key={i} href={props.downloadForm} variant="external" rel="noreferrer" target="_blank">
        {content.download_form_link.replace("%state_name%", props.stateName)}
    </Link>
    );

    return (
        <>
        <form onSubmit={(e) => {e.preventDefault(), props.handleNext()}}>
        <Fieldset legend="Eligibility" legendStyle="srOnly">
            <div className={props.checkboxes.checkboxesValid ? 'error-container' : ''}>
            <Label htmlFor="eligibility-error" id="eligibility-error">
                {content.heading_confirm}
            </Label>
                <div>
                    <Checkbox
                        id="eligibility-checkbox"
                        name="eligibility-checkbox"
                        value="eligibility-checkbox"
                        label={content.eligibility_check}
                        aria-required="true"
                        required={true}
                        defaultChecked={props.checkboxes.eligibility}
                        onChange={(e) => props.handleCheckbox(e.target.checked, 'eligibility', 0)}
                    />              
                </div>
            {props.checkboxes.checkboxesValid && 
                <span id="eligibility-error" rol="alert" className='error-text'>
                    {content.error_message}
                </span>
            }  
            </div>
        </Fieldset>

        <p>{content.eligibility_agreement}</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button onClick={() => props.checkBoxValues()} type="submit">
            {onlineContent.start_button}
            </Button>
        </div>
        </form>

        <p>{downloadForm}</p>
        </>
    );
}

export default EligibilityCheckboxes;