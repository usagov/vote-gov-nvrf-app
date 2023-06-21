// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, FormGroup, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';
import StateSelector from './StateSelector';

function StepFour(props) {
        {/* functions/variables code goes here */}
    const handleSubmit = (e) => {
        e.preventDefault(e);
        console.log('Submitted!')
    }

    return (
        <>
        {/* uswds components, html, jsx output goes here*/}
        <Form onSubmit={(e) => {handleSubmit(e)}}>
            <FormGroup>
                <h4>Personal Information</h4>

                <Label htmlFor="title-select">Title</Label>
                <Dropdown id="title-select" name="title-select">
                    <option>- Select -{' '}</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                </Dropdown>

                <Label htmlFor="first-name">First Name</Label>
                <TextInput id="first-name" name="first-name" type="text" required/>

                <Label htmlFor="middle-name">Middle Name</Label>
                <TextInput id="middle-name" name="middle-name" type="text"/>

                <Label htmlFor="last-name">Last Name</Label>
                <TextInput id="last-name" name="last-name" type="text"/>

                <Label htmlfor="suffix-select">Suffix</Label>
                <Dropdown id="suffix-select" name="suffix-select">
                    <option>- Select -{' '}</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                </Dropdown>

                <Checkbox id="legal-name-change" name="legal-name-change" label="I have legally changed my name since the last time I registered to vote." />

                <Label htmlFor="date-of-birth" id="date-of-birth-label">Date of Birth</Label>
                <div className="usa-hint" id="date-of-birth-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="date-of-birth-hint" aria-labelledby="date-of-birth-label" id="date-of-birth" name="date-of-birth"/>

                <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
                <TextInput id="phone-number" name="phone-number" type="text" />
            </FormGroup>

            <FormGroup>
                <h4>Home Address</h4>

                <Label htmlFor="street-address">Street Address</Label>
                <TextInput id="street-address" name="street-address" type="text"/>

                <Label htmlFor="apt-num">Apartment of Lot #</Label>
                <TextInput id="apt-num" name="apt-num" type="text"/>

                <Label htmlFor="city">City</Label>
                <TextInput id="city" name="city" type="text"/>

                <Label>State</Label>
                <StateSelector statesList={props.statesList}/>

                <Label htmlFor="zipcode">Zipcode (123456)</Label>
                <TextInput id="zipcode" name="zip-code" type="text"/>

                <Checkbox id="prev-res-addr" name="prev-res-addr" label="I have a previous residential address." />

                <Checkbox id="alt-mail-addr" name="alt-mail-addr" label="I get my mail at a different address from the one above." />
            </FormGroup>

            <FormGroup>
                <h4>Identification</h4>
                <Label htmlFor="state-id-num">State Driver's License Number</Label>
                <TextInput id="state-id-num" name="state-id-num" type="text"/>

                <Label htmlFor="issue-date" id="issue-date-label">Issue Date</Label>
                <div className="usa-hint" id="issue-date-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="issue-date-hint" aria-labelledby="issue-date-label" id="issue-date" name="issue-date"/>

                <Label htmlFor="expire-date" id="expire-date-label">Expire Date</Label>
                <div className="usa-hint" id="expire-date-hint">
                    mm/dd/yyyy
                </div>
                <DatePicker aria-describedby="expire-date-hint" aria-labelledby="expire-date-label" id="expire-date" name="expire-date"/>
            </FormGroup>

            <Button outline type="submit">
                Confirm your information
            </Button>
        </Form>
        </>
    );
}

export default StepFour;