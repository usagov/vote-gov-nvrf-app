import ProgressBar from '../ProgressBar';
import { Button } from '@trussworks/react-uswds';

function SuccessPage(props) {
    return (
        <>
        <h1>Success! Your form has been sent to your email.</h1>
        <p>Check your email to make sure you have received a PDF of your form. Be sure to print out the completed form, put it in an envelope, add the correct postage, and mail it to your state election office.</p>
        <h3>Create a reminder to mail your form</h3>
        <p>Take a minute and set a reminder for yourself to make sure you don’t forget to mail in your form — add it to your calendar or jot it down on a notepad and put it on your fridge to help you remember.</p>

        <p><strong>Mail to the following address:</strong></p>
        <p>Division of Elections State of Alaska</p>
        <p>PO Box 110017</p>
        <p>Juneau, AK 99811-0017</p>

        <p>You may also deliver the application in person to your local voter registration office.</p>

        <p><strong>First time voter requirements</strong></p>
        <p>If you are registering to vote for the first time in your jurisdiction and are mailing this registration application, Federal law requires you to show proof of identification the first time you vote. Proof of identification includes: </p>
        <ul>
            <li>A current and valid photo identification or </li>
            <li>A current utility bill, bank statement, government check, paycheck or government document that shows your name and address. </li>
        </ul>

        <p>Voters may be exempt from this requirement if they submit a COPY of this identification with their mail in voter registration form. If you wish to submit a COPY, please keep the following in mind:• Your state may have additional identification requirements which may mandate you showidentification at the polling place even if you meet the Federal proof of identification.• Do not submit original documents with this application, only COPIES</p>

        <h3>Don’t forget to vote!</h3>
        <p>Prepare to cast your vote. Explore Vote.gov to learn more about how our elections are run and your voting options.</p> 

            <a href="https://vote.gov">
                <Button type="button" onClick={props.handlePrev}>
                    Back to Vote.gov
                </Button>
            </a>
        </>
    );
}

export default SuccessPage;