import { useEffect, useState } from "react"
import { OldChat } from "./oldChat"
import { extractOtherUser } from "../../helper"

export function OldChats({ currentUser }) {
    let [chats, setChats] = useState([])
    let [isPending, setIsPending] = useState(false)
    useEffect(() => {

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


                if (Array.isArray(v)) {
                    setChats(v)
                }
                else {

                    setChats([v])
                }




            })
    }, [currentUser])


    return (
        <div>
            {chats.length != 0 ? chats.map((el, i) => (<OldChat key={i} currentUser={currentUser} otherPerson={extractOtherUser(currentUser.uid, el)} />)) : ''}
        </div>
    )
}