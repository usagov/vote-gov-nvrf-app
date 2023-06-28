import { Button } from '@trussworks/react-uswds';

function StepThree(props) {
    return (
        <>
        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext}>
            Continue to the digital form
            </Button>
        </div>
        </>
    );
}

export default StepThree;