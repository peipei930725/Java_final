import { useState } from 'react'
import './App.css'
import ModalCtrl from './components/ModalCtrl'
import ModalSignup from './components/ModalSignup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ModalSignup onToggleModal={true} />
    </div>
  )
}

export default App
