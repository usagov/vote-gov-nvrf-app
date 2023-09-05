import React, { useState, useEffect } from "react";
import { Button, Fieldset, Checkbox, Icon, Label } from '@trussworks/react-uswds';
import data from "../../data/state-selection.json";
import validationStyles from "../../styles/ValidationStyles.module.css";

function Online(props) {
    const content = data;
    const onlineContent = data.online;
    const stateContent = props.stateData;
    const stateLink = props.stateData.election_website_url;

    const [handleErrors, setHandleErrors] = useState(null)


    const [boxValues, setBoxValues] = useState([false, false])

    const handleCheckbox = (checked, index) => { 
        let copyValues = [...boxValues];
        copyValues[index] = checked;
        setBoxValues(copyValues)
    }

    const checkBoxValues = () => {
        if (boxValues.includes(false)) {
            setHandleErrors(true)
        } else {
            setHandleErrors(false)
        }
     }

    return (
        <>
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
        <h2>{content.heading_eligibility}</h2>

        <p>{content.heading_register.replace("%state_name%", props.stateData.name)}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.eligibility_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{content.heading_deadlines}</h2>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.deadlines_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{onlineContent.heading_online}</h2>
        <p>{stateContent.info.online}</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <a href={stateLink} target="_blank">
                <Button type="button">
                    Go to state online registration
                    <Icon.Launch title="External link opens new window"/>
                </Button>
            </a>
        </div>

        <h2>{content.heading_mail}</h2>
        <p>{onlineContent.mail_more_info}</p>

        <form onSubmit={() => {props.handleNext()}}>
        <Fieldset legend="Historical figures 1" legendStyle="srOnly">
            <div tabIndex={0} className={validationStyles[handleErrors && 'error-container']}>            
            <Label htmlFor="eligibility-error" id="eligibility-error">
                {content.heading_confirm}
            </Label>
                <div id="test-id" tabIndex={0} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) checkBoxValues(); }}>
                    <Checkbox
                        id="citizen-checkbox"
                        name="eligibility-checkbox"
                        value="citizen-checkbox"
                        label={content.citizen_required}
                        aria-required="true"
                        required={true}
                        tabIndex={0}
                        onClick={(e) => handleCheckbox(e.target.checked, 0)}
                    />              
                    <Checkbox
                        id="age"
                        name="eligibility-checkbox"
                        value="age-checkbox"
                        label={content.age_required}
                        aria-required="true"
                        required={true}
                        tabIndex={0}
                        onClick={(e) => handleCheckbox(e.target.checked, 1)}
                    />
                </div>
            {handleErrors && 
                <span id="phone-number-error" rol="alert" className={validationStyles['error-text']}>
                    Both boxes must be checked to continue.
                </span>
            }  
            </div>
        </Fieldset>

        <p>If you checked "No" in response to either of these questions, do not continue with registration on Vote.gov.</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button onClick={() => checkBoxValues()} type="submit">
            {onlineContent.start_button}
            </Button>
        </div>
        </form>
        </>
    );
}

export default Online;