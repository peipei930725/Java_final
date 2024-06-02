import { useState } from 'react'
import './App.css'
import AddGroup from './components/AddGroup'
import AddTransfer from './components/AddTransfer'
import AddCtrl from './components/AddCtrl'
import ModalCtrl from './components/ModalCtrl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AddCtrl />
      {/* <AddGroup />
      <AddTransfer /> */}
    </div>
  )
}

export default App
