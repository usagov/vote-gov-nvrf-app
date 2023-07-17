import content from "../../data/success-page.json";

function EmailSuccess(props) {
    return (
        <>
            <h1>{content.email_heading_main}</h1>
            <p>{content.email_text}</p>
        </>
    );
}

export default EmailSuccess;
