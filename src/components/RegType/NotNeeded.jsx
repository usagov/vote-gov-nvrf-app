import { Link, Icon } from '@trussworks/react-uswds';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";
import * as string from '../../../public/data/en/strings.json';

function NotNeeded(props) {
    const content = props.content;
    const stateContent = props.stateData;
    const contentBody = sanitizeDOM(content.body).replace("@state_name", props.stateData.name);

    const stateLinks = () => (
        <>
            {stateContent.election_website_url &&
                <p>
                    <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>{(string.learnMore)}</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
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

            <div className={'margin-top-5'}>
                <a href={"https://vote.gov"}>{(string.backBtn)}</a>
            </div>
        </>
    );
}

export default NotNeeded;
