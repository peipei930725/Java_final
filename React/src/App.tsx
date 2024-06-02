import { useState } from 'react'
import './App.css'
import AddGroup from './components/CreateGroup'
import AddTransfer from './components/AddTransfer'
import AddCtrl from './components/AddCtrl'
import ModalCtrl from './components/ModalCtrl'
import History from './components/History'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <History />
      {/* <AddGroup />
      <AddTransfer /> */}
    </div>
  )
}

export default App
