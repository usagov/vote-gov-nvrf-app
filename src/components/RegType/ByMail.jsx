import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import StepsList from './StepsList';

function ByMail(props) {
    const content = props.content;
    const navContent = props.navContent;
    const stateContent = props.stateData;

    return (
        <>

            <h1>{content.main_heading.replace("%state_name%", stateContent.name)}</h1>
            <p className={'usa-intro'}>{content.parag_bymail.replace("%state_name%", stateContent.name)}</p>

            <div className="padding-bottom-3 padding-top-1">
                <Link href={props.stateData.election_website_url} className="usa-button" target="_blank">
                    {"Check your registration"}
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </div>
            <div>
                <Link href={props.stateData.download_form} className="text-primary" target="_blank">
                    <strong className="text-primary underline-primary">{content.mail_in_link.replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/></strong>
                </Link>
            </div>

            <div className="divider padding-y-6">
                <span>{"OK"}</span>
            </div>

            <StepsList content={props.content}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.continue}/>

        </>
    );
}

export default ByMail;
