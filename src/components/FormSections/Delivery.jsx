import { Button, Link, Icon } from '@trussworks/react-uswds';
import "../../styles/pages/Delivery.css";
import content from "../../data/delivery.json";
import GenerateFilledPDF from '../GenerateFilledPDF';
import reactStringReplace from 'react-string-replace';

function Delivery(props) {
    // Add A/B Message randomization.
    const randomProperty = function (obj) {
        const keys = Object.keys(obj);
        const key = keys[keys.length * Math.random() << 0];
        return {
            "key": key,
            "value": obj[key]
        };
    };

    const stateAddress = props.stateData.state_address;
    const reminderMessage = randomProperty(content.reminder_messages);

    const usagov_resource_link = reactStringReplace(
        content.usagov_rescources,
        '%link%',
        (match, i) => <Link key={i} href={'https://www.usa.gov/how-to-vote'} variant="external" rel="noreferrer" target="_blank">
        {content.usagov_resources_link}
    </Link>
    );

    return (
        <>
            <h1>{content.main_heading.replace("%state_name%", props.stateData.name)}</h1>
            <p>{content.main_help_text1}</p>
            <p>{content.main_help_text2}</p>
            <h2>{content.mail_to_header.replace("%state_name%", props.stateData.name)}</h2>

            <p>
                <br />{stateAddress.office_name}
                <br />{stateAddress.street_address}
                <br />{stateAddress.city_state}
            </p>

            <p>{content.delivery_text}</p>

            <Button onClick={() => GenerateFilledPDF(props.fieldData)} type="submit">
                {content.open_btn} <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Button>

            <hr/>

            <h2>{content.reminder_main_header}</h2>

            <h3>{content.reminder_sub_header1}</h3>
            <p data-message-id={reminderMessage.key}>{reminderMessage.value}</p>
            <p>{content.reminder_parag1}</p>

            <h3>{content.reminder_sub_header2}</h3>

            <p><strong>{content.reminder_parag2}</strong></p>
            <p>{content.reminder_parag3}</p>

            <p>{content.reminder_parag4}</p>
                <ul>
                    <li>{content.reminder_parag4_li1}</li>
                    <li>{content.reminder_parag4_li2}</li>
                </ul>

            <h3>{content.reminder_subheader3}</h3>
            <p>{content.reminder_parag5}</p>

            <p><strong>{usagov_resource_link}</strong></p>
        </>
    )
}

export default Delivery;