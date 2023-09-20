import { Link, Icon } from '@trussworks/react-uswds';
import "../../styles/pages/DeliveryOptions.css";
import GenerateFilledPDF from '../GenerateFilledPDF';


function Delivery(props) {
    return (
        <>
            <h1>Your form is ready to print.</h1>
            <h2>Print out the completed form, sign and date it, put it in an envelope with the correct postage, and mail it to your state election office.</h2>
            <h3>Create a reminder to mail your form</h3>
            <p>Take a minute and set a reminder for yourself to make sure you don't forget to mail in your form — add it to your calendar or jot it down on a notepad and put it on your fridge to help you remember.</p>

            <p>Mail to the following address:
            Division of Elections State of Alaska 
            PO Box 110017 
            Juneau, AK 99811-0017</p>

            You may also deliver the application in person to your local voter registration office.
            <h3>First time voter requirements</h3>

            <p>If you are registering to vote for the first time in your jurisdiction and are mailing this registration application, Federal law requires you to show proof of identification the first time you vote. Proof of identification includes:</p>
            <ul>
                <li>A current and valid photo identification or</li>
                <li>A current utility bill, bank statement, government check, paycheck or government document that shows your name and address.</li>
            </ul>

            <p>Voters may be exempt from this requirement if they submit a COPY of this identification with their mail in voter registration form. If you wish to submit a COPY, please keep the following in mind:</p>
                <ul>
                    <li>Your state may have additional identification requirements which may mandate you showidentification at the polling place even if you meet the Federal proof of identification.</li>
                    <li>Do not submit original documents with this application, only COPIES</li>
                </ul>

            <h3>Don't forget to vote!</h3>
            <p>Prepare to cast your vote. Explore Vote.gov to learn more about how our elections are run and your voting options.</p>

            <Link className="usa-button link-button-outline" variant="unstyled" href={'https://vote.gov/'}>
            <Icon.ArrowBack aria-label="back arrow icon"/> Back to Vote.gov
            </Link>

            <Link className="usa-button link-button-filled" variant="unstyled" href={props.stateData.election_website_url}>
            Learn about your voting options  <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Link>
        </>
    )
}

export default Delivery;