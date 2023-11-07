import { Button, Link, Icon } from '@trussworks/react-uswds';
import reactStringReplace from 'react-string-replace';

function NotNeeded(props) {
    const content = props.content.not_needed;
    const state = props.stateData;

    return (
        <>

            <h1>{content.main_heading.replace("%state_name%", state.name)}</h1>
            <p className={'usa-intro'}>{reactStringReplace(
                content.more_info.replace("%state_name%", state.name),
                "%link%",
                (match, i) => <Link key={i} variant="external" href={state.election_website_url} rel="noreferrer" target="_blank">
                    {content.more_info_link}
                </Link>
            )}</p>
            <p>
                <a href={state.election_website_url}><Button type="button">
                    {content.more_button}
                    <Icon.Launch title="External link opens new window"/>
                </Button>
                </a>
            </p>

            <h2>{content.heading_vote}</h2>
            <p>{content.text_vote}</p>
            <p>
                <a href="https://vote.gov"><Button type="button">
                    {content.back_button}
                </Button>
                </a>
            </p>

        </>
    );
}

export default NotNeeded;
