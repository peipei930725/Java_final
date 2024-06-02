import { useState } from 'react'
import './App.css'
import AddGroup from './components/Page/CreateGroup'
import AddTransfer from './components/Page/AddTransfer'
import AddCtrl from './components/Page/AddCtrl'
import ModalCtrl from './components/ModalCtrl'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Main />
      {/* <AddGroup />
      <AddTransfer /> */}
    </div>
  )
}

export default App
