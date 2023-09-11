import EligibilityCheckboxes from "./EligibilityCheckboxes";
import data from "../../data/state-selection.json";

function ByMail(props) {
    const content = data;
    const mailContent = data.by_mail;
    const stateContent = props.stateData;

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

        <h2>{content.heading_mail}</h2>
        <p>{mailContent.mail_more_info.replace("%state_name%", props.stateData.name)}</p>

        <EligibilityCheckboxes
            handleNext={props.handleNext}
            checkBoxValues={props.checkBoxValues}
            checkboxesValid={props.checkboxesValid}
            handleCheckbox={props.handleCheckbox}
            checkboxes={props.checkboxes}
        />
        </>
    );
}

export default ByMail;