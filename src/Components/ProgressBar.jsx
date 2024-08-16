import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';

function ProgressBar(props) {
    const stepMessage = {
        1: `Step one of six: ${props.content.step_label_1}`,
        2: `Step two of six: ${props.content.step_label_2}`,
        3: `Step three of six: ${props.content.step_label_3}`,
        4: `Step four of six: ${props.content.step_label_4}`,
        5: `Step five of six: ${props.content.step_label_5}`,
        6: `Step six of six: ${props.content.step_label_6}`,
    };
    let currentStepMessage = stepMessage[props.step];

    const stepProgress = (count) => {
        if (props.step === count) {
          return "current"
        }
        else if (props.step > count) {
          return "complete"
        }
        else null
      }

    const handleGoBackSteps = props.handleGoBack;

    const setStep = props.setStep;

    const finalStep = Object.keys(stepMessage).length;

    const styles = (step) => {
      if (props.step < finalStep && stepProgress(step) === "complete") {
        return "step-indicator-select"
      }
      return "step-indicator-no-select";
    }

    return (
        <>
            <div aria-live="polite" aria-atomic="true" className="usa-sr-only">{currentStepMessage}</div>
            <StepIndicator centered className="margin-top-4" headingLevel="h2">

                {Object.keys(stepMessage)
                  .map((step) => parseInt(step)) // step is originally a string, so convert to int 
                  .map((step) => (

                  <StepIndicatorStep key={step} className={styles(step)} label={props.content[`step_label_${step}`]} status={stepProgress(step)}
                  tabIndex={stepProgress(step) === "complete" ? 0 : null}
                  onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(step) === "complete") {setStep(step)}}}
                  onClick={stepProgress(step) === "complete" && props.step !== finalStep ? handleGoBackSteps(props.step - step) : null}/>

                ))}

            </StepIndicator>
        </>
    );
}

export default ProgressBar;