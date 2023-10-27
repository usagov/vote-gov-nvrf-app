import { Button, Icon } from '@trussworks/react-uswds';
import data from "../../data/eligibility.json";
import EligibilityCheckboxes from "./EligibilityCheckboxes";

function OnlineReg(props) {
    const content = data;
    const onlineContent = data.online;
    const stateContent = props.stateData;
    const stateLink = props.stateData.election_website_url;

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
        <p>{content.deadlines_note}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.deadlines_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{onlineContent.heading_online}</h2>
        <p>{stateContent.info.online}</p>

        <h2>{content.heading_mail}</h2>

        <EligibilityCheckboxes
            handleNext={props.handleNext}
            checkBoxValues={props.checkBoxValues}
            handleCheckbox={props.handleCheckbox}
            checkboxes={props.checkboxes}
            downloadForm={props.stateData.download_form}
            stateName={props.stateData.name}
        />
        </>
    );
}

export default OnlineReg;