import { Button, Radio, Icon } from '@trussworks/react-uswds';
import data from "../../data/step-two.json";

function Online(props) {
    const content = data;
    const onlineContent = data.online;
    const stateContent = props.stateData;
    const stateLink = props.stateData.election_website_url;

    return (
        <>
        <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
        <h2>{content.heading_eligibility}</h2>

        <p>{content.heading_register.replace("%state_name%", props.stateData.name)}</p>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.eligibility_list.map(
            listItem => <li value={listItem}>{listItem}</li>)}  
        </ul>

        <h2>{content.heading_deadlines}</h2>
        <ul style={{ listStyleType:'disc' }}>
        {stateContent.deadlines_list.map(
            listItem => <li value={listItem}>{listItem}</li>)}
        </ul>

        <h2>{onlineContent.heading_online}</h2>
        <p>{stateContent.info.online}</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <a href={stateLink} target="_blank">
                <Button type="button">
                    Go to state online registration
                    <Icon.Launch/>
                </Button>
            </a>
        </div>

        <h2>{content.heading_mail}</h2>
        <p>{onlineContent.mail_more_info}</p>

        <h3>{content.heading_confirm}</h3>

        <p>{content.citizen_required}</p>
        <form>
        <Radio 
            id="yes-citizen" 
            name="input-radio" 
            label="Yes" 
            onClick={e => props.handleRadio(e.target.id)} 
            checked={props.radioValid.citizen === true ? true : false}
        />
        <Radio 
            id="no-citizen" 
            name="input-radio" 
            label="No" 
            onClick={e => props.handleRadio(e.target.id)}
        />            
        </form>

        <p>{content.age_required}</p>
        <form>
        <Radio 
            id="yes-age" 
            name="input-radio" 
            label="Yes" 
            onClick={e => props.handleRadio(e.target.id)} 
            checked={props.radioValid.age === true ? true : false}
        />
        <Radio 
            id="no-age" 
            name="input-radio" 
            label="No" 
            onClick={e => props.handleRadio(e.target.id)} 
        />            
        </form>

        <p>If you checked "No" in response to either of these questions, do not continue with registration on Vote.gov.</p>

        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext} disabled={props.buttonDisabled ? false : true}>
            {onlineContent.start_button}
            </Button>
        </div>
        </>
    );
}

export default Online;