import styles from "../styles/CardInfo.module.css";

function CardInfo(props) {
    return (
        <>
        <div className={styles['card']}>
            <div className={styles['content-container']}>
                <div className={styles['text-container']}>
                <h3>{props.header}</h3>
                <p>{props.paragraph}</p>
                </div>
                <div className={styles['button-container']}>
                    {props.button}
                </div>
            </div>
        </div>
        </>
    );
}

export default CardInfo;