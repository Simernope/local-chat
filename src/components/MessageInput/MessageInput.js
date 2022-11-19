import styles from './MessageInput.module.scss'
import sendIcon from "../Chat/send.png";
import smile from './smile.png'
import Picker from 'emoji-picker-react';
import {useState} from "react";

const MessageInput = ({chatIndex, name}) => {
    const [message, setMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false);


    const handleMessage = (e) => {
        setMessage(e.target.value)
        //console.log(message)
    }

    const toSendMessage = () => {
        if (message) {
            console.log(message)
            const oldData = JSON.parse(localStorage.chats)
            console.log('Старые данные - ', oldData)
            const chat = (oldData[chatIndex])
            let date = new Date()
            date = date.toLocaleTimeString();
            console.log('Нужный мне чат - ', chat)
            if (chat.messages === undefined) {
                chat['messages'] = [{belongs: name, id: 0, text: message, time: date},]
                console.log('Нужный мне чат c новыми данными- ', chat)
                const newDataInChat = (JSON.stringify(chat))
                console.log('обновленные данные', newDataInChat)
                oldData[chatIndex] = JSON.parse((newDataInChat))
                console.log('Старые данные + новые', oldData)
                localStorage.chats = JSON.stringify(oldData)
                setMessage('')


            } else {
                console.log(chat['messages'])
                const oldMessages = chat['messages']
                oldMessages[oldMessages.length] = {
                    belongs: sessionStorage.sessionName,
                    id: oldMessages.length,
                    text: message,
                    time: date
                }
                chat['messages'] = oldMessages
                console.log('Старые данные + новые', oldData)
                localStorage.chats = JSON.stringify(oldData)
                setMessage('')

            }
            setShowPicker(false)

        } else {
            console.log('пустое сообщение')
        }
    }

    return (
        <>
            <div className={styles.containerMessage}>
                <input type={'text'} name={'message'} className={styles.input} value={message}
                       onChange={(e) => handleMessage(e)}/>

                <div onClick={() => setShowPicker(val => !val)}>
                    <img
                        src={smile}

                        className={styles.sendIcon}
                        alt={'smile'}
                    />
                </div>
                <div onClick={() => toSendMessage()}>
                    <img src={sendIcon} className={styles.sendIcon} alt='sendIcon'/>

                </div>


            </div>


            {showPicker && <Picker
                pickerStyle={{width: '100%'}}
                onEmojiClick={(emojiObject) => setMessage((prevMsg) => prevMsg + emojiObject.emoji)}/>}
        </>

    )
}

export default MessageInput