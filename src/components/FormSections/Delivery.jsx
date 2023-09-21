import { Link, Icon } from '@trussworks/react-uswds';
import "../../styles/pages/Delivery.css";
import content from "../../data/delivery.json";


function Delivery(props) {
    return (
        <>
            <h1>{content.main_heading}</h1>
            <p>{content.main_help_text}</p>
            <h3>{content.reminder_header1}</h3>
            <p>{content.reminder_text1}</p>

            <p>
                {content.mail_text}
                <br />Division of Elections State of Alaska
                <br />PO Box 110017
                <br />Juneau, AK 99811-0017
            </p>

            <p>{content.rminder_text2}</p>
            <h3>{content.voter_req_header}</h3>

            <p>{content.voter_req_parag1}</p>
            <ul>
                <li>{content.voter_req_parag1_li1}</li>
                <li>{content.voter_req_parag1_li2}</li>
            </ul>

            <p>{content.voter_req_parag2}</p>
                <ul>
                    <li>{content.voter_req_parag2_li1}</li>
                    <li>{content.voter_req_parag2_li2}</li>
                </ul>

            <h3>{content.dont_forget_header}</h3>
            <p>{content.dont_forget_parag1}</p>

            <Link className="usa-button link-button-outline" variant="unstyled" href={'https://vote.gov/'}>
            <Icon.ArrowBack aria-label="back arrow icon"/> {content.back_btn}
            </Link>

            <Link className="usa-button link-button-filled" variant="unstyled" href={props.stateData.election_website_url}>
            {content.voting_options_btn}  <Icon.ArrowForward aria-label="forward arrow icon"/>
            </Link>
        </>
    )
}

export default Delivery;