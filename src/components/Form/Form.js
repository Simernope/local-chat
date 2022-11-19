import styles from './Form.module.scss'
import Button from "../Button/Button";
import {useState} from "react";
import Chat from "../Chat/Chat";

const Form = ({title}) => {

    const [chatId, setChatId] = useState('')
    const [chatIndex, setChatIndex] = useState(undefined)
    const [name, setName] = useState('')
    const [isChatFound, setIsChatFound] = useState(false)
    const [isTriedToFind, setIsTriedToFind] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState(undefined)
    const [chatTitle, setChatTitle] = useState(undefined)

    const handleNickName = (e) => {
        setIsChatFound(false)
        setName(e.target.value)
    }
    const handleChatId = (e) => {
        setChatIndex('')
        setIsChatFound(false)
        setIsTriedToFind(false)
        setChatId(e.target.value)
    }
    const handleChatIndex = () => {
        setIsTriedToFind(true)
        console.log(1)
        if (chatId && name) {
            if (localStorage.chats !== undefined) {
                const localStorageJson = JSON.parse(localStorage.chats)
                console.log('localStorage', localStorageJson)
                const chatsId = localStorageJson.map(el => parseInt(el.id))
                //console.log('chatsId', chatsId)
                if (chatsId.includes(parseInt(chatId))) {
                    setChatIndex(chatsId.indexOf(parseInt(chatId)))
                    setIsChatFound(true)
                    //console.log('found', chatIndex)
                }
            } else {
                setIsChatFound(false)
                //console.log('not found')
            }
            //console.log(chatId)

        }
    }

    const createNewChat = (chatId, name) => {
        if (chatId && name) {

            if (localStorage.chats) {
                let oldChats = JSON.parse(localStorage.chats)
                let chatsLength = (JSON.parse(localStorage.chats)).length
                oldChats[chatsLength] = {id: chatId, users: [{name: name}], title: 'Безымянный'}
                localStorage.chats = JSON.stringify(oldChats)
                setMessages(oldChats[chatsLength].messages)
                setChatTitle('Безымянный')
                setChatIndex((JSON.parse(localStorage.chats)).length - 1)
            } else {

                localStorage.chats = JSON.stringify([{id: chatId, users: [{name: name}], title: 'Безымянный'}])
                setMessages('')
                setChatTitle('Безымянный')
                setChatIndex(0)

            }

            setIsConnected(true)
            sessionStorage.sessionName = name
            //console.log('chatIndex', chatIndex, 'messages', messages, sessionStorage.sessionName)

        }
    }

    const toConnectToChat = (chatId, name) => {
        if (chatId && name) {

            let oldData = localStorage.chats
            oldData = JSON.parse(oldData)
            //console.log(oldData)

            const usersLength = (oldData[chatIndex]).users.length
            //console.log(oldData.length, oldData[chatIndex].messages)
            setMessages(oldData[chatIndex].messages)
            setChatTitle(oldData[chatIndex].title)
            //console.log(oldData[chatIndex].title)

            const oldUsers = oldData[chatIndex].users.map(el => (el.name))

            //console.log('oldUsers', oldUsers)
            //console.log('users includes', oldUsers.includes(name))
            if (!oldUsers.includes(name)) {
                oldData[chatIndex].users[usersLength] = {name: name}
            }
            localStorage.chats = JSON.stringify(oldData)
            //console.log(oldData)

            setIsConnected(true)
            sessionStorage.sessionName = name
            setChatIndex(chatIndex)

            //console.log('chatIndex', chatIndex, 'messages', messages, sessionStorage.sessionName)


        }
    }
    return (
        <>
            <div className={styles.container}>
                {title}
                <div className={styles.inputs}>
                    <input name='chatID' type="text" value={chatId}
                           placeholder='Введите или придумайте чат ID' className={styles.item}
                           onChange={(e) => handleChatId(e)}/>

                    <input name='name' type="text" value={name}
                           placeholder='Введите NickName' className={styles.item}
                           onChange={(e) => handleNickName(e)}/>
                </div>

                {chatId && name && isChatFound && !isConnected ?
                    <>
                        <div className={styles.notification}>
                            Чат найден с идентефикатором - {chatId}
                        </div>
                        <div className={styles.buttons}>
                            <div className={styles.item}>
                                <Button text='Найти чат' status={'disabled'}/>
                            </div>
                            <div className={styles.item}>
                                <Button text='Создать чат' status={'disabled'}/>
                            </div>
                            <div className={styles.item} onClick={() => toConnectToChat(chatId, name)}>
                                <Button text='Подключиться'/>
                            </div>
                        </div>
                    </>
                    :
                    chatId && name && isConnected ?
                        <>
                            <div className={styles.notification}>
                                Подключено! Чат с идентефикатором - {chatId}
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.item}>
                                    <Button text='Найти чат' status={'disabled'}/>
                                </div>
                                <div className={styles.item}>
                                    <Button text='Создать чат' status={'disabled'}/>
                                </div>
                                <div className={styles.item}>
                                    <Button text='Подключиться' status={'disabled'}/>
                                </div>
                            </div>
                        </>
                        :
                        !chatId || !name ?
                            <>
                                <div className={styles.buttons}>
                                    <div className={styles.item}>
                                        <Button text='Найти чат' status={'disabled'}/>
                                    </div>
                                    <div className={styles.item}>
                                        <Button text='Создать чат' status={'disabled'}/>
                                    </div>
                                    <div className={styles.item}>
                                        <Button text='Подключиться' status={'disabled'}/>
                                    </div>
                                </div>
                            </>
                            :
                            chatId && name && !isChatFound && isTriedToFind ?
                                <>
                                    <div className={styles.notification}>
                                        Чат не найден, вы можете создать его
                                    </div>
                                    <div className={styles.buttons}>
                                        <div className={styles.item}>
                                            <Button text='Найти чат' status={'disabled'}/>
                                        </div>
                                        <div className={styles.item} onClick={() => createNewChat(chatId, name)}>
                                            <Button text='Создать чат'/>
                                        </div>
                                        <div className={styles.item}>
                                            <Button text='Подключиться' status={'disabled'}/>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.buttons}>
                                        <div className={styles.item} onClick={() => handleChatIndex()}>
                                            <Button text='Найти чат'/>
                                        </div>
                                        <div className={styles.item}>
                                            <Button text='Создать чат' status={'disabled'}/>
                                        </div>
                                        <div className={styles.item}>
                                            <Button text='Подключиться' status={'disabled'}/>
                                        </div>
                                    </div>
                                </>

                }


            </div>
            {
                isConnected && chatTitle &&
                <Chat chatIndex={chatIndex} messages={messages} name={name} title={chatTitle} chatId={chatId}/>
            }

        </>
    )
}

export default Form