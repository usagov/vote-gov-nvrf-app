import { Button } from '@trussworks/react-uswds';

function NotNeeded(props) {
    const stateLink = props.stateData.election_website_url;
    
    return (
        <>
        <h1>Here’s what you need to know about voting in {props.state}</h1>
        <h2>{props.state} does not have voter registration.</h2>
        <p>Learn more about voting on {props.state}'s election website.</p>

        <h2>Don’t forget to vote!</h2>
        <p>Prepare to cast your vote. Explore Vote.gov to learn more about how U.S. elections are run and your voting options. </p> 

        <div className="button-container" style={{ margin:'20px' }}>
            <a href={stateLink}><Button type="button">
            Learn more about your voting options
            </Button>
            </a>
        </div>
        <div className="button-container" style={{ margin:'20px' }}>
            <a href="https://vote.gov"><Button type="button">
            Back to Vote.gov
            </Button>
            </a>
        </div>
        </>
    );
}

export default NotNeeded;