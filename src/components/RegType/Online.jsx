import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import StepsList from './StepsList';

function Online(props) {
    const content = props.content;

    return (
        <>

            <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
            <p className={'usa-intro'}>{content.parag_online.replace("%state_name%", props.stateData.name)}</p>
            <div className="padding-top-3 padding-bottom-1">
            <Link href={props.stateData.registration_url} className="usa-button" target="_blank">
                    {content.online_form_btn.replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </div>
            <div className="padding-bottom-3 padding-top-1">
                <Link href={props.stateData.election_website_url} className="usa-button" target="_blank">
                    {content.check_reg_btn}
                    <Icon.Launch title="External link opens new window"/>
                </Link>
            </div>
            <div>
                <Link href={props.stateData.download_form} className="text-primary" target="_blank">
                    <strong className="text-primary underline-primary">{content.mail_in_link.replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/></strong>
                </Link>
            </div>

            <div  className="divider padding-y-205">
                <span>{content.divider_text}</span>
            </div>

            <StepsList content={props.content}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={content.next_btn}/>

        </>
    );
}

export default Online;
