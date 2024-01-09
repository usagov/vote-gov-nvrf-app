import { Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";
import {renderToStaticMarkup} from "react-dom/server";

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    if (content && navContent) {
        const contentBody = DOMPurify.sanitize(content.body).replaceAll("@state_name", stateContent.name);
        const contentBodyParts = contentBody.split("@vote_nvrf_link")

        const stateMailinLink = () => (
            <div className="padding-bottom-3 padding-top-1">
                <a href={stateContent.mail_reg_url} className="usa-button" target="_blank">
                   {"Go to the PDF form on %state_name%'s website".replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/>
                </a>
            </div>
        );

        const checkRegLink = () => (
            <div className="padding-bottom-3 padding-top-1">
                <a href={stateContent.election_website_url} className="usa-button" target="_blank">
                    {"Check your registration"}
                    <Icon.Launch title="External link opens new window"/>
                </a>
            </div>
        );

        let contentBodyPartOne = contentBodyParts[0]
        let contentBodyPartTwo = contentBodyParts[1].replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()))
                                                    .replace("@state_confirm_link", renderToStaticMarkup(checkRegLink()));

        return (
            <>
                <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

                <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartOne}}/>
                <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.start}/>
                <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyPartTwo}}/>

            </>
        );
    }
}

export default ByMail;
