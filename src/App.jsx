import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Login } from './auth/login'
import { Signup } from './auth/signup'
import './App.css'
import { OldChats } from './chats/oldChats/oldChats'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <>
      <div>
        <div style={{ display: !currentUser ? 'block' : 'none' }}>
          <Login setCurrentUser={setCurrentUser} />
          <Signup setCurrentUser={setCurrentUser} />
        </div>
        <div style={{ display: currentUser ? 'block' : 'none' }}>
          {currentUser ? <OldChats currentUser={currentUser} /> : <span></span>}
        </div>


        <button style={{ display: currentUser ? 'block' : 'none' }} onClick={() => setCurrentUser(null)} type="button" id="toggle">Signout</button>
      </div>
    </>
  )
}

export default App
