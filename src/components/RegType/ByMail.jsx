import { Button, Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import StepsList from './StepsList';

function ByMail(props) {
    const content = props.content;
    const stateContent = props.stateData;

    return (
        <>

            <h1>{content.main_heading.replace("%state_name%", stateContent.name)}</h1>
            <p className={'usa-intro'}>{content.parag_bymail.replace("%state_name%", stateContent.name)}</p>
            <div className="padding-top-3 padding-bottom-4">
                <Button>
                    {content.check_reg_btn}
                    <Icon.Launch title="External link opens new window"/>
                </Button>
            </div>
            <Link className="text-primary">
                <strong  className="text-primary">{content.mail_in_link.replace("%state_name%", stateContent.name)}</strong>
                <Icon.Launch title="External link opens new window"/>
            </Link>

            <div className="divider padding-y-205">
                <span>{content.divider_text}</span>
            </div>

            <StepsList content={props.content}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={content.next_btn_bymail}/>

        </>
    );
}

export default ByMail;
