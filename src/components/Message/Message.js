import styles from './Message.module.scss'

const Message = ({name, messageText, time}) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.messageText}>
                    {messageText}
                </div>
                <div className={styles.time}>
                    {time}
                </div>
            </div>
        </>
    )
}

export default Message