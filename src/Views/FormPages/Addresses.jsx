import {Checkbox, Grid, Fieldset} from '@trussworks/react-uswds';
import CurrentAddressState from 'Components/Fields/CurrentAddressState';
import CurrentStreetAddress from 'Components/Fields/CurrentStreetAddress';
import CurrentZipCode from 'Components/Fields/CurrentZipCode';
import CurrentCity from 'Components/Fields/CurrentCity';
import CurrentApartmentNumber from 'Components/Fields/CurrentApartmentNumber';
import MailingZipCode from 'Components/Fields/MailingZipCode';
import PreviousZipCode from 'Components/Fields/PreviousZipCode';
import PreviousCity from 'Components/Fields/PreviousCity';
import MailingStreetAddress from 'Components/Fields/MailingStreetAddress';
import MailingAddressState from 'Components/Fields/MailingAddressState';
import PreviousApartmentNumber from 'Components/Fields/PreviousApartmentNumber';
import PreviousStreetAddress from 'Components/Fields/PreviousStreetAddress';
import MailingCity from 'Components/Fields/MailingCity';
import PreviousAddressState from 'Components/Fields/PreviousAddressState';
import React from "react";
import {sanitizeDOM} from 'Utils/JsonHelper';


function Addresses(props) {
  const fields = props.fieldContent;
  const step = props.step;
  const changeRegistrationVisible = ((props.registrationPath === 'update') || (props.stateData.name == 'Maine')) ? true : false;
  const nvrfStateFields = props.stateData.nvrf_fields;

  //Drupal field data
  const homeAddressSectionField = fields.find(item => item.uuid === "63552bb6-6afb-46e1-8148-860242917a22");
  const streetAddressField = fields.find(item => item.uuid === "6dcb9e8c-b40a-4cda-ba5c-06b98c3375f4");

  const prevAddressSectionField = fields.find(item => item.uuid === "023fda0f-e8bd-4654-ab5c-46f44a0b7bd6");
  const prevAddressField = fields.find(item => item.uuid === "c3011c62-d174-420c-817a-bffbcd45687a");

  const mailAddressSectionField = fields.find(item => item.uuid === "1a856408-6fb2-4b09-b05a-8d8ee9eb9bb5");
  const noAddressField = fields.find(item => item.uuid === "35c2b98d-477c-45f3-9f93-f720406080f1");
  const differentMailAddressField = fields.find(item => item.uuid === "e7340274-ee3f-4d73-a967-c9d7c249be7b");

  const noAddressSection = fields.find(item => item.uuid === "3724c7cd-5ec7-4e3e-85cd-db0cab63e99b");
  const movedAndNoAddressSection = fields.find(item => item.uuid === "6dd20906-654e-427e-bb82-1e62aee9ed72");

  //Field requirements by state data
  const addressFieldsState = (nvrfStateFields.find(item => item.uuid === streetAddressField.uuid));

  // Instructions for optional checkboxes
  const noAddressCheckboxInstructions = sanitizeDOM(noAddressSection.label);
  const movedAndNoAddressCheckboxInstructions = sanitizeDOM(movedAndNoAddressSection.label);

  return (
    <>
      <h2>{step.step_label}</h2>

      {addressFieldsState && (
        <>
          <div className="input-parent">
            <Fieldset className="fieldset">
            {!changeRegistrationVisible && (
              <legend className='usa-hint'
                    id='addresses-checkbox-hint'>{noAddressCheckboxInstructions}</legend>
            )}
            {changeRegistrationVisible && (
              <>
                <legend className='usa-hint'
                      id='addresses-checkbox-hint'>{movedAndNoAddressCheckboxInstructions}</legend>
                <Checkbox id="prev-address" name="prev-address"
                          data-test="checkBox" checked={props.hasPreviousAddress}
                          onChange={props.onChangePreviousAddressCheckbox}
                          label={prevAddressField.label}/>
              </>
            )}
            <Checkbox id="no-address" aria-describedby="no-address_alert"
                      className="margin-bottom-4" name="no-addr"
                      data-test="checkBox" checked={props.hasNoAddress}
                      onChange={props.hasNoAddressCheckbox}
                      label={noAddressField.label}/>
            </Fieldset>
          </div>
          {/******** Current Address Block *********/}
          {!props.hasNoAddress && (<>
              {homeAddressSectionField.section_alert && (
                <div id="no-address_alert" className="usa-alert usa-alert--info"
                     role="region" aria-live="polite">
                  <div className="usa-alert__body">
                    <div className="usa-alert__text"
                         dangerouslySetInnerHTML={{__html: homeAddressSectionField.section_alert}}/>
                  </div>
                </div>)}

              <h3 className='margin-top-5'>{homeAddressSectionField.label}</h3>
              {homeAddressSectionField.instructions && (
                <div
                  dangerouslySetInnerHTML={{__html: homeAddressSectionField.instructions}}/>
              )}

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 12}}>
                  <CurrentStreetAddress {...props} />
                </Grid>
              </Grid>

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 5}}>
                  <CurrentApartmentNumber {...props} />
                </Grid>
              </Grid>

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 4}}>
                  <CurrentCity {...props} />
                </Grid>

                <Grid tablet={{col: 4}}>
                  <CurrentAddressState {...props} />
                </Grid>

                <Grid tablet={{col: 3}}>
                  <CurrentZipCode {...props} />
                </Grid>
              </Grid>
              <Fieldset>
                <Checkbox data-test="checkBox" className="margin-top-3"
                          id="alt-mail-addr" name="alt-mail-addr"
                          checked={props.hasMailAddress}
                          onChange={props.onChangeMailAddressCheckbox}
                          label={differentMailAddressField.label}/>
              </Fieldset>
            </>
          )}
          {/******* END BLOCK *********/}

          {/******* MAIL ADDRESS BLOCK ********/}
          {(props.hasMailAddress || props.hasNoAddress) && (
            <>
              {props.hasNoAddress && (
                <div className="usa-alert usa-alert--info" role="alert">
                  <div className="usa-alert__body">
                    <div className="usa-alert__text"
                         dangerouslySetInnerHTML={{__html: mailAddressSectionField.section_alert}}/>
                  </div>
                </div>)}

              <h3 className='margin-top-8'>{mailAddressSectionField.label}</h3>
              {mailAddressSectionField.section_description && (
                <div
                  dangerouslySetInnerHTML={{__html: mailAddressSectionField.section_description}}/>
              )}

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 12}}>
                  <MailingStreetAddress {...props} />
                </Grid>
              </Grid>

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: true}}>
                  <MailingCity {...props} />
                </Grid>

                <Grid tablet={{col: true}}>
                  <MailingAddressState {...props} />
                </Grid>

                <Grid tablet={{col: true}}>
                  <MailingZipCode {...props} />
                </Grid>
              </Grid>
            </>
          )}
          {/******* END BLOCK *********/}

          {/******* PREVIOUS ADDRESS BLOCK ********/}
          {props.hasPreviousAddress && (
            <>
              {prevAddressSectionField.section_alert && (//section_description
                <div className="usa-alert usa-alert--info" role="alert">
                  <div className="usa-alert__body">
                    <div className="usa-alert__text"
                         dangerouslySetInnerHTML={{__html: prevAddressSectionField.section_alert}}/>
                  </div>
                </div>)}

              <h3 className='margin-top-8'>{prevAddressSectionField.label}</h3>
              {prevAddressSectionField.instructions && (
                <div
                  dangerouslySetInnerHTML={{__html: prevAddressSectionField.instructions}}/>
              )}

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 12}}>
                  <PreviousStreetAddress {...props} />
                </Grid>
              </Grid>

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 5}}>
                  <PreviousApartmentNumber {...props} />
                </Grid>
              </Grid>

              <Grid row gap className={'flex-align-end'}>
                <Grid tablet={{col: 4}}>
                  <PreviousCity {...props} />
                </Grid>

                <Grid tablet={{col: 4}}>
                  <PreviousAddressState {...props} />
                </Grid>

                <Grid tablet={{col: 4}}>
                  <PreviousZipCode {...props} />
                </Grid>
              </Grid>
            </>
          )}
          {/******* END BLOCK *********/}
        </>
      )}
    </>
  );
}

export default Addresses;