// get component code here https://trussworks.github.io/react-uswds/?path=/story/components-form-elements-formgroup--text-input-form-group
import { Form, FormGroup, Label, TextInput, Button } from '@trussworks/react-uswds';

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
            <Label htmlFor="first-name">
            First Name
            </Label>
            <TextInput
            id="first-name"
            name="first-name"
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
        </FormGroup>
        <Button outline type="submit">
            Submit
        </Button>
        </Form>
        </>
    );
}

export default StepFour;