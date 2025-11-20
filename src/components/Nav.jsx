import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Leaf, MessageSquare, FileText, BookOpen, Home, Landmark, Megaphone, User, Menu, X, Globe2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Nav(){
  const { token, setToken, language, setLanguage } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/chat', label: 'Chat', icon: MessageSquare },
    { to: '/schemes', label: 'Schemes', icon: Landmark },
    { to: '/complaints', label: 'Complaints', icon: Megaphone },
    { to: '/dashboard', label: 'Farmer', icon: FileText },
    { to: '/knowledge', label: 'Knowledge', icon: BookOpen },
    { to: '/about', label: 'About', icon: FileText },
  ]

  function logout(){ setToken(''); navigate('/') }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#2D5016]">
          <Leaf className="w-5 h-5" /> <span className="font-semibold">Gramin Saathi</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm text-[#2C3E50]">
          {links.map(({to,label,icon:Icon})=> (
            <NavLink key={to} to={to} className={({isActive})=>`px-3 py-1.5 rounded-xl flex items-center gap-2 hover:bg-black/5 transition ${isActive? 'bg-black/5 text-[#2D5016] font-medium':''}`}>
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#2C3E50] bg-white/70 border border-black/5 rounded-xl px-2 py-1">
            <Globe2 className="w-4 h-4" />
            <select value={language} onChange={e=>setLanguage(e.target.value)} className="bg-transparent text-sm outline-none">
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="kn">KN</option>
              <option value="ta">TA</option>
              <option value="te">TE</option>
              <option value="mr">MR</option>
            </select>
          </div>
          {!token ? (
            <Link to="/auth" className="px-3 py-2 rounded-xl bg-[#2D5016] text-white text-sm">Login</Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="px-3 py-2 rounded-xl bg-white border border-black/5 text-sm flex items-center gap-2"><User className="w-4 h-4" /> Profile</Link>
              <button onClick={logout} className="px-3 py-2 rounded-xl bg-[#4A90E2] text-white text-sm">Logout</button>
            </div>
          )}
        </div>
        <button className="md:hidden p-2" onClick={()=>setOpen(o=>!o)} aria-label="Menu">{open? <X/>:<Menu/>}</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 bg-[#FAF9F6]">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {links.map(({to,label})=> (
              <Link key={to} to={to} onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl hover:bg-black/5">{label}</Link>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-sm">Lang</span>
              <select value={language} onChange={e=>setLanguage(e.target.value)} className="bg-white border border-black/10 rounded-lg p-1 text-sm">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
            {!token ? (
              <Link to="/auth" onClick={()=>setOpen(false)} className="px-3 py-2 rounded-xl bg-[#2D5016] text-white text-center">Login</Link>
            ) : (
              <div className="flex gap-2">
                <Link to="/profile" onClick={()=>setOpen(false)} className="flex-1 px-3 py-2 rounded-xl bg-white border border-black/10 text-center">Profile</Link>
                <button onClick={()=>{logout(); setOpen(false)}} className="flex-1 px-3 py-2 rounded-xl bg-[#4A90E2] text-white">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
