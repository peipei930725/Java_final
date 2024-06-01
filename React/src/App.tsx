import { useState } from 'react'
import Logintest from './components/Logintest'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Logintest />
    </div>
  )
}

export default App
