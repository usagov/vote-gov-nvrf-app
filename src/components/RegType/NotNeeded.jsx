import { Link, Icon } from '@trussworks/react-uswds';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function NotNeeded(props) {
    const content = props.content;
    const stateContent = props.stateData;
    const contentBody = sanitizeDOM(content.body).replace("@state_name", props.stateData.name);
    const stringContent = props.stringContent

    const stateLinks = () => (
        <>
            {stateContent.election_website_url &&
                <p>
                    <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>{stringContent.learnMore}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
            }
        </>
    );

    const contentBodyProcessed = contentBody.replace("@state_links", renderToStaticMarkup(stateLinks()));

    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>

            <p className={'margin-top-5'}>
                <a href={"https://vote.gov"}>{stringContent.backBtn}</a>
            </p>
        </>
    );
}

export default NotNeeded;
