import { Label, TextInput, Button } from '@trussworks/react-uswds';

function Email(props) {
    return (
        <>
        <h3>Enter email address</h3>
        <p>Please enter a valid address. For example, name@mail.com</p>

        <Label htmlFor="email-address">Email Address</Label>
        <TextInput id="email-address" name="email-address" value={props.fieldData.email_address} onChange={props.saveFieldData('email_address')} type="text" autoComplete="off" required={true}/>

        <h3>Would you like a reminder to mail your form?</h3>
        <p>Sign up here for reminders. By entering your phone number, you consent to receiving messages from vote.gov.</p>
        <Label htmlFor="sms-alert-phone-number">Opt in for SMS Alerts (optional)</Label>
        <TextInput id="sms-alert-phone-number" name="sms-alert-phone-number" value={props.fieldData.sms_alert_phone_number} onChange={props.saveFieldData('sms_alert_phone_number')} type="text" autoComplete="off" required={false}/>
        </>
    );
}

export default Email;