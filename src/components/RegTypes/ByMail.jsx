import EligibilityCheckboxes from "./EligibilityCheckboxes";
import { useState,useEffect } from 'react';
import {fetchData} from '../HelperFunctions/JsonHelper.jsx';

function ByMail(props) {
    const [content, setContent] = useState()
    const stateContent = props.stateData;

    useEffect(() => {
        fetchData("registration-form.json", setContent);
    }, []);

    return (
        <>
        {content && <div>
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

        <h2>{content.heading_mail}</h2>
        <p>{content.by_mail.mail_more_info.replace("%state_name%", props.stateData.name)}</p>

        <EligibilityCheckboxes
            handleNext={props.handleNext}
            checkBoxValues={props.checkBoxValues}
            checkboxesValid={props.checkboxesValid}
            handleCheckbox={props.handleCheckbox}
            checkboxes={props.checkboxes}
            downloadForm={props.stateData.download_form}
            stateName={props.stateData.name}
        />
        </div>}
        </>
    );
}

export default ByMail;