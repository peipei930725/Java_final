import { useState } from 'react'
import Logintest from './components/Logintest'
import './App.css'
import ModalSignup from './components/ModalSignup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ModalSignup />
    </div>
  )
}

export default App
