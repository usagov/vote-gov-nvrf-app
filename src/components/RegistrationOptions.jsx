import ByMail from "./RegType/ByMail";
import Online from "./RegType/Online";
import NotNeeded from "./RegType/NotNeeded";
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import { useState, useEffect } from 'react';
import BackButton from './BackButton';

function RegistrationOptions(props) {
    const [content, setContent] = useState()
    useEffect(() => {
        fetchData("registration-options.json", setContent);
    }, []);
    const regType = props.stateData.reg_type;

    if (content) {
        return (
            <>

                <BackButton type={'button'} onClick={props.handlePrev} text={'Go back to select your state'}/>

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
}

export default RegistrationOptions;