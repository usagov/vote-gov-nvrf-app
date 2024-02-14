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

    return (
        <>
            <div aria-live="polite" aria-atomic="true" className="usa-sr-only">{currentStepMessage}</div>
            <StepIndicator centered className="margin-top-4" headingLevel="h2">
                <StepIndicatorStep label={props.content.step_label_1} status={stepProgress(1)}/>
                <StepIndicatorStep label={props.content.step_label_2} status={stepProgress(2)}/>
                <StepIndicatorStep label={props.content.step_label_3} status={stepProgress(3)}/>
                <StepIndicatorStep label={props.content.step_label_4} status={stepProgress(4)}/>
                <StepIndicatorStep label={props.content.step_label_5} status={stepProgress(5)}/>
                <StepIndicatorStep label={props.content.step_label_6} status={stepProgress(6)}/>
            </StepIndicator>
        </>
    );
}

export default ProgressBar;