import { Button, ProcessList, ProcessListItem, ProcessListHeading, Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';

function ByMail(props) {
    const content = props.content;
    const stateContent = props.stateData;
    const regType = props.stateData.reg_type;

    console.log(stateContent.name)

    return (
        <>        
        <h1>{content.main_heading.replace("%state_name%", stateContent.name)}</h1>
            <p>{content.parag_bymail.replace("%state_name%", stateContent.name)}</p>
            <div>
                <Button>
                    {content.check_reg_btn}
                    <Icon.Launch title="External link opens new window"/>
                </Button>                    
            </div>            
            <Link>
                <p>
                    <strong>{content.mail_in_link.replace("%state_name%", stateContent.name)}</strong>
                    <Icon.Launch title="External link opens new window"/>
                </p>
            </Link>

        <h2>{content.process_heading}</h2>
            <p>{content.process_parag}</p>
            <ProcessList>
                <ProcessListItem>
                    <ProcessListHeading type="h4">
                        {content.process_heading1}
                    </ProcessListHeading>
                    <p>{content.process_text1}</p>
                </ProcessListItem>
                <ProcessListItem>
                    <ProcessListHeading type="h4">
                    {content.process_heading2}
                    </ProcessListHeading>
                    <p>{content.process_text2}</p>
                </ProcessListItem>
                <ProcessListItem>
                    <ProcessListHeading type="h4">
                    {content.process_heading3}
                    </ProcessListHeading>
                    <p>{content.process_text3}</p>
                </ProcessListItem>
                <ProcessListItem>
                    <ProcessListHeading type="h4">
                    {content.process_heading4}
                    </ProcessListHeading>
                    <p>{content.process_text4}</p>
                </ProcessListItem>
            </ProcessList>

            <NextButton type={'submit'} onClick={props.handleNext} text={content.next_btn_bymail}/>
        </>
    );
}

export default ByMail;
