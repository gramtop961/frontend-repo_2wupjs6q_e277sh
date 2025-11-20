import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import Schemes from './pages/Schemes'
import Complaints from './pages/Complaints'
import Dashboard from './pages/Dashboard'
import Knowledge from './pages/Knowledge'
import About from './pages/About'
import Auth from './pages/Auth'
import Profile from './pages/Profile'

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppProvider>
  )
}

export default App
