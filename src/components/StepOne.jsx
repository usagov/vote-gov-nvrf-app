import StateSelector from './StateSelector';

function StepOne(props) {
    return (
        <>
        <StateSelector statesList={props.statesList}/>
        </>
    );
}

export default StepOne;