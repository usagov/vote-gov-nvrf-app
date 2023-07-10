import styles from "../styles/CardSelect.module.css";

function CardSelect(props) {
    return (
        <>
        <div className={styles[props.cardStyle]}>
            <div className={styles['card-content']}>
            <div>
                <img src={props.iconPath}></img>
            </div>
            <div className={styles['text']}>{props.text}</div>
            </div>
        </div>
        </>
    );
}

export default CardSelect;