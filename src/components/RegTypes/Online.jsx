import { useState } from 'react';
import { Button, Icon } from '@trussworks/react-uswds';
import EligibilityCheckboxes from "./EligibilityCheckboxes";

function Online(props) {
    const [content, setContent] = useState()
    const locale = document.documentElement.lang;
    const stateContent = props.stateData;
    const stateLink = props.stateData.election_website_url;


    async function fetchData() {
        const response = await import(`../../data/${locale}/state-selection.json`)
        console.log(response);
        setContent(response)
      }

      fetchData()

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

        <h2>{content.online.heading_online}</h2>
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
        <p>{content.online.mail_more_info}</p>

        <EligibilityCheckboxes
            handleNext={props.handleNext}
            checkBoxValues={props.checkBoxValues}
            handleCheckbox={props.handleCheckbox}
            checkboxes={props.checkboxes}
            downloadForm={props.stateData.download_form}
            stateName={props.stateData.name}
        />
        </div>}
        </>
    );
}

export default Online;