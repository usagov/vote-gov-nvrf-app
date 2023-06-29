import { Button } from '@trussworks/react-uswds';
import ByMail from "./RegTypes/ByMail";
import Online from "./RegTypes/Online";
import NotNeeded from "./RegTypes/NotNeeded";

function StepTwo(props) {
    const regType = props.stateData.reg_type;

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Choose your State
        </Button>
        {regType === 'online' && <Online state={props.state} handleNext={props.handleNext}/>}
        {regType === 'in-person' && <ByMail state={props.state} handleNext={props.handleNext}/>}
        {regType === 'not-needed' && <NotNeeded state={props.state} handleNext={props.handleNext}/>}
        </>
    );
}

export default StepTwo;