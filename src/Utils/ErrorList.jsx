import React, { useState, useEffect } from "react";

function ErrorList({ formSubmitted }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const checkError = () => {
      if (formSubmitted) {
        const errorContainers = document.querySelectorAll('.vote-error-container');
        if (errorContainers.length > 0) {
          const errorMessages = Array.from(errorContainers).map((container) => {
            const errorTexts = Array.from(container.querySelectorAll('span.vote-error-text'));
            const inputElement = container.querySelector('input');
            return errorTexts.map((errorText) => ({
              id: inputElement.id,
              text: errorText.textContent,
            }));
          }).flat();
          setErrorMessages(errorMessages);
          setHasError(true);
        } else {
          setErrorMessages([]);
          setHasError(false);
        }
      }
    };

    checkError();

    const intervalId = setInterval(checkError, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [formSubmitted]); // update the dependency to include formSubmitted

  useEffect(() => {
    if (hasError) {
      const errorListContainer = document.querySelector('.usa-alert--error');
      if (errorListContainer) {
        errorListContainer.focus();
      }
    }
  }, [hasError]);

  return (
    <React.Fragment>
      {hasError && (
        <div
          className="usa-alert usa-alert--error"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          tabIndex={-1}
        >
          <div className="usa-alert__body">
            <h4 className="usa-alert__heading" id="error-list-title">
              Errors
            </h4>
            <ul>
              {errorMessages.map((errorMessage, index) => (
                <li key={index}>
                  <a
                    href={`#${errorMessage.id}`}
                    role="link"
                    tabIndex={0}
                  >
                    {errorMessage.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ErrorList;