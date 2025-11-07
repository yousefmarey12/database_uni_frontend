import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRef } from "react";

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

    let func = () => {
        let formData = new FormData(formRef.current as HTMLFormElement)
        let obj = Object.create(null)
        formData.forEach((v, k) => {
            obj[k] = v
        })
        signInWithEmailAndPassword(auth, obj.login_email, obj.login_password)
            .then((v) => {
                console.log("Logged in")
                let obj = {
                    email: v.user.email,
                    uid: v.user.uid
                }
                setCurrentUser(obj)

            })
    }
    return (<form ref={formRef} id="form_login" onSubmit={(e) => {
        e.preventDefault()
        func()
    }}>
        <div id="login">
            <h1>Login</h1>
            <label htmlFor="login_email">Email</label>
            <input id="login_email" name="login_email" placeholder="Enter Email" type="email" />
            <label htmlFor="login_password">Password</label>
            <input id="login_password" name="login_password" placeholder="Enter Password" type="password" />
            <button type="submit">Submit</button>

        </div>
    </form>)
}