import {Button, Link, Icon} from '@trussworks/react-uswds';
import reactStringReplace from 'react-string-replace';
import data from "../../data/state-selection.json";

function NotNeeded(props) {
    const content = data;
    const notNeededContent = data.not_needed;
    const stateLink = props.stateData.election_website_url;

    return (
        <>
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
        <h2>{notNeededContent.heading_register.replace("%state_name%", props.stateData.name)}</h2>
        <p>{reactStringReplace(
            notNeededContent.more_info.replace("%state_name%", props.stateData.name),
            "%link%",
            (match, i) => <Link key={i} variant="external" href={stateLink} rel="noreferrer" target="_blank">
                {notNeededContent.more_info_link}
            </Link>
        )}</p>




        <h2>{notNeededContent.heading_vote}</h2>
        <p>{notNeededContent.text_vote}</p>

        <p>
            <a href={stateLink}><Button type="button">
                {notNeededContent.more_button}
                <Icon.Launch title="External link opens new window"/>
            </Button>
            </a >
        </p>
        <p>
            <a href="https://vote.gov"><Button type="button">
                {notNeededContent.back_button}
            </Button>
            </a>
        </p>
        </>
    );
}

export default NotNeeded;