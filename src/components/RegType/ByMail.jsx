import { Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;
    const stringContent = props.stringContent

    if (content && navContent && stringContent) {
        const contentBody = sanitizeDOM(content.body).replaceAll("@state_name", stateContent.name);
        const contentBodyParts = contentBody.split("@vote_nvrf_link")

        const stateMailinLink = () => (
            <p>
                <a href={stateContent.mail_reg_url} className="usa-button" target="_blank" title={stringContent.newWindow}>
                    <span>{stringContent.stateName.replace("@state_name", props.stateData.name)}</span>
                    <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        const checkRegLink = () => (
            <p>
                <a href={stateContent.confirm_reg_url} className="usa-button" target="_blank">
                    <span>{stringContent.checkReg}</span>
                    <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        const inPersonLink = () => (
            <p>
                <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                    <span>{stringContent.inPersonBtn.replace("@state_name", stateContent.name)}</span>
                    <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        let contentBodyPartOne = contentBodyParts[0]
        let contentBodyPartTwo = contentBodyParts[1].replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()))
                                                    .replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()))
                                                    .replace("@state_links", renderToStaticMarkup(inPersonLink()))

        return (
            <>
                <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

                <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartOne}}/>
                <p><NextButton stringContent={stringContent} noMarginTop type={'submit'} onClick={props.handleNext} text={navContent.next.start}/></p>
                    <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartTwo}}/>
            </>
        );
    }
}

export default ByMail;
