import { Button, ProcessList, ProcessListItem, ProcessListHeading, Link, Icon } from '@trussworks/react-uswds';

function Online(props) {
    const content = props.content;

    return (
        <>
        
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
            <div>
                <p>{content.parag_online}</p>
                <div>
                <Button>
                    {content.online_form_btn.replace("%state_name%", props.stateData.name)}
                    <Icon.Launch title="External link opens new window"/>
                </Button>
                </div>

                <div>
                <Button>
                    {content.check_reg_btn}
                    <Icon.Launch title="External link opens new window"/>
                </Button>                    
                </div>

                <div>
                <Link>
                    <p>
                        <strong>{content.mail_in_link.replace("%state_name%", props.stateData.name)}</strong>
                        <Icon.Launch title="External link opens new window"/>
                    </p>
                </Link>                    
                </div>

                <div>

                </div>
                <div className="divider">
                    <span>{content.divider_text}</span>
                </div>
            </div>

            <div>
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

            <Button onClick={props.handleNext}>
                {content.next_btn_online}
                <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Button>
            </div>
        </>
    );
}

export default Online;