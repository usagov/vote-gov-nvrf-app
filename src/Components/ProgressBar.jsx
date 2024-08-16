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

    const styles = (step) => {
      if (props.step < 6 && stepProgress(step) === "complete") {
        return "step-indicator-select"
      }
      return "step-indicator-no-select";
    }

    return (
        <>
            <div aria-live="polite" aria-atomic="true" className="usa-sr-only">{currentStepMessage}</div>
            <StepIndicator centered className="margin-top-4" headingLevel="h2">
                <StepIndicatorStep className={styles(1)} label={props.content.step_label_1} status={stepProgress(1)}
                tabIndex={stepProgress(1) === "complete" ? 0 : null}
                onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(1) === "complete") {setStep(1)}}}
                onClick={stepProgress(1) === "complete" && props.step !== 6 ? handleGoBackSteps(props.step - 1) : null}/>

                <StepIndicatorStep className={styles(2)} label={props.content.step_label_2} status={stepProgress(2)}
                tabIndex={stepProgress(2) === "complete" ? 0 : null}
                onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(2) === "complete") {setStep(2)}}}
                onClick={stepProgress(2) === "complete" && props.step !== 6 ? handleGoBackSteps(props.step - 2) : null}/>

                <StepIndicatorStep className={styles(3)} label={props.content.step_label_3} status={stepProgress(3)}
                tabIndex={stepProgress(3) === "complete" ? 0 : null}
                onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(3) === "complete") {setStep(3)}}}
                onClick={stepProgress(3) === "complete" && props.step !== 6 ? handleGoBackSteps(props.step - 3) : null}/>

                <StepIndicatorStep className={styles(4)} label={props.content.step_label_4} status={stepProgress(4)}
                tabIndex={stepProgress(4) === "complete" ? 0 : null}
                onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(4) === "complete") {setStep(4)}}}
                onClick={stepProgress(4) === "complete" && props.step !== 6 ? handleGoBackSteps(props.step - 4) : null}/>

                <StepIndicatorStep className={styles(5)} label={props.content.step_label_5} status={stepProgress(5)}
                tabIndex={stepProgress(5) === "complete" ? 0 : null}
                onKeyDown={(e) => {if (e.key === "Enter" && stepProgress(5) === "complete") {setStep(5)}}}
                onClick={stepProgress(5) === "complete" && props.step !== 6 ? handleGoBackSteps(props.step - 5) : null}/>

                <StepIndicatorStep label={props.content.step_label_6} status={stepProgress(6)}/>
            </StepIndicator>
        </>
    );
}

export default ProgressBar;