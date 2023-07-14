import styles from "../styles/CardSelect.module.css";

function CardSelect(props) {
    return (
        <>
        <div className={styles[props.cardStyle]} tabIndex="0">
            <div className={styles['card-content']}>
            <div>
                <img role="none" src={props.iconPath}></img>
            </div>
            <div className={styles['text']}>{props.text}</div>
            </div>
        </div>
        </>
    );
}

export default CardSelect;