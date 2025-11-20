import { Routes, Route, Link } from 'react-router-dom'
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

function TopBar(){
  return (
    <div className="bg-[#FAF9F6] border-b border-black/5">
      <div className="container mx-auto px-6 py-2 text-xs flex gap-4 overflow-x-auto">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/schemes">Schemes</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/dashboard">Farmer</Link>
        <Link to="/knowledge">Knowledge</Link>
        <Link to="/about">About</Link>
        <Link to="/auth">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <TopBar />
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
