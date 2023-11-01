import data from "../data/eligibility.json";
import { Button, Icon, Fieldset, Checkbox, Label } from '@trussworks/react-uswds';


function Eligibility(props) {
    const content = data;
    const stateContent = props.stateData;
    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
        Back to State Registration Options
        </Button>
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
        <h2>{content.heading_eligibility}</h2>
        <p>{content.heading_register.replace("%state_name%", props.stateData.name)}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.eligibility_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{content.heading_deadlines}</h2>
        <p>{content.deadlines_note}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.deadlines_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{content.heading_mail}</h2>

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
            {content.start_button}
            <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Button>
        </div>
        </form>
        </>
    );
}

export default Eligibility;