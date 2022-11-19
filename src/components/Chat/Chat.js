import styles from './Chat.module.scss'
import Message from "../Message/Message";
import {useEffect, useRef, useState} from "react";
import ChatTitle from "../ChatTitle/ChatTitle";
import MessageInput from "../MessageInput/MessageInput";

const Chat = ({messages, chatIndex, name, title, chatId}) => {

    const [messagesInState, setMessagesInState] = useState(undefined)
    const [chatTitle, setChatTitle] = useState(undefined)

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect((() => {
        setMessagesInState(messages)
        setChatTitle(title)
        let oldMessagesLength = 0
        let oldTitle = ''
        setInterval(() => {

            const oldData = JSON.parse(localStorage.chats)
            //console.log('Старые данные - ', oldData)
            const chat = (oldData[chatIndex])
            //console.log('chat', chat)
            const messages = chat['messages']
            //console.log('messages', messages)
            if (messages) {
                const messagesLength = messages.length
                //console.log('messagesLength', messagesLength)
                if (oldMessagesLength < messagesLength) {
                    oldMessagesLength = messagesLength
                    //console.log('OldMessagesLength', oldMessagesLength)
                    //console.log('Новое сообщение!')
                    setMessagesInState(messages)
                    scrollToBottom()
                } else {
                    //console.log('Новых сообщений нет')
                }
            }


            const newTitle = chat['title']
            if (oldTitle === newTitle) {
                //console.log('обычный title')
            } else {
                oldTitle = newTitle
                setChatTitle(newTitle)
                //console.log('title изменили')
            }
        }, 1000);

    }), [messages, chatIndex, title])


    return (
        <>
            <ChatTitle title={chatTitle} chatIndex={chatIndex} id={chatId}/>

            <div className={styles.container}>
                <div className={styles.items}>

                    {messagesInState && messagesInState.map(({text, belongs, id, time}) => (
                        <div className={`
                         
                                ${name === belongs ? styles.items_myMessage : styles.notMyMessage}
                                
                                `} key={id}>
                            <Message name={belongs} messageText={text} time={time}/>
                            <div ref={messagesEndRef}/>

                        </div>
                    ))}

                    {!messagesInState &&
                        <div>
                            Сообщений нет
                        </div>

                    }


                </div>

            </div>

            <MessageInput name={name} chatIndex={chatIndex}/>
        </>

    )
}

export default Chat