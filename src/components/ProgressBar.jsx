import { StepIndicator, StepIndicatorStep } from '@trussworks/react-uswds';

function ProgressBar(props) {
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
        <StepIndicator className="margin-top-6" counters="small" headingLevel="h2">
            <StepIndicatorStep status={stepProgress(1)}/>
            <StepIndicatorStep status={stepProgress(2)}/>
            <StepIndicatorStep status={stepProgress(3)}/>
            <StepIndicatorStep status={stepProgress(4)}/>
            <StepIndicatorStep status={stepProgress(5)}/>   
            <StepIndicatorStep status={stepProgress(6)}/>   
        </StepIndicator>        
        </>
    );
}

export default ProgressBar;