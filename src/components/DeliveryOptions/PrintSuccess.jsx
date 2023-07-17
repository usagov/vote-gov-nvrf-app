import content from "../../data/success-page.json";

function PrintSuccess(props) {
    return (
        <>
             <h1>{content.print_heading_main}</h1>
            <p>{content.print_text}</p>
        </>
    );
}

export default PrintSuccess;