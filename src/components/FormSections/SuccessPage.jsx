import ProgressBar from '../ProgressBar';
import { Button } from '@trussworks/react-uswds';
import EmailSuccess from '../DeliveryOptions/EmailSuccess';
import PrintSuccess from '../DeliveryOptions/PrintSuccess';
import content from "../../data/success-page.json";

function SuccessPage(props) {
    const deliveryOption = props.deliveryButtonSelected;
    const stateAddress = props.stateData.state_address;
    return (
        <>
            {(deliveryOption === 'email') &&
                <EmailSuccess/>
            }

            {(deliveryOption === 'print') &&
                <PrintSuccess/>
            }

            <h3>{content.reminder_heading}</h3>
            <p>{content.reminder_text}</p>

            <p><strong>{content.mail_heading}</strong></p>
            <span style={{ whiteSpace:'pre' }}>
                {stateAddress}
            </span>

            <p>{content.mail_text}</p>

            <p><strong>{content.first_time_voter_heading}</strong></p>
            <p>{content.first_time_voter_text}</p>
            <ul>
                <li>{content.first_time_voter_req1}</li>
                <li>{content.first_time_voter_req2} </li>
            </ul>

            <p>{content.first_time_voter_text2}</p>
            <ul>
                <li>{content.exempt_listitem1}</li>
                <li>{content.exempt_listitem2}</li>
            </ul>

            <h3>{content.vote_forget_heading}</h3>
            <p>{content.vote_forget_text}</p> 

            <a href="https://vote.gov">
                <Button type="button" onClick={props.handlePrev}>
                    Back to Vote.gov
                </Button>
            </a>
        </>
    );
}

export default SuccessPage;