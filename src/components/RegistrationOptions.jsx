import ByMail from "./RegType/ByMail";
import Online from "./RegType/Online";
import NotNeeded from "./RegType/NotNeeded";
import { fetchData } from './HelperFunctions/JsonHelper.jsx';
import { useState, useEffect } from 'react';
import ".././styles/pages/RegistrationOptions.css";
import BackButton from './BackButton';

function RegistrationOptions(props) {
    const regType = props.stateData.reg_type;
    const [content, setContent] = useState('')
    const [navContent, setNavContent] = useState('')

    useEffect(() => {
        fetchData("pages.json", setContent);
        fetchData("navigation.json", setNavContent);
    }, []);

    if (content && navContent) {
        const onlineContent = content.find(item => item.uuid === "086a212d-4f75-47e8-aad6-24eadc4a559f");
        const mailContent = content.find(item => item.uuid === "295db8a2-6df6-4c81-825d-8d03064550f9");
        const noRegContent = content.find(item => item.uuid === "df8fede3-11ad-4099-b2a8-f6a9bb457842");
        return (
            <>

                <BackButton type={'button'} onClick={props.handlePrev} text={navContent.back.select_state}/>

                {regType === 'online' &&
                    <Online
                        content={onlineContent}
                        navContent={navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {regType === 'by-mail' &&
                    <ByMail
                        content={mailContent}
                        navContent={navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {regType === 'not-needed' &&
                    <NotNeeded
                        content={noRegContent}
                        stateData={props.stateData}
                    />}
            </>
        );
    }
}

export default RegistrationOptions;