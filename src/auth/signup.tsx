
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";

export function Signup({ setCurrentUser }) {
    let formRef = useRef<HTMLFormElement>(null)

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
    let [isLoading, setIsLoading] = useState(false)
    let func = e => {



        let formData = new FormData(formRef.current as HTMLFormElement)
        let obj = Object.create(null)
        formData.forEach((v, k) => {
            obj[k] = v
        })
        setIsLoading(true)
        fetch('https://database-uni-backend.fly.dev/signup', {
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
                        setIsLoading(false)
                    })
            })
            .catch((e) => {
                console.log("ERR")
                console.log(e)
                setIsLoading(false)
            })
    }
    return (
        <form ref={formRef} onSubmit={e => {
            e.preventDefault()

        }
        } id="form_signup">
            {!isLoading ? (
                <div id="signup">
                    <h1>Sign Up</h1>
                    <label htmlFor="signup_email">Email</label>
                    <input id="signup_email" name="signup_email" placeholder="Enter Email" type="email" />
                    <label htmlFor="signup_password">Password</label>
                    <input id="signup_password" name="signup_password" placeholder="Enter Password" type="password" />

                </div>
            ) : <Oval
                height={80}
                width={80}
                color="#4fa94d"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />}


            <button onClick={func} type="submit">Submit</button>
        </form>
    )


}