import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";
import * as string from '../../strings.json';

function ByMailStateOnly(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    if (content && navContent) {
        const contentBody = sanitizeDOM(content.body).replaceAll("@state_name", stateContent.name);

        const stateMailinLink = () => (
            <p>
                <a href={stateContent.mail_reg_url} className="usa-button" target="_blank" title="Opens a new PDF window">
                    <span>{(string.stateName).replace("@state_name", props.stateData.name)}</span>
                    <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        const checkRegLink = () => (
            <p>
                <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                    <span>{(string.checkReg)}</span>
                    <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        let contentBodyProcessed = contentBody.replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()))
                                              .replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()));

        return (
            <>
                <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

                <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>

            </>
        );
    }
}

export default ByMailStateOnly;
