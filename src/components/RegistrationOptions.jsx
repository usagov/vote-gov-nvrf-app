import ByMail from "./RegType/ByMail";
import ByMailStateOnly from "./RegType/ByMailStateOnly";
import Online from "./RegType/Online";
import OnlineNoStateMail from "./RegType/OnlineNoStateMail";
import OnlineOnly from "./RegType/OnlineOnly";
import OnlineNoNVRF from "./RegType/OnlineNoNvrf";
import NotNeeded from "./RegType/NotNeeded";
import BackButton from './BackButton';
import InPerson from "./RegType/InPerson";

function RegistrationOptions(props) {
    const regType = props.stateData.reg_type;
    const acceptsNVRF = props.stateData.accepts_nvrf;
    const content = props.content;
    const navContent = props.navContent;

    if (content && navContent) {
        const onlineContent = content.find(item => item.uuid === "086a212d-4f75-47e8-aad6-24eadc4a559f");
        const onlineNoStateMailContent = content.find(item => item.uuid === "54aab86d-419f-45ec-947e-414490ddfb87");
        const onlineOnlyContent = content.find(item => item.uuid === "216b8cd7-69e3-4947-aa2c-09dca7392a46");
        const onlineNoNvrfContent = content.find(item => item.uuid === "dea1c47d-5b08-4235-9035-7063e5fab041");
        const mailContent = content.find(item => item.uuid === "295db8a2-6df6-4c81-825d-8d03064550f9");
        const mailStateOnlyContent = content.find(item => item.uuid === "bfe1aeed-72b1-405e-b3e9-a94303611c71");
        const inPersonContent = content.find(item => item.uuid === "c8a3890a-ed6f-4d50-a002-4011ded29e5a");
        const noRegContent = content.find(item => item.uuid === "df8fede3-11ad-4099-b2a8-f6a9bb457842");

    return (
        <>

            <BackButton type={'button'} onClick={props.handlePrev} text={navContent.back.select_state}/>
            <div className={'usa-prose margin-top-5 maxw-tablet margin-x-auto'}>
                {(regType === 'online' && acceptsNVRF === '1' && props.stateData.mail_reg_url != "") &&
                    <Online
                        content={onlineContent}
                        navContent={props.navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {(regType === 'online' && acceptsNVRF === '1' && props.stateData.mail_reg_url === "") &&
                    <OnlineNoStateMail
                        content={onlineNoStateMailContent}
                        navContent={props.navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {(regType === 'online' && acceptsNVRF === '0' && props.stateData.name === "Guam") &&
                    <OnlineOnly
                        content={onlineOnlyContent}
                        navContent={props.navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {(regType === 'online' && acceptsNVRF === '0' && props.stateData.name != "Guam") &&
                    <OnlineNoNVRF
                        content={onlineNoNvrfContent}
                        navContent={props.navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                {(regType === 'by-mail' && acceptsNVRF === '1') &&
                    <ByMail
                        content={mailContent}
                        navContent={props.navContent}
                        stateData={props.stateData}
                        handleNext={props.handleNext}
                    />}
                 {(regType === 'by-mail' && acceptsNVRF === '0') &&
                    <ByMailStateOnly
                        content={mailStateOnlyContent}
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
            </div>
            </>
        );
    }
}

export default RegistrationOptions;