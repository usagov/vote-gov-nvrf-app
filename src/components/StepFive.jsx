import { Button } from '@trussworks/react-uswds';

function StepFive(props) {
    return (
        <>
        {/* code goes here */}
        <Button outline type="submit" onClick={props.handleNext}>
            Send Form to My Email Address
        </Button>
        </>
    );
}

export default StepFive;