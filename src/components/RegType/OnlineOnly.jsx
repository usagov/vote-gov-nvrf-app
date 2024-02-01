import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";
// import * as string from '../../../public/data/en/strings.json';

function OnlineOnly(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;
    const stringContent = props.stringContent

    if (content && navContent) {
        let contentBody = sanitizeDOM(content.body).replaceAll("@state_name", stateContent.name);

        const stateOnlineLink = () => (
                <p>
                    <a href={stateContent.registration_url} className="usa-button" target="_blank">
                        <span>{stringContent.stateOnlineName.replace("@state_name", stateContent.name)}</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
        );

        const checkRegLink = () => (
            <p>
                    <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>{stringContent.checkReg}</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
            </p>
        );

        const contentBodyProcessed = contentBody.replace("@state_online_link", renderToStaticMarkup(stateOnlineLink())).replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()));

        return (
            <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>
            </>
        );
    }
}

export default OnlineOnly;
