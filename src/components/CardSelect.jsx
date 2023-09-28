import "../styles/components/CardSelect.css";

function CardSelect(props) {
    return (
        <>
        <div className={props.cardStyle}>
            <div className='card-content'>
            <div>
                <img role="none" src={props.iconPath}></img>
            </div>
            <div className='text'>{props.text}</div>
            </div>
        </div>
        </>
    );
}

export default CardSelect;