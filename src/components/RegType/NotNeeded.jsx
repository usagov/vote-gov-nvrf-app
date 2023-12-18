import { Link, Icon } from '@trussworks/react-uswds';
import DOMPurify from "dompurify";
import {renderToStaticMarkup} from "react-dom/server";

function NotNeeded(props) {
    const content = props.content;
    const stateContent = props.stateData;
    const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", props.stateData.name);
    const stateLinks = () => (
        <p>
            <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                {"Learn more about your voting options"}
                <Icon.Launch title="External link opens new window"/>
            </a>
        </p>
    );
    const contentBodyProcessed = contentBody.replace("@state_links", renderToStaticMarkup(stateLinks()));

    return (
        <>

            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>

            <div className={'margin-top-5'}>
                <a href={"https://vote.gov"} className="usa-button">
                    {"Back to Vote.gov"}
                </a>
            </div>

        </>
    );
}

export default NotNeeded;
