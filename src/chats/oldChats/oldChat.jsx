import { useEffect, useState, useRef } from "react"
import { getChatID } from "../../helper"

export function OldChat({ currentUser, otherPerson }) {
    let [isShowed, setIsShowed] = useState(false)
    let [chats, setChats] = useState([])
    let [OtherUser, setOtherUser] = useState(null)
    let inputRef = useRef(null)
    let chatID = getChatID(currentUser.uid, otherPerson)
    useEffect(() => {
        fetch('https://database-uni-backend.fly.dev/users/' + otherPerson, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((v) => {
            return v.json()
        })
            .then((v) => {
                console.log("v")
                console.log(v)
                setOtherUser(v)
            })

            .then((v) => {
                fetchChat(chatID)
            })
            .catch((e) => {
                console.log("error in user")
                console.log(e)
            })
    }, [isShowed])


    let fetchChat = id => {
        setInterval(() => {
            fetch('https://database-uni-backend.fly.dev/chat/' + id, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((v) => {
                    return v.json()
                })
                .then(v => {
                    console.log("v chats")
                    if (Array.isArray(v)) {
                        console.log(v)
                        setChats(v)
                    }
                    else {
                        setChats([v])
                    }

                })
        }, 1000)

    }

    let func = () => {
        let obj = {
            message: inputRef.current.value,
            email: currentUser.email,
            id: chatID
        }
        fetch('https://database-uni-backend.fly.dev/chat', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then((v) => {
                return v.json()
            })
            .then((v) => {
                console.log("v chats")
                console.log(v)
                setChats(v)
            })
            .catch((e) => {
                console.log("Error in chat")
                console.log(e)
            })

    }


    return (<>
        <div onClick={() => setIsShowed(!isShowed)}>Chat with {OtherUser ? OtherUser.username : ''}</div>
        <ul style={{ display: isShowed ? 'block' : 'none' }}>
            {chats.length != 0 ? chats.map((el, i) => el.message && el.email ? (
                <li key={i}>{el.email}: {el.message}</li>
            ) : '') : ''}
        </ul>
        <input type="text" ref={inputRef} name="input" placeholder="Enter Chat" />
        <button type="button" onClick={func}>Send</button>


    </>)

}
