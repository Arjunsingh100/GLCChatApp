import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Chat />}/>
      </Routes>
    </>
  )
}

export default App
