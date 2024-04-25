import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import {renderToStaticMarkup} from "react-dom/server";
import {sanitizeDOM} from "../HelperFunctions/JsonHelper";

function OnlineNoStateMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;
    const stringContent = props.stringContent

    if (content && navContent && stringContent) {
        const contentBody = sanitizeDOM(content.body).replaceAll("@state_name", stateContent.name);
        const contentBodyParts = contentBody.split("@vote_nvrf_link");

        const stateOnlineLink = () => (
                <p>
                    <a href={stateContent.registration_url} className="usa-button" target="_blank">
                        <span>{stringContent.stateOnlineName.replace("@state_name", stateContent.name)}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
        );

        const checkRegLink = () => (
            <p>
                    <a href={stateContent.confirm_reg_url} className="usa-button" target="_blank">
                        <span>{stringContent.inPersonBtn.replace("@state_name", stateContent.name)}</span>
                        <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
            </p>
        );


        const inPersonLink = () => (
            <p>
                <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                    <span>{stringContent.inPersonBtn}</span>                    <Icon.Launch title={stringContent.extlink} style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        let contentBodyPartOne = contentBodyParts[0].replace("@state_online_link", renderToStaticMarkup(stateOnlineLink()));
        let contentBodyPartTwo = contentBodyParts[1].replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()))
                                                    .replace("@state_links", renderToStaticMarkup(inPersonLink()))

    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartOne}}/>
            <p><NextButton stringContent={stringContent} noMarginTop type={'submit'} onClick={props.handleNext} text={navContent.next.start}/></p>
            <div className={'usa-prose'} style={{marginTop: "3rem"}} dangerouslySetInnerHTML= {{__html: contentBodyPartTwo}}/>
        </>
        );
    }
}

export default OnlineNoStateMail;
