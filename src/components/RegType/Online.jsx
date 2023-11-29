import { Button, Link, Icon } from '@trussworks/react-uswds';
import { useState, useEffect } from 'react';
import { fetchData } from '../HelperFunctions/JsonHelper';
import { Link, Icon } from '@trussworks/react-uswds';
import NextButton from '../NextButton';
import StepsList from './StepsList';

function Online(props) {
    const content = props.content;
    const navContent = props.navContent;
    const [cards, setCards] = useState('')

    useEffect(() => {
        fetchData("cards.json", setCards);
    }, []);

    if (content && cards && navContent) {
        const listContent = cards.find(item => item.uuid === "33a9859d-a62c-4f8e-9e92-5a70f529b62a");
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

                <h1>{content.title.replace("@state_name", props.stateData.name)}</h1>
                <p className={'usa-intro'}>{content.body.replace("@state_name", props.stateData.name)}</p>
                <div className="padding-top-3 padding-bottom-1">
                    <Button>
                        {"Go to %state_name%'s mail-in form"}
                        <Icon.Launch title="External link opens new window"/>
                    </Button>
                </div>
                <div className="padding-bottom-3 padding-top-1">
                    <Button>
                        {"Check your registration"}
                        <Icon.Launch title="External link opens new window"/>
                    </Button>
                </div>
                <div>
                    <Link className="text-primary">
                        <strong className="text-primary underline-primary">{"Go to %state_name%'s mail-in form"}
                        <Icon.Launch title="External link opens new window"/></strong>
                    </Link>
                </div>

                <div  className="divider padding-y-205">
                    <span>{"OR"}</span>
                </div>

                <StepsList content={listContent}/>

                <NextButton type={'submit'} onClick={props.handleNext} text={navContent.next.start}/>ß

            </>
        );
    }
}

export default Online;
