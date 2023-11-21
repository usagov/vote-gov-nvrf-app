import { Button, Link, Icon } from '@trussworks/react-uswds';
import reactStringReplace from 'react-string-replace';

function NotNeeded(props) {
    const content = props.content;
    const state = props.stateData;

    return (
        <>

            <h1>{content.title.replace("@state_name", state.name)}</h1>
            <p className={'usa-intro'}>{reactStringReplace(
                "%link% on %state_name%'s election website.".replace("%state_name%", state.name),
                "%link%",
                (match, i) => <Link key={i} variant="external" href={state.election_website_url} rel="noreferrer" target="_blank">
                    {"Learn more about voting"}
                </Link>
            )}</p>
            <p>
                <a href={state.election_website_url}><Button type="button">
                    {"Learn more about your voting options"}
                    <Icon.Launch title="External link opens new window"/>
                </Button>
                </a>
            </p>

            <p>{content.body}</p>
            <p>
                <a href="https://vote.gov"><Button type="button">
                    {"Back to Vote.gov"}
                </Button>
                </a>
            </p>

        </>
    );
}

export default NotNeeded;
