// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, FormGroup, Label, TextInput, Button, Dropdown,Checkbox, DatePicker } from '@trussworks/react-uswds';

function StepFour() {
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
                <option>
                    - Select -{' '}
                </option>
                <option value="Mr.">
                    Mr.
                </option>
                <option value="Miss">
                    Miss
                </option>
                <option value="Ms.">
                    Ms.
                </option>
                <option value="Mrs.">
                    Mrs.
                </option>
            </Dropdown>
            <Label htmlFor="first-name">
            First Name
            </Label>
            <TextInput
            id="first-name"
            name="first-name"
            type="text"
            required
            />
            <Label htmlFor="middle-name">
            Middle Name
            </Label>
            <TextInput
            id="middle-name"
            name="middle-name"
            type="text"
            />
            <Label htmlFor="last-name">
            Last Name
            </Label>
            <TextInput
            id="last-name"
            name="last-name"
            type="text"
            />
            <Label htmlfor="suffix-select">Suffix</Label>
            <Dropdown id="suffix-select" name="suffix-select">
                <option>
                    - Select -{' '}
                </option>
                <option value="Jr.">
                    Jr.
                </option>
                <option value="Sr.">
                    Sr.
                </option>
                <option value="II">
                    II
                </option>
                <option value="III">
                    III
                </option>
                <option value="IV">
                    IV
                </option>
            </Dropdown>
            <Checkbox id="legal-name-change" name="legal-name-change" label="I have legally changed my name since the last time I registered to vote." />
            <Label
            htmlFor="date-of-birth"
            id="date-of-birth-label"
            >
            Date of Birth
            </Label>
            <div
            className="usa-hint"
            id="date-of-birth-hint"
            >
            mm/dd/yyyy
            </div>
            <DatePicker
            aria-describedby="date-of-birth-hint"
            aria-labelledby="date-of-birth-label"
            id="date-of-birth"
            name="date-of-birth"
            />
            <Label htmlFor="phone-number">Phone Number (123-456-7890)</Label>
            <TextInput id="phone-number" name="phone-number" type="text" />
        </FormGroup>
        <Button outline type="submit">
            Submit
        </Button>
        </Form>
        </>
    );
}

export default StepFour;