import styles from "./ChatTitle.module.scss";
import doneIcon from './done.png'
import editIcon from './edit.png'
import {useState} from "react";

const ChatTitle = ({title, id, chatIndex}) => {
    const [newTitle, setNewTitle] = useState(title)
    const [isDone, setIsDone] = useState(true)


    const handleNewTitle = (e) => {
        setNewTitle(e.target.value)
    }

    const toEdit = () => {
        setIsDone(false)
    }

    const toDone = () => {
        setIsDone(true)
        const data = JSON.parse(localStorage.chats)
        console.log('Старые данные - ', data)
        const chat = (data[chatIndex])
        chat['title'] = newTitle
        localStorage.chats = JSON.stringify(data)
    }
    return (
        <>
            {isDone ?
                <div className={styles.container}>
                    <div className={styles.chatTitleDone}>
                        Название чата - {title}
                        <img src={editIcon} alt={'editIcon'} className={styles.icon} onClick={() => toEdit()}/>

                        , ID - {id}
                    </div>
                </div>
                :
                <div className={styles.container}>
                    <div className={styles.chatTitleEdit}>
                        <input type={"text"} className={styles.inputNewTitle} onChange={(e) => handleNewTitle(e)}/>
                        <img src={doneIcon} alt={'doneIcon'} className={styles.icon} onClick={() => toDone()}/>

                    </div>
                </div>
            }


        </>

    )
}

export default ChatTitle