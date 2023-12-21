import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";
import {renderToStaticMarkup} from "react-dom/server";

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    if (content && navContent) {
        const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", stateContent.name);
        const stateLinks = () => (
            <div className="padding-bottom-3 padding-top-1">
                <a href={stateContent.confirm_reg_url} className="usa-button" target="_blank">
                    {"Check your registration"}
                    <Icon.Launch title="External link opens new window"/>
                </a>
            </div>
        );
        const stateMailinLink = () => (
            <p>
                <a href={stateContent.election_website_url} className="text-primary" target="_blank">
                    <strong className="text-primary underline-primary">{"Go to %state_name%'s mail-in form".replace("%state_name%", props.stateData.name)}
                        <Icon.Launch title="External link opens new window"/></strong>
                </a>
            </p>
        );
        let contentBodyProcessed = contentBody.replace("@state_links", renderToStaticMarkup(stateLinks()));
        contentBodyProcessed = contentBodyProcessed.replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()));

        return (
            <>

                <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

                <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>

                <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.continue}/>

            </>
        );
    }
}

export default ByMail;
