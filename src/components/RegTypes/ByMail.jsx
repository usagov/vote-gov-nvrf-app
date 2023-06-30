import { Button, Radio } from '@trussworks/react-uswds';
import data from "../../data/step-two.json";

function ByMail(props) {
    const content = data;
    const mailContent = data.by_mail;
    const stateContent = props.stateData;

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

        <h2>{content.heading_mail}</h2>
        <p>{mailContent.mail_more_info.replace("%state_name%", props.stateData.name)}</p> 
        
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

        <div className="button-container" style={{ margin:'20px' }}>
            <Button 
                type="button" 
                onClick={props.handleNext} 
                disabled={props.buttonDisabled ? false : true}
            >
                {mailContent.start_button}
            </Button>
        </div>
        </>
    );
}

export default ByMail;