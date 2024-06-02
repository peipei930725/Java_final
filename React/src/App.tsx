import { useState } from 'react'
import './App.css'
import ModalCtrl from './components/ModalCtrl'
import AddTransfer from './components/AddTransfer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AddTransfer onToggleModal={true}/>
    </div>
  )
}

export default App
