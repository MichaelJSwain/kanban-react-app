import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './KanbanBoard'
import Navbar from './Navbar'
import { useGlobalContext } from './appContext'
import Modal from './Modal'
import WelcomeScreen from './WelcomeScreen'

function App() {
  const [count, setCount] = useState(0)
  const {user, isShowingModal, modalView} = useGlobalContext();

  return (
    <>
      <Navbar />
      { user ?
        <KanbanBoard/> : <WelcomeScreen />
      }
      
      {isShowingModal && <Modal>{modalView}</Modal>}
    </>
  )
}

export default App
