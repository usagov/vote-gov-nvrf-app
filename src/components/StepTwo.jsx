import { Button } from '@trussworks/react-uswds';

function StepTwo(props) {
    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Choose your State
        </Button>

        Selected state: {props.state}

        <div className="button-container" style={{ margin:'20px' }}>
            <Button type="button" onClick={props.handleNext}>
            Start your registration on Vote.gov
            </Button>
        </div>
        </>
    );
}

export default StepTwo;