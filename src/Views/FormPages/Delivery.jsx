import {Button, Grid} from '@trussworks/react-uswds';
import {renderToStaticMarkup} from "react-dom/server";
import { DataContext } from 'Context/DataProvider';
import GenerateFilledPDF from 'Utils/GenerateFilledPDF';
import {sanitizeDOM} from 'Utils/JsonHelper';
import { useContext } from 'react'

function Delivery(props) {
  const { pdfDoc, form } = useContext(DataContext);
  const content = props.content;
  const state = props.stateData;
  const strings = props.strings;

  // Add A/B Message randomization.
  // example: const reminderMessage = randomProperty(content.reminder_messages);
  const randomProperty = function (obj) {
    const keys = Object.keys(obj);
    const key = keys[keys.length * Math.random() << 0];
    return {
      "key": key,
      "value": obj[key]
    };
  };

  //Analytics values - do not change or translate
  const analyticsLabels = {
    pdfTabButton: "NVRF_button_pdf_tab",
    pdfDownloadButton: "NVRF_button_download"
  }

  if (content) {
    const delivery = content.find(item => item.uuid === "229f283c-6a70-43f6-a80f-15cfa158f062");
    const deliveryBody = sanitizeDOM(delivery.body.replace("@state_name", props.stateData.name).replace("@mailing_address_inst", state.mailing_address_inst));
    const deliveryBodyParts = deliveryBody.split('@download_mail-in_form_button');
    const deliveryBodyPartsSplit = deliveryBodyParts[0].split('@print_mail-in_form_button');

    const iconCheckmark = <svg aria-hidden="true" focusable="false" width="49"
                               height="48" viewBox="0 0 49 48" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.3497 23.0564L16.9974 22.7041L16.6439 23.0552L15.2239 24.4652L14.8678 24.8187L15.2226 25.1736L20.8126 30.7636L21.1662 31.1171L21.5197 30.7636L33.5197 18.7636L33.8733 18.41L33.5197 18.0564L32.1097 16.6464L31.7563 16.2931L31.4028 16.6463L21.1663 26.8731L17.3497 23.0564Z"
        fill="#5CBF72" stroke="#5CBF72"/>
      <circle cx="24.5762" cy="24" r="22" stroke="#5CBF72" strokeWidth="4"/>
    </svg>

    const mailinDeadline = () => (
      <p><strong>{strings.mail_deadline_label}</strong> <span
        dangerouslySetInnerHTML={{__html: state.postmarked_mail_deadline || state.received_mail_deadline}}/>
      </p>
    );

    return (
      <>
        <Grid row>
          <Grid col={1}>{iconCheckmark}</Grid>
          <Grid col={11} className={'padding-left-2'}>
            <h1 style={{fontSize: '2rem'}}
                data-test="addressConfirm">{delivery.title.replace("@state_name", props.stateData.name)}</h1>
          </Grid>
        </Grid>

        <div className={'margin-top-2'}
             dangerouslySetInnerHTML={{__html: deliveryBodyPartsSplit[0]}}/>

        <Button data-test="pdfBtnNewTab"
                onClick={() => {
                  GenerateFilledPDF('newTab', props.fieldData, props.stateData.nvrf_pages_list, pdfDoc, form);
                  dataLayer.push({
                    'NVRF_button_click': analyticsLabels.pdfTabButton,
                    'event': "NVRF_PDF_BUTTON_CLICK"
                  });
                }}
                type="submit">
          <span>{strings.print_button_label}</span>
        </Button>

        <div className={'margin-top-2'}
             dangerouslySetInnerHTML={{__html: deliveryBodyPartsSplit[1]}}/>

        <Button data-test="pdfBtnDownload"
                onClick={() => {
                  GenerateFilledPDF('download', props.fieldData, props.stateData.nvrf_pages_list, pdfDoc, form);
                  dataLayer.push({
                    'NVRF_button_click': analyticsLabels.pdfDownloadButton,
                    'event': "NVRF_PDF_BUTTON_CLICK"
                  });
                }} type="submit">
          <span>{strings.download_button_label}</span>
        </Button>

        <div className={'margin-top-6'}
             dangerouslySetInnerHTML={{__html: deliveryBodyParts[1].replace('@mail_deadline', renderToStaticMarkup(mailinDeadline()))}}/>
      </>
    );
  }
}

export default Delivery;