// DataProvider.js
import { createContext, useEffect, useState } from 'react'
import { useFetchData } from 'Utils/useFetchData';
import { Alert } from '@trussworks/react-uswds';
import loadPdf from 'Utils/pdfLoader'

// Data context and provider component
const DataContext = createContext();

const currentStateId = document.getElementById('root').getAttribute('data-stateId');
const lang = document.documentElement.lang;
const locale = lang !== "en" ? `/${lang}` : '';

const DataProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [form, setForm] = useState(null);
  const pageContent = useFetchData(`${locale}/nvrf/assets/pages.json`);
  const stateContent = useFetchData(`${locale}/nvrf/assets/state/${currentStateId}/data.json`, '', true);
  const stringContent = useFetchData(`${locale}/nvrf/assets/strings.json`, '6f8bb721-f017-4fcc-a826-dfc93c6759b7');
  const statesContent = useFetchData(`${locale}/nvrf/assets/states.json`);
  const cardContent = useFetchData(`${locale}/nvrf/assets/cards.json`);
  const fieldContent = useFetchData(`${locale}/nvrf/assets/fields.json`);

  useEffect(() => {
    loadPdf().then(({pdfDoc, form}) => {
      setPdfDoc(pdfDoc);
      setForm(form);
    }).catch(() => setError(true));
  }, []);

  let isLoading = pageContent.isLoading
    || stateContent.isLoading
    || stringContent.isLoading
    || statesContent.isLoading
    || cardContent.isLoading
    || fieldContent.isLoading;
  let isError = pageContent.isError
    || stateContent.isError
    || stringContent.isError
    || statesContent.isError
    || cardContent.isError
    || fieldContent.isError || error;

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div>
        <Alert type="error" heading="Error" headingLevel="h1">
          <p>The form filler tool failed to load.</p>
        </Alert>
        <p>
          <button className={'usa-button'}
                  onClick={() => window.location.reload()}>Try loading the tool again
          </button>
        </p>
        <p>If you were unable to use our form filler tool, <a
          href="https://touchpoints.app.cloud.gov/touchpoints/c169d3b2/submit"
          target="_blank">submit feedback</a>.</p>
      </div>
    );
  }

  const stepContent = stringContent.data.step.reduce((acc, item) => {
    acc[item.step_id] = {
      label: item.step_label,
      back_button_label: item.back_button_label,
      next_button_label: item.next_button_label,
      aria_label: item.step_aria_label,
      edit_button_aria_label: item.edit_aria_label,
    }
    return acc;
  }, {});

  return (
    <DataContext.Provider
      value={{ pageContent, stateContent, stringContent, statesContent, cardContent, fieldContent, stepContent, pdfDoc, form }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };