import ByMail from "./RegType/ByMail";
import ByMailStateOnly from "./RegType/ByMailStateOnly";
import Online from "./RegType/Online";
import OnlineNoStateMail from "./RegType/OnlineNoStateMail";
import OnlineOnly from "./RegType/OnlineOnly";
import OnlineNoNVRF from "./RegType/OnlineNoNvrf";
import NotNeeded from "./RegType/NotNeeded";
import BackButton from './BackButton';
import InPerson from "./RegType/InPerson";
import NewHampshire from "./RegType/CustomStateTemplates/NewHampshire";
import Wyoming from "./RegType/CustomStateTemplates/Wyoming";

function RegistrationOptions(props) {
    const regType = props.stateData.reg_type;
    const acceptsNVRF = props.stateData.accepts_nvrf;
    const content = props.content;
    const navContent = props.navContent;
    const stringContent = props.stringContent

    if (content && navContent && stringContent) {
        const onlineContent = content.find(item => item.uuid === "086a212d-4f75-47e8-aad6-24eadc4a559f");
        const onlineNoStateMailContent = content.find(item => item.uuid === "54aab86d-419f-45ec-947e-414490ddfb87");
        const onlineOnlyContent = content.find(item => item.uuid === "216b8cd7-69e3-4947-aa2c-09dca7392a46");
        const onlineNoNvrfContent = content.find(item => item.uuid === "dea1c47d-5b08-4235-9035-7063e5fab041");
        const mailContent = content.find(item => item.uuid === "295db8a2-6df6-4c81-825d-8d03064550f9");
        const mailStateOnlyContent = content.find(item => item.uuid === "bfe1aeed-72b1-405e-b3e9-a94303611c71");
        const inPersonContent = content.find(item => item.uuid === "c8a3890a-ed6f-4d50-a002-4011ded29e5a");
        const noRegContent = content.find(item => item.uuid === "df8fede3-11ad-4099-b2a8-f6a9bb457842");
        const newHampshireContent = content.find(item => item.uuid === "db6d0e24-1e00-4070-a5c8-5f9de98df871");
        const wyomingContent = content.find(item => item.uuid === "9c7f2350-d74f-457e-beff-34b66e26c761");

    return (
        <>
            <BackButton stringContent={stringContent} type={'button'} onClick={props.handlePrev} text={navContent.back.select_state}/>
            <div className={'usa-prose margin-top-5 maxw-tablet margin-x-auto'}>
                {props.stateData.abbrev != 'nh' && props.stateData.abbrev != 'wy' 
                    ? 
                    <>
                    {(regType === 'online' && acceptsNVRF === '1' && props.stateData.mail_reg_url != "") &&
                        <Online
                            content={onlineContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {(regType === 'online' && acceptsNVRF === '1' && props.stateData.mail_reg_url === "") &&
                        <OnlineNoStateMail
                            content={onlineNoStateMailContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {(regType === 'online' && acceptsNVRF === '0' && props.stateData.name === "Guam") &&
                        <OnlineOnly
                            content={onlineOnlyContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {(regType === 'online' && acceptsNVRF === '0' && props.stateData.name != "Guam") &&
                        <OnlineNoNVRF
                            content={onlineNoNvrfContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {(regType === 'by-mail' && acceptsNVRF === '1') &&
                        <ByMail
                            content={mailContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {(regType === 'by-mail' && acceptsNVRF === '0') &&
                        <ByMailStateOnly
                            content={mailStateOnlyContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            handleNext={props.handleNext}
                            stringContent={props.stringContent}
                        />}
                    {regType === 'in-person' &&
                        <InPerson
                            content={inPersonContent}
                            stateData={props.stateData}
                            stringContent={props.stringContent}
                        />}
                    {regType === 'not-needed' &&
                        <NotNeeded
                            content={noRegContent}
                            stateData={props.stateData}
                            stringContent={props.stringContent}
                        />}
                    </>
                    : 
                    <>
                    {props.stateData.abbrev === 'nh' &&
                        <NewHampshire
                            content={newHampshireContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            stringContent={props.stringContent}
                        />}
                    {props.stateData.abbrev === 'wy' &&
                        <Wyoming
                            content={wyomingContent}
                            navContent={props.navContent}
                            stateData={props.stateData}
                            stringContent={props.stringContent}
                        />}
                    </>
                }
            </div>
            </>
        );
    }
}

export default RegistrationOptions;