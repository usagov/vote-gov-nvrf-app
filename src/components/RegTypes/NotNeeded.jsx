import {Button, Link, Icon} from '@trussworks/react-uswds';
import reactStringReplace from 'react-string-replace';
import { fetchData } from '../HelperFunctions/JsonHelper.jsx';
import { useState ,useEffect} from 'react';

function NotNeeded(props) {
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("state-selection.json", setContent);
    }, []);
    const stateLink = props.stateData.election_website_url;

    return (
        <>
        {content && <div>
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
        <h2>{content.not_needed.heading_register.replace("%state_name%", props.stateData.name)}</h2>
        <p>{reactStringReplace(
            content.not_needed.more_info.replace("%state_name%", props.stateData.name),
            "%link%",
            (match, i) => <Link key={i} variant="external" href={stateLink} rel="noreferrer" target="_blank">
                {content.not_needed.more_info_link}
            </Link>
        )}</p>




        <h2>{content.not_needed.heading_vote}</h2>
        <p>{content.not_needed.text_vote}</p>

        <p>
            <a href={stateLink}><Button type="button">
                {content.not_needed.more_button}
                <Icon.Launch title="External link opens new window"/>
            </Button>
            </a >
        </p>
        <p>
            <a href="https://vote.gov"><Button type="button">
                {content.not_needed.back_button}
            </Button>
            </a>
        </p>
        </div>}
        </>
    );
}

export default NotNeeded;