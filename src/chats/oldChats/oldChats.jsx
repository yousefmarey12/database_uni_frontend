import { useEffect, useState } from "react"
import { OldChat } from "./oldChat"
import { extractOtherUser } from "../../helper"

export function OldChats({ currentUser }) {
    let [chats, setChats] = useState([])
    let [isPending, setIsPending] = useState(false)
    useEffect(() => {
        console.log("does this rerender amazingg")
        console.log(currentUser)
        let obj = {
            uid: currentUser.uid
        }
        fetch('https://database-uni-backend.fly.dev/chats', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then((v) => {
                return v.json()
            })
            .then((v) => {
                console.log(v)

                if (Array.isArray(v)) {
                    setChats(v)
                }
                else {
                    console.log("gpp")
                    setChats([v])
                }
                console.log("my chats")
                console.log(chats)



            })
    }, [currentUser])

    useEffect(() => {
        console.log("chats")
        console.log(chats)
    }, [chats])
    return (
        <div>
            {chats.length != 0 ? chats.map((el, i) => (<OldChat key={i} currentUser={currentUser} otherPerson={extractOtherUser(currentUser.uid, el)} />)) : ''}
        </div>
    )
}