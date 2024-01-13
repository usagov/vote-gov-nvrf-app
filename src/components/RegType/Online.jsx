import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";
import {renderToStaticMarkup} from "react-dom/server";

function Online(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    if (content && navContent) {
        const contentBody = DOMPurify.sanitize(content.body).replaceAll("@state_name", stateContent.name);
        const contentBodyParts = contentBody.split("@vote_nvrf_link");

        const stateOnlineLink = () => (
                <p>
                    <a href={stateContent.registration_url} className="usa-button" target="_blank">
                        <span>{"Go to %state_name%'s online form".replace("%state_name%", stateContent.name)}</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
        );

        const stateMailinLink = () => (
            <p>
                <a href={stateContent.mail_reg_url} className="usa-button" target="_blank" title="Opens a new PDF window">
                    <span>{"Go to the PDF form on %state_name%'s website".replace("%state_name%", props.stateData.name)}</span>
                    <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                </a>
            </p>
        );

        const checkRegLink = () => (
            <p>
                    <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                        <span>Check your registration</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
            </p>
        );

        let contentBodyPartOne = contentBodyParts[0].replace("@state_online_link", renderToStaticMarkup(stateOnlineLink()));
        let contentBodyPartTwo = contentBodyParts[1].replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()))
                                                    .replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()));

    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <div className={'usa-prose'}>
                <div dangerouslySetInnerHTML= {{__html: contentBodyPartOne}}/>
                <p><NextButton noMarginTop type={'submit'} onClick={props.handleNext} text={navContent.next.start}/></p>
                <div dangerouslySetInnerHTML= {{__html: contentBodyPartTwo}}/></div>
            </>
        );
    }
}

export default Online;
