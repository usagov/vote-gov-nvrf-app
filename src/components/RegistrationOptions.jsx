import ByMail from "./RegType/ByMail";
import Online from "./RegType/Online";
import NotNeeded from "./RegType/NotNeeded";
import BackButton from './BackButton';
import InPerson from "./RegType/InPerson";

function RegistrationOptions(props) {
    const regType = props.stateData.reg_type;
    const content = props.content;
    const navContent = props.navContent;

    const onlineContent = content.find(item => item.uuid === "086a212d-4f75-47e8-aad6-24eadc4a559f");
    const mailContent = content.find(item => item.uuid === "295db8a2-6df6-4c81-825d-8d03064550f9");
    const inPersonContent = content.find(item => item.uuid === "c8a3890a-ed6f-4d50-a002-4011ded29e5a");
    const noRegContent = content.find(item => item.uuid === "df8fede3-11ad-4099-b2a8-f6a9bb457842");

    return (
        <>

            <BackButton type={'button'} onClick={props.handlePrev} text={navContent.back.select_state}/>

            {regType === 'online' &&
                <Online
                    content={onlineContent}
                    navContent={props.navContent}
                    stateData={props.stateData}
                    handleNext={props.handleNext}
                />}
            {regType === 'by-mail' &&
                <ByMail
                    content={mailContent}
                    navContent={props.navContent}
                    stateData={props.stateData}
                    handleNext={props.handleNext}
                />}
            {regType === 'in-person' &&
                <InPerson
                    content={inPersonContent}
                    stateData={props.stateData}
                />}
            {regType === 'not-needed' &&
                <NotNeeded
                    content={noRegContent}
                    stateData={props.stateData}
                />}
        </>
    );
}

export default RegistrationOptions;