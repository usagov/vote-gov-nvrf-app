import { Button } from '@trussworks/react-uswds';

function StepFive(props) {
    return (
        <>
        {/* code goes here */}
        <h1>Success!</h1>
            <a href="https://vote.gov">
                <Button type="button" onClick={props.handlePrev}>
                    Back to Vote.gov
                </Button>
            </a>
        </>
    );
}

export default StepFive;