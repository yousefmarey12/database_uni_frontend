import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";

export function Login({ setCurrentUser }) {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    let formRef = useRef<HTMLFormElement>(null)

    // Your web app's Firebase configuration
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

    let func = () => {
        let formData = new FormData(formRef.current as HTMLFormElement)
        let obj = Object.create(null)
        formData.forEach((v, k) => {
            obj[k] = v
        })
        setIsLoading(true)
        signInWithEmailAndPassword(auth, obj.login_email, obj.login_password)
            .then((v) => {
                console.log("Logged in")
                let obj = {
                    email: v.user.email,
                    uid: v.user.uid
                }
                setCurrentUser(obj)
                setIsLoading(false)

            }).catch((e) => {
                setIsLoading(false)
            })
    }
    return (<form ref={formRef} id="form_login" onSubmit={(e) => {
        e.preventDefault()
        func()
    }}>
        {
            !isLoading ? (
                <div id="login">
                    <h1>Login</h1>
                    <label htmlFor="login_email">Email</label>
                    <input id="login_email" name="login_email" placeholder="Enter Email" type="email" />
                    <label htmlFor="login_password">Password</label>
                    <input id="login_password" name="login_password" placeholder="Enter Password" type="password" />
                    <button type="submit">Submit</button>

                </div>
            ) : (
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            )
        }
    </form>)
}