import { Button, Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import StepsList from './StepsList';

function ByMail(props) {
    const content = props.content;
    const stateContent = props.stateData;

    return (
        <>

            <h1>{content.title.replace("@state_name", stateContent.name)}</h1>
            <p className={'usa-intro'}>{content.body.replace("@state_name", stateContent.name)}</p>
            <div className="padding-top-3 padding-bottom-4">
                <Button>
                    {"Check your registration"}
                    <Icon.Launch title="External link opens new window"/>
                </Button>
            </div>
            <Link className="text-primary">
                <strong  className="text-primary">{"Go to %state_name%'s mail-in form"}</strong>
                <Icon.Launch title="External link opens new window"/>
            </Link>

            <div className="divider padding-y-6">
                <span>{"OK"}</span>
            </div>

            <StepsList content={props.content}/>

            <NextButton type={'submit'} onClick={props.handleNext} text={"Start your mail-in registration on vote.gov"}/>

        </>
    );
}

export default ByMail;
