import { useState, useEffect } from 'react';
import { Button } from '@trussworks/react-uswds';
import ByMail from "./RegTypes/ByMail";
import Online from "./RegTypes/Online";
import NotNeeded from "./RegTypes/NotNeeded";

function StepTwo(props) {
    const regType = props.stateData.reg_type;

    const [citizenValid, setCitizenValid] = useState('no selection');
    const [ageValid, setAgeValid] = useState('no selection');
    const [buttonDisabled, setButtonDisabled] = useState(false)

    useEffect(() => {
        let validateBoth = (citizenValid === true) && (ageValid === true) ? true : false;
        setButtonDisabled(validateBoth)
      }, [citizenValid, ageValid]);

    const handleRadio = (id) => {
        if (id === 'yes-citizen') {
            setCitizenValid(true)
            console.log(((citizenValid) && (ageValid)))
        } else if (id === 'no-citizen') {
            setCitizenValid(false)
            console.log(((citizenValid) && (ageValid)))

        } else if (id === 'yes-age') {
            setAgeValid(true)
            console.log(((citizenValid) && (ageValid)))

        } else if (id === 'no-age') {
            setAgeValid(false)
            console.log(((citizenValid) && (ageValid)))

        } 
    }

    return (
        <>
        <Button type="button" onClick={props.handlePrev}>
            Back to Choose your State
        </Button>
        {regType === 'online' && 
            <Online 
            state={props.state} 
            stateData={props.stateData} 
            handleNext={props.handleNext}
            handleRadio={handleRadio}
            citizenValid={citizenValid}
            ageValid={ageValid}
            buttonDisabled={buttonDisabled}
            />}
        {regType === 'in-person' && 
            <ByMail state={props.state} 
            handleNext={props.handleNext}
            handleRadio={handleRadio}
            citizenValid={citizenValid}
            ageValid={ageValid}
            buttonDisabled={buttonDisabled}
        />}
        {regType === 'not-needed' && 
            <NotNeeded 
            state={props.state} 
            stateData={props.stateData}
            handleNext={props.handleNext}/>}
        </>
    );
}

export default StepTwo;