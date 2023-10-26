import { Button, Icon } from '@trussworks/react-uswds';
import ByMail from "./RegType/ByMail";
import Online from "./RegType/Online";
import NotNeeded from "./RegType/NotNeeded";
import content from "../data/registration-options.json";
import ".././styles/pages/RegistrationOptions.css";

function RegistrationOptions(props) {
    const regType = props.stateData.reg_type;

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            {content.back_btn}
        </Button>
        {regType === 'online' && 
        <Online 
            content={content} 
            stateData={props.stateData}
            handleNext={props.handleNext}
        />}
        {regType === 'in-person' && 
        <ByMail 
            content={content} 
            stateData={props.stateData}
            handleNext={props.handleNext}
        />}
        {regType === 'not-needed' && 
        <NotNeeded 
            content={content} 
            stateData={props.stateData}
        />}
        </>
    );
}

export default RegistrationOptions;