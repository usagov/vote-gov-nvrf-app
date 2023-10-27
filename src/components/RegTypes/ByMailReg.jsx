import EligibilityCheckboxes from "./EligibilityCheckboxes";
import data from "../../data/eligibility.json";

function ByMailReg(props) {
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
        <p>{content.deadlines_note}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.deadlines_list.map(
            listItem => <li key={listItem} value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{content.heading_mail}</h2>

        <EligibilityCheckboxes
            handleNext={props.handleNext}
            checkBoxValues={props.checkBoxValues}
            checkboxesValid={props.checkboxesValid}
            handleCheckbox={props.handleCheckbox}
            checkboxes={props.checkboxes}
            downloadForm={props.stateData.download_form}
            stateName={props.stateData.name}
        />
        </>
    );
}

export default ByMailReg;