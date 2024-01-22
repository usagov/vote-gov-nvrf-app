import {Alert, Button, Checkbox} from '@trussworks/react-uswds';
import DOMPurify from 'dompurify';

function Confirmation(props) {
    const headings = props.headings;
    const content = props.content;
    const fieldData = props.fieldData;
    const fields = props.fieldContent;
    const currentAddress = fieldData.street_address + fieldData.apt_num + fieldData.city + fieldData.zip_code;
    const prevName = fieldData.prev_title + fieldData.prev_first_name + fieldData.prev_middle_name + fieldData.prev_last_name + fieldData.prev_suffix;
    const prevAddress = fieldData.prev_street_address + fieldData.prev_apt_num + fieldData.prev_city + fieldData.prev_state + fieldData.prev_zip_code;
    const prevMailAddress = fieldData.mail_street_address + fieldData.mail_apt_num + fieldData.mail_city + fieldData.mail_state + fieldData.mail_zip_code;

    //field data overrides for confirm page printing only
    const fieldDataOverride_race = (fieldData.race === '') ? "Not required for your state" : fieldData.race;
    const fieldDataOverride_party = (fieldData.party_choice === '') ? "Not required for your state" : fieldData.party_choice;
    const fieldDataOverride_state = props.stateData.name;
    fieldData.state = fieldDataOverride_state;

    //id override
    const fieldDataOverride_id = ((fieldData.id_number === '') && (fieldData.ssn_number === '')) ? "none" : fieldData.id_number + " " + fieldData.ssn_number;

    const confirm = content.find(item => item.uuid === "560cd01c-42d1-4f58-a702-372c2ff6bbd9");
    const confirmBody = DOMPurify.sanitize(confirm.body);
    const confirmInstructions = DOMPurify.sanitize(confirm.instructions);

    const getFieldLabel = (uuid) => fields.find(item => item.uuid === uuid).label;
    const getFieldError = (uuid) => fields.find(item => item.uuid === uuid).error_msg;

    return (
        <>
            <div className={"confirm-info usa-prose"}>
                <h1>{confirm.title}</h1>
                <div className={'usa-prose'} dangerouslySetInnerHTML={{__html: confirmBody}}/>

                <div className='grid-row'>
                    <h2>{headings.step_label_1}</h2>
                    <div className='edit-btn'>
                        <Button
                            type="button"
                            class="usa-button--unstyled"
                            onClick={props.handleGoBackSteps(4)}
                            title="Return to Personal information, step one of six, to make a change">
                            {headings.confirmation.edit.label}
                        </Button>
                    </div>
                </div>
                {/*Jump to Personal Info Section (Step 1) */}
                <p><strong>{headings.confirmation.current_name.label}</strong></p>
                <ul>
                    <li>{getFieldLabel("86a544cd-cfe9-456a-b634-176a37a38d6d")}: {fieldData.title}</li>
                    <li>{getFieldLabel("b7bdae35-e4be-4827-ae11-75d9c3e33bf0")}: {fieldData.first_name}</li>
                    <li>{getFieldLabel("38020ec6-1b53-4227-99e5-feea5f60af07")}: {fieldData.middle_name}</li>
                    <li>{getFieldLabel("b306238a-a0f6-4bb8-b8ea-b3216ca75e0b")}: {fieldData.last_name}</li>
                    <li>{getFieldLabel("eeff4fa1-00f2-474b-a791-1a4146dab11a")}: {fieldData.suffix}</li>
                </ul>

                <p><strong>{headings.confirmation.previous_name.label}</strong></p>
                {!prevName && (
                    <Alert type="info" headingLevel="h4" noIcon>
                        {headings.confirmation.previous_name.alert}
                    </Alert>
                )}
                <ul>
                    <li>{getFieldLabel("34d2669a-d30b-4001-b897-280fe71b3cb0")}: {fieldData.prev_title}</li>
                    <li>{getFieldLabel("f282e541-7ca8-4c22-8d87-d4cff56e22e5")}: {fieldData.prev_first_name}</li>
                    <li>{getFieldLabel("a4919026-91ac-4e05-a75f-e2df479abd76")}: {fieldData.prev_middle_name}</li>
                    <li>{getFieldLabel("42de34cc-ebf3-4d8e-8873-2571063b62c0")}: {fieldData.prev_last_name}</li>
                    <li>{getFieldLabel("09cb2989-d302-4a01-bb3a-33173adcffb2")}: {fieldData.prev_suffix}</li>
                </ul>

                <p><strong>{headings.confirmation.other_info.label}</strong></p>
                <ul>
                    <li>{getFieldLabel("d31b2a64-36a9-4bc6-a9d1-e68d2be8c211")}: {fieldData.date_of_birth_month}/{fieldData.date_of_birth_day}/{fieldData.date_of_birth_year}</li>
                    <li>{getFieldLabel("2d61b54a-e568-410f-825a-0ca82dfd3f63")}: {fieldData.phone_number}</li>
                    <li>{getFieldLabel("2bfff6c6-6782-4b14-ac45-642efd278f6a")}: {fieldDataOverride_race}</li>
                </ul>
                <span className="divider-grey"></span>
                <div className='grid-row'>
                    <h2>{headings.step_label_2}</h2>
                    <div className='edit-btn'>
                        <Button
                            type="button"
                            class="usa-button--unstyled"
                            onClick={props.handleGoBackSteps(3)}
                            title="Return to Address and location, step two of six, to make a change">
                            {headings.confirmation.edit.label}
                        </Button>
                    </div>
                </div>
                <p><strong>{headings.confirmation.current_address.label}</strong></p>
                {!currentAddress && (
                    <Alert type="info" headingLevel="h4" noIcon>
                        {headings.confirmation.current_address.alert}
                    </Alert>
                )}
                <ul>
                    <li>{getFieldLabel("6dcb9e8c-b40a-4cda-ba5c-06b98c3375f4")}: {fieldData.street_address}</li>
                    <li>{getFieldLabel("deba9b54-68ad-4ef1-8fb5-ee34e4ab8a49")}: {fieldData.apt_num}</li>
                    <li>{getFieldLabel("7e39a528-7518-40cb-b7b6-b635864dc117")}: {fieldData.city}</li>
                    <li>{getFieldLabel("fe3a2a1d-34bd-472b-a843-3fa0635c4f40")}: {fieldDataOverride_state}</li>
                    <li>{getFieldLabel("cdb06542-0cbd-4aa3-897f-83377b8d65e5")}: {fieldData.zip_code}</li>
                </ul>

                <p><strong>{headings.confirmation.previous_address.label}</strong></p>
                {!prevAddress && (
                    <Alert type="info" headingLevel="h4" noIcon>
                        {headings.confirmation.previous_address.alert}
                    </Alert>
                )}
                <ul>
                    <li>{getFieldLabel("c037a3ea-86b7-4661-ad28-c7228f1e682b")}: {fieldData.prev_street_address}</li>
                    <li>{getFieldLabel("c8e2ff17-fb1f-4971-a664-ffbb557b305a")}: {fieldData.prev_apt_num}</li>
                    <li>{getFieldLabel("44bf0a5c-adba-4b47-bc99-cc46cede5e80")}: {fieldData.prev_city}</li>
                    <li>{getFieldLabel("5a8a4b6d-c0f1-42f2-b991-8ea49a32e997")}: {fieldData.prev_state}</li>
                    <li>{getFieldLabel("49a90983-1925-438f-8271-88f39bf19bf1")}: {fieldData.prev_zip_code}</li>
                </ul>

                <p><strong>{headings.confirmation.mailing_address.label}</strong></p>
                {!prevMailAddress && (
                    <Alert type="info" headingLevel="h4" noIcon>
                        {headings.confirmation.mailing_address.alert}
                    </Alert>
                )}
                <ul>
                    <li>{getFieldLabel("db9b1f7a-565b-4aad-8d7c-56a553c18326")}: {fieldData.mail_street_address}</li>
                    {/*<li>Apt. or Lot #: {fieldData.mail_apt_num}</li>*/}
                    <li>{getFieldLabel("9a5baee7-357b-4e59-b4f2-fe2525c0fd6c")}: {fieldData.mail_city}</li>
                    <li>{getFieldLabel("b0f80289-6084-4723-8278-110fda210f0d")}: {fieldData.mail_state}</li>
                    <li>{getFieldLabel("c4f9c0cb-2a25-4f1d-a93a-b06a19656cfe")}: {fieldData.mail_zip_code}</li>
                </ul>
                <span className="divider-grey"></span>
                <div className='grid-row'>
                    <h2>{headings.step_label_3}</h2>
                    <div className='edit-btn'>
                        <Button
                            type="button"
                            class="usa-button--unstyled"
                            onClick={props.handleGoBackSteps(2)}
                            title="Return to Identification, step three of six, to make a change">
                            {headings.confirmation.edit.label}
                        </Button>
                    </div>
                </div>
                <ul>
                    <li>{headings.confirmation.id_label.label}: {fieldDataOverride_id}</li>
                </ul>
                <span className="divider-grey"></span>
                <div className='grid-row'>
                    <h2>{headings.step_label_4}</h2>
                    <div className='edit-btn'>
                        <Button
                            type="button"
                            class="usa-button--unstyled"
                            onClick={props.handleGoBackSteps(1)}
                            title="Return to Political party, step four of six, to make a change">
                            {headings.confirmation.edit.label}
                        </Button>
                    </div>
                </div>
                <ul>
                    <li>{headings.confirmation.political_party.label}: {fieldDataOverride_party}</li>
                </ul>
            </div>

            {confirmInstructions && (
                <div className="usa-alert usa-alert--info margin-top-6" role="alert">
                    <div className="usa-alert__body" dangerouslySetInnerHTML={{__html: confirmInstructions}}/>
                </div>)}

            <div className={props.error ? 'error-container margin-top-4' : 'margin-top-4'}>
                <Checkbox
                    id="acknowledge-check"
                    name="acknowledge-check"
                    required
                    defaultChecked={props.hasAcknowledged}
                    label={getFieldLabel("73e74065-fd5a-43c0-907c-268120e34bc3")}
                    onChange={(e) => props.acknowledgeCheckbox(e.target.checked)}
                />
                {props.error &&
                    <span id="first-name-error" role="alert" className='error-text'>
                    {getFieldError("73e74065-fd5a-43c0-907c-268120e34bc3")}
                </span>
                }
            </div>
        </>
    );
}

export default Confirmation;