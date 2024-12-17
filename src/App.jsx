import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import Routers from './routers/Routers';
import LandingPage from './pages/LandingPage';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routers />
    </>
  )
}

export default App
