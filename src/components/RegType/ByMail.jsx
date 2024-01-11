import { Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";
import {renderToStaticMarkup} from "react-dom/server";

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", stateContent.name);
    const stateLinks = () => (
        <>
            {stateContent.confirm_reg_url &&
                <p>
                    <a href={stateContent.confirm_reg_url} className="usa-button" target="_blank">
                        <span>{"Check your registration"}</span>
                        <Icon.Launch title="External link opens new window" style={{margin: "-3px -3px -3px 4px"}}/>
                    </a>
                </p>
            }
        </>
    );
    const stateMailinLink = () => (
        <>
            {stateContent.mail_reg_url &&
                <p>
                    <a href={stateContent.mail_reg_url} className="text-primary" target="_blank">
                        <strong className="text-primary underline-primary">{"Go to %state_name%'s mail-in form".replace("%state_name%", props.stateData.name)}
                            <Icon.Launch title="External link opens new window"/></strong>
                    </a>
                </p>
            }
        </>
    );

    let contentBodyProcessed = contentBody.replace("@state_confirm_link", renderToStaticMarkup(stateLinks()));
    contentBodyProcessed = contentBodyProcessed.replace("@state_mailin_link", renderToStaticMarkup(stateMailinLink()));

    return (
        <>
            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>

            <div className={'usa-prose'} dangerouslySetInnerHTML= {{__html: contentBodyProcessed}}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.start}/>
        </>
    );
}

export default ByMail;
