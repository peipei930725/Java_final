import { useState } from 'react'
import './App.css'
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
