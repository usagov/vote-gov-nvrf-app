import { Link, Icon } from '@trussworks/react-uswds';
import reactStringReplace from 'react-string-replace';
import DOMPurify from "dompurify";

function NotNeeded(props) {
    const content = props.content;
    const state = props.stateData;
    const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", props.stateData.name);
    const contentBodyParts = contentBody.split("@state_links");

    return (
        <>

            <h1>{content.title.replace("@state_name", state.name)}</h1>
            <div dangerouslySetInnerHTML= {{__html: contentBodyParts[0]}}/>
            <p>
                <Link href={state.election_website_url} className="usa-button" target="_blank">
                    {"Learn more about your voting options"}
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </p>
            <div dangerouslySetInnerHTML= {{__html: contentBodyParts[1]}}/>

            <p>
                <Link href={"https://vote.gov"} className="usa-button">
                    {"Back to Vote.gov"}
                </Link>
            </p>

        </>
    );
}

export default NotNeeded;
