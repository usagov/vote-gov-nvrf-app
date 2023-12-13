import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import DOMPurify from "dompurify";

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    if (content && navContent) {
        const contentBody = DOMPurify.sanitize(content.body).replace("@state_name", props.stateData.name);

        return (
            <>

                <h1>{content.title.replace("@state_name", props.stateData.name)}</h1>
                <div dangerouslySetInnerHTML= {{__html: contentBody}}/> {/* TODO: Need to style each paragraph */}

                <div className="padding-bottom-3 padding-top-1">
                    <Link href={props.stateData.election_website_url} className="usa-button" target="_blank">
                        {"Check your registration"}
                        <Icon.Launch title="External link opens new window"/>
                    </Link>
                </div>
                <div>
                    <Link href={props.stateData.download_form} className="text-primary" target="_blank">
                        <strong className="text-primary underline-primary">{"Go to %state_name%'s mail-in form".replace("%state_name%", props.stateData.name)}
                        <Icon.Launch title="External link opens new window"/></strong>
                    </Link>
                </div>

                <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.continue}/>

            </>
        );
    }
}

export default ByMail;
