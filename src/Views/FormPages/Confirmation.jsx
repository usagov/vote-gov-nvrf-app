import { Alert, Button, Checkbox, Grid, Icon, Fieldset } from '@trussworks/react-uswds';
import {sanitizeDOM} from 'Utils/JsonHelper';
import {toggleError} from 'Utils/ValidateField';

function Confirmation(props) {
  const content = props.content;
  const fieldData = props.fieldData;
  const fields = props.fieldContent;
  const strings = props.strings;
  const steps = props.steps;

  const confirm_group = strings.confirm_group.reduce((acc, item) => {
    acc[item.confirm_group_id] = {
      label: item.confirm_group_label,
      message: item.confirm_group_message
    };
    return acc;
  }, {});

  const currentAddress = fieldData.current_street_address + fieldData.current_apt_number + fieldData.current_city + fieldData.current_zip_code;
  const prevName = fieldData.prev_title + fieldData.prev_first_name + fieldData.prev_middle_names + fieldData.prev_last_name + fieldData.prev_suffix;
  const prevAddress = fieldData.prev_street_address + fieldData.prev_apt_number + fieldData.prev_city + fieldData.prev_state + fieldData.prev_zip_code;
  const prevMailAddress = fieldData.mail_street_address + fieldData.mail_apt_number + fieldData.mail_city + fieldData.mail_state + fieldData.mail_zip_code;

  //field data overrides for confirm page printing only
  const fieldDataOverride_race = (fieldData.race_ethnic_group === '') ? (strings.not_required_label) : fieldData.race_ethnic_group;
  const fieldDataOverride_party = (fieldData.party_choice === '') ? (strings.not_required_label) : fieldData.party_choice;
  const fieldDataOverride_state = props.stateData.name;
  fieldData.current_state = fieldDataOverride_state;

  //id override
  const fieldDataOverride_id = ((fieldData.id_number === '') && (fieldData.ssn_number === '')) ? "none" : fieldData.id_number + " " + fieldData.ssn_number;

  const confirm = content.find(item => item.uuid === "560cd01c-42d1-4f58-a702-372c2ff6bbd9");
  const confirmBody = sanitizeDOM(confirm.body);
  const confirmInstructions = sanitizeDOM(confirm.instructions);

  const getFieldLabel = (uuid) => fields.find(item => item.uuid === uuid).label;
  const getFieldError = (uuid) => fields.find(item => item.uuid === uuid).error_msg;

  return (
    <>
      <div className={"confirm-info"}>
        <h1>{confirm.title}</h1>
        <div dangerouslySetInnerHTML={{__html: confirmBody}}/>

        <hr/>

        <div className="margin-y-3">
          <Grid row gap={2} className={'flex-align-start'}>
            <div className="grid-col">
              <h2 className={'margin-0'}>{steps.personal.label}</h2>
            </div>

            <div className='edit-btn'>
              <Button
                className='usa-button--small'
                data-test="editBtn"
                type="button"
                style={{ margin: 0 }}
                onClick={props.handleGoBackSteps(4)}
                title={steps.personal.edit_button_aria_label}>
                <Icon.Edit role="none" aria-hidden alt=""
                           style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{strings.edit_button_label}</span>
              </Button>

            </div>
          </Grid>

          {/*Jump to Personal Info Section (Step 1) */}
          <p><strong>{confirm_group.current_name.label}</strong></p>
          <ul>
            <li>{getFieldLabel("86a544cd-cfe9-456a-b634-176a37a38d6d")}: {fieldData.current_title}</li>
            <li>{getFieldLabel("b7bdae35-e4be-4827-ae11-75d9c3e33bf0")}: {fieldData.current_first_name}</li>
            <li>{getFieldLabel("38020ec6-1b53-4227-99e5-feea5f60af07")}: {fieldData.current_middle_names}</li>
            <li>{getFieldLabel("b306238a-a0f6-4bb8-b8ea-b3216ca75e0b")}: {fieldData.current_last_name}</li>
            <li>{getFieldLabel("eeff4fa1-00f2-474b-a791-1a4146dab11a")}: {fieldData.current_suffix}</li>
          </ul>

          <p><strong>{confirm_group.previous_name.label}</strong></p>
          {!prevName && (
            <Alert type="info" headingLevel="h4" role="alert" aria-live="polite"
                   noIcon>
              {confirm_group.previous_name.message}
            </Alert>
          )}
          <ul>
            <li>{getFieldLabel("34d2669a-d30b-4001-b897-280fe71b3cb0")}: {fieldData.prev_title}</li>
            <li>{getFieldLabel("f282e541-7ca8-4c22-8d87-d4cff56e22e5")}: {fieldData.prev_first_name}</li>
            <li>{getFieldLabel("a4919026-91ac-4e05-a75f-e2df479abd76")}: {fieldData.prev_middle_names}</li>
            <li>{getFieldLabel("42de34cc-ebf3-4d8e-8873-2571063b62c0")}: {fieldData.prev_last_name}</li>
            <li>{getFieldLabel("09cb2989-d302-4a01-bb3a-33173adcffb2")}: {fieldData.prev_suffix}</li>
          </ul>

          <p><strong>{confirm_group.other.label}</strong></p>
          <ul>
            <li>{getFieldLabel("d31b2a64-36a9-4bc6-a9d1-e68d2be8c211")}: {fieldData.date_of_birth_month}/{fieldData.date_of_birth_day}/{fieldData.date_of_birth_year}</li>
            <li>{getFieldLabel("2d61b54a-e568-410f-825a-0ca82dfd3f63")}: {fieldData.phone_number}</li>
            <li>{getFieldLabel("2bfff6c6-6782-4b14-ac45-642efd278f6a")}: {fieldDataOverride_race}</li>
          </ul>
        </div>

        <hr/>

        <div className="margin-y-3">
          <Grid row gap={2} className={'flex-align-start'}>
            <div className="grid-col">
              <h2 className={'margin-0'}>{steps.address.label}</h2>
            </div>
            <div className='edit-btn'>
              <Button
                className='usa-button--small'
                data-test="editBtn"
                type="button"
                style={{ margin: 0 }}
                onClick={props.handleGoBackSteps(3)}
                title={steps.address.edit_button_aria_label}>
                <Icon.Edit role="none" aria-hidden alt=""
                           style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{strings.edit_button_label}</span>
              </Button>
            </div>
          </Grid>
          <p><strong>{confirm_group.current_address.label}</strong></p>
          {!currentAddress && (
            <Alert type="info" headingLevel="h4" role="alert" aria-live="polite"
                   noIcon>
              {confirm_group.current_address.message}
            </Alert>
          )}
          <ul>
            <li>{getFieldLabel("6dcb9e8c-b40a-4cda-ba5c-06b98c3375f4")}: {fieldData.current_street_address}</li>
            <li>{getFieldLabel("deba9b54-68ad-4ef1-8fb5-ee34e4ab8a49")}: {fieldData.current_apt_number}</li>
            <li>{getFieldLabel("7e39a528-7518-40cb-b7b6-b635864dc117")}: {fieldData.current_city}</li>
            <li>{getFieldLabel("fe3a2a1d-34bd-472b-a843-3fa0635c4f40")}: {fieldDataOverride_state}</li>
            <li>{getFieldLabel("cdb06542-0cbd-4aa3-897f-83377b8d65e5")}: {fieldData.current_zip_code}</li>
          </ul>

          <p><strong>{confirm_group.previous_address.label}</strong></p>
          {!prevAddress && (
            <Alert type="info" headingLevel="h4" role="alert" aria-live="polite"
                   noIcon>
              {confirm_group.previous_address.message}
            </Alert>
          )}
          <ul>
            <li>{getFieldLabel("c037a3ea-86b7-4661-ad28-c7228f1e682b")}: {fieldData.prev_street_address}</li>
            <li>{getFieldLabel("c8e2ff17-fb1f-4971-a664-ffbb557b305a")}: {fieldData.prev_apt_number}</li>
            <li>{getFieldLabel("44bf0a5c-adba-4b47-bc99-cc46cede5e80")}: {fieldData.prev_city}</li>
            <li>{getFieldLabel("5a8a4b6d-c0f1-42f2-b991-8ea49a32e997")}: {fieldData.prev_state}</li>
            <li>{getFieldLabel("49a90983-1925-438f-8271-88f39bf19bf1")}: {fieldData.prev_zip_code}</li>
          </ul>

          <p><strong>{confirm_group.mailing_address.label}</strong></p>
          {!prevMailAddress && (
            <Alert type="info" headingLevel="h4" role="alert" aria-live="polite"
                   noIcon>
              {confirm_group.mailing_address.message}
            </Alert>
          )}
          <ul>
            <li>{getFieldLabel("db9b1f7a-565b-4aad-8d7c-56a553c18326")}: {fieldData.mail_street_address}</li>
            {/*<li>Apt. or Lot #: {fieldData.mail_apt_number}</li>*/}
            <li>{getFieldLabel("9a5baee7-357b-4e59-b4f2-fe2525c0fd6c")}: {fieldData.mail_city}</li>
            <li>{getFieldLabel("b0f80289-6084-4723-8278-110fda210f0d")}: {fieldData.mail_state}</li>
            <li>{getFieldLabel("c4f9c0cb-2a25-4f1d-a93a-b06a19656cfe")}: {fieldData.mail_zip_code}</li>
          </ul>
        </div>

        <hr/>

        <div className="margin-y-3">
          <Grid row gap={2} className={'flex-align-start'}>
            <div className="grid-col">
              <h2 className={'margin-0'}>{steps.identification.label}</h2>
            </div>
            <div className='edit-btn'>
              <Button
                className='usa-button--small'
                data-test="editBtn"
                type="button"
                style={{ margin: 0 }}
                onClick={props.handleGoBackSteps(2)}
                title={steps.identification.edit_button_aria_label}>
                <Icon.Edit role="none" aria-hidden alt=""
                           style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{strings.edit_button_label}</span>
              </Button>
            </div>
          </Grid>
          <ul>
            <li>{confirm_group.id_number.label}: {fieldDataOverride_id}</li>
          </ul>
        </div>

        <hr/>

        <div className="margin-y-3">
          <Grid row gap={2} className={'flex-align-baseline'}>
            <div className="grid-col">
              <h2 className={'margin-0'}>{steps.party.label}</h2>
            </div>
            <div className='edit-btn'>
              <Button
                className='usa-button--small'
                data-test="editBtn"
                type="button"
                style={{ margin: 0 }}
                onClick={props.handleGoBackSteps(1)}
                title={steps.party.edit_button_aria_label}>
                <Icon.Edit role="none" aria-hidden alt=""
                           style={{margin: "-3px 4px -3px -3px"}}/>
                <span>{strings.edit_button_label}</span>
              </Button>
            </div>
          </Grid>
          <ul>
            <li>{confirm_group.party.label}: {fieldDataOverride_party}</li>
          </ul>
        </div>
      </div>

      <hr/>

      {confirmInstructions && (
        <div id="acknowledge-check-alert"
             className="usa-alert usa-alert--info margin-y-4" role="alert"
             aria-live="polite">
          <div className="usa-alert__body">
            <div className="usa-alert__text"
                 dangerouslySetInnerHTML={{__html: confirmInstructions}}/>
          </div>
        </div>)}

      <div className="input-parent">
        <Fieldset className="fieldset"  onBlur={(e) => toggleError(e, !props.hasAcknowledged)}>
          <Checkbox
            data-test="checkbox-confirm"
            id="acknowledge-checkbox"
            name="acknowledge-check"
            aria-describedby="acknowledge-check-alert"
            required
            defaultChecked={props.hasAcknowledged}
            label={getFieldLabel("73e74065-fd5a-43c0-907c-268120e34bc3")}
            onChange={(e) => props.acknowledgeCheckbox(e.target.checked)}
            onInvalid={(e) => e.target.setCustomValidity(' ')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Fieldset>
        <span id="first-name-error" role="alert" aria-live="assertive"
              className={'vote-error-text'} data-test="errorText">
          {getFieldError("73e74065-fd5a-43c0-907c-268120e34bc3")}
        </span>
      </div>
    </>
  );
}

export default Confirmation;