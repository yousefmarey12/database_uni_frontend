
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef } from "react";

export function Signup({ setCurrentUser }) {
    let formRef = useRef<HTMLFormElement>(null)
    console.log(import.meta.env.VITE_apiKey)
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_apiKey,
        authDomain: "fueproject-edf68.firebaseapp.com",
        databaseURL: "https://fueproject-edf68-default-rtdb.firebaseio.com",
        projectId: "fueproject-edf68",
        storageBucket: "fueproject-edf68.firebasestorage.app",
        messagingSenderId: "763646629469",
        appId: "1:763646629469:web:bbef95c456019500529fb4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    let auth = getAuth(app)
    let func = e => {

        console.log("hello ss")

        let formData = new FormData(formRef.current as HTMLFormElement)
        let obj = Object.create(null)
        formData.forEach((v, k) => {
            obj[k] = v
        })
        fetch('database_uni_project_fe /signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then((v) => {
                return v.json()
            })
            .then((v) => {



                signInWithEmailAndPassword(auth, obj.signup_email, obj.signup_password)
                    .then((v) => {
                        console.log("Logged in")
                        let obj1 = {
                            email: v.user.email,
                            uid: v.user.uid
                        }
                        setCurrentUser(obj1)

                    })
            })
            .catch((e) => {
                console.log("ERR")
                console.log(e)
            })
    }
    return (
        <form ref={formRef} onSubmit={e => {
            e.preventDefault()

        }
        } id="form_signup">
            <div id="signup">
                <h1>Sign Up</h1>
                <label htmlFor="signup_email">Email</label>
                <input id="signup_email" name="signup_email" placeholder="Enter Email" type="email" />
                <label htmlFor="signup_password">Password</label>
                <input id="signup_password" name="signup_password" placeholder="Enter Password" type="password" />

            </div>

            <button onClick={func} type="submit">Submit</button>
        </form>
    )


}