import { Label, TextInput, Button } from '@trussworks/react-uswds';

function Print(props) {
    return (
        <>
        <h3>Print my form</h3>
        <p>Placeholder text: We may want to explain what happens here. Will the form action open another window. What happens here?</p>

        <h3>Would you like a reminder to mail your form?</h3>
        <p>Sign up here for reminders. By entering your phone number, you consent to receiving messages from vote.gov.</p>
        <Label htmlFor="sms-alert-phone-number">Opt in for SMS Alerts (optional)</Label>
        <TextInput id="sms-alert-phone-number" name="sms-alert-phone-number" value={props.fieldData.sms_alert_phone_number} onChange={props.saveFieldData('sms_alert_phone_number')} type="text" autoComplete="off" required={false}/>

        <Button type="submit" onClick={props.handleNext}>
            Print Form
        </Button>
        </>
    );
}

export default Print;