import { useState, useEffect } from 'react'
import { Label, Dropdown, Button, ProcessList, ProcessListItem, ProcessListHeading, Grid } from '@trussworks/react-uswds';
import CardInfo from "./CardInfo";
import { checkForErrors } from './HelperFunctions/ValidateField';
import { fetchData } from './HelperFunctions/JsonHelper';

function StateSelection(props) {
    const [states, setState] = useState('');
    useEffect(() => {
        fetchData("states.json", setState);
    }, []);

    const stateLink = props.stateData.election_website_url;
    const statesList = []
    for (let i = 0; i < states.length; i++) {
        let stateName = states[i].name;
        statesList.push(stateName);
    };

    const [handleErrors, setHandleErrors] = useState({
        state_selected: false
    })

    return (
        <>
        <a href="https://vote.gov">
            <Button type="button" onClick={props.handlePrev}>
                Back to Vote.gov
            </Button>
        </a>

        <h2>Register to vote</h2>
        <p>Here’s a simple way to fill out the National Mail Voter Registration Form to print and mail. U.S. citizens may use it to register for the first time or to update your registration related to a change of name, change of address or to register with a political party.</p> 

        <h3>Four quick steps to register to vote or make a change</h3>
        <p>Review the steps below to understand what to expect. Vote.gov has created a digital form to help you register. To get started, select your state or territory to see your state’s registration requirements and instructions relevant to you. </p>

        <ProcessList>
            <ProcessListItem>
            <ProcessListHeading type="h4">
                Check your registration eligibility
            </ProcessListHeading>
            <p>
                Confirm that you’re eligible to vote by reviewing requirements when you select the state or territory where you live.
            </p>
            </ProcessListItem>
            <ProcessListItem>
            <ProcessListHeading type="h4">
                Fill out the National Voter Registration Form online
            </ProcessListHeading>
            <p>
                Choose your path to update your registration or to begin a new registration. Fill out the digital registration form by answering a few questions. This form should take you between 5 to 10 minutes.
            </p>
            </ProcessListItem>
            <ProcessListItem>
            <ProcessListHeading type="h4">
                Confirm all information is correct
            </ProcessListHeading>
            <p>
                Double check that all your information is correct. You'll have the chance to make any necessary edits before printing your form.
            </p>
            </ProcessListItem>
            <ProcessListItem>
            <ProcessListHeading type="h4">
                Print, sign, and mail to your election office
            </ProcessListHeading>
            <p>
                Don’t forget these last steps! You will need to print your completed form, sign it, attach any required copies of valid identification documents, and mail it to your state office. We’ll provide the address; you provide the postage.
            </p>
            </ProcessListItem>
        </ProcessList>

        <h3>This form is not recommended for some people</h3>
        <p>Please do not use this application if you live outside the United States and its territories and have no home (legal) address in this country, or if you are in the military stationed away from home. Use the <a href="https://www.fvap.gov/uploads/FVAP/Forms/fpca.pdf">Federal Postcard Application</a>, which is also available to you from military bases, American embassies, or consular offices.</p>

        <hr />
        <h2>Ready to get started?</h2>
        <h3>Select your state then choose your path</h3>

        <form onSubmit={(e) => {props.handleSubmit(e), props.handleNext()}}>
        <div className='state-dropdown'>
        <div className={handleErrors.state_selected ? 'error-container' : ''}>
            <Label htmlFor="state-dropdown-error">Home state or territory{handleErrors.state_selected && <span className='required-text'>*</span>}
            <div>
                <Dropdown
                    id="state-dropdown"
                    name="input-dropdown"
                    value={props.state}
                    required={true}
                    onChange={e => {
                        props.getSelectedState(e.target.value)
                    }}
                    onBlur={(e) => setHandleErrors({ state_selected: checkForErrors(e, 'check state selection') })}
                    >
                    <option value="">Select your state or territory</option>
                    {statesList.map(
                    state => <option key={state} value={state}>{state}</option>
                )}
                </Dropdown>
            </div>
            {handleErrors.state_selected &&
                <span id="state-dropdown-error" role="alert" className='error-text'>
                    State or territory selection must be made.
                </span>
            }
            </Label>
        </div>
        </div>

            <Grid row gap className='cards-container'>
                <CardInfo
                    header={"Click to view eligibility and begin your registration"}
                    paragraph={"Select your home state or territory to view your state’s eligibility requirements. As you continue through the form, you will see state-specific instructions for filling out your information."}
                    button={"Continue to check registration eligibility"}
                    role={"button"}
                    >
                </CardInfo>
                <CardInfo
                    header={"Not sure if you are already registered?"}
                    paragraph={"Save time by checking your current registration status on your state’s election website. Be sure to select your state in the dropdown menu above."}
                    button={"Visit your state election website"}
                    stateLink={stateLink}
                    role={"link"}
                    >
                </CardInfo>
            </Grid>
            </form>
        </>
    );
}

export default StateSelection;