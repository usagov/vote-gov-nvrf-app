import { Button, Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";

function Online(props) {
    const content = props.content;
    const navContent = props.navContent;

    if (content && navContent) {
        const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", props.stateData.name);
        const contentBodyParts = contentBody.split('@state_links');
        const contentBodyPartsSecond = contentBodyParts[1].split('@state_mailin_link');

        return (
            <>
            <h1>{content.title.replace("@state_name", props.stateData.name)}</h1>
            <div dangerouslySetInnerHTML= {{__html: contentBodyParts[0]}}/>
            <div className="padding-top-3 padding-bottom-1">
            <Link href={props.stateData.registration_url} className="usa-button" target="_blank">
                    {"Go to %state_name%'s online form".replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </div>
            <div className="padding-bottom-3 padding-top-1">
                <Link href={props.stateData.election_website_url} className="usa-button" target="_blank">
                Check your registration
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </div>
            <div dangerouslySetInnerHTML= {{__html: contentBodyPartsSecond[0].replace("@state_name's",props.stateData.name)}}/>

            <div>
                <Link href={props.stateData.download_form} className="text-primary" target="_blank">
                    <strong className="text-primary underline-primary">{"Go to %state_name%'s mail-in form".replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/></strong>
                </Link>
            </div>

            <div dangerouslySetInnerHTML= {{__html: contentBodyPartsSecond[2]}}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.start}/>

            </>
        );
    }
}

export default Online;
