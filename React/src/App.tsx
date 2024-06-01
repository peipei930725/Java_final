import { useState } from 'react'
import Logintest from './components/Logintest'
import './App.css'
import ModalSignup from './components/ModalSignup'
import ModalCtrl from './components/ModalCtrl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ModalCtrl />
    </div>
  )
}

export default App
