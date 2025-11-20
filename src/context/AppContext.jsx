import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppContext = createContext(null)

const API = import.meta.env.VITE_BACKEND_URL || ''

export function AppProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || '')
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('profile')||'{}') } catch { return {} }
  })
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const [location, setLocation] = useState(() => {
    try { return JSON.parse(localStorage.getItem('location')||'{}') } catch { return {} }
  })

  useEffect(()=>{ if(token) localStorage.setItem('jwt', token); else localStorage.removeItem('jwt') },[token])
  useEffect(()=>{ localStorage.setItem('language', language) },[language])
  useEffect(()=>{ localStorage.setItem('location', JSON.stringify(location)) },[location])
  useEffect(()=>{ localStorage.setItem('profile', JSON.stringify(profile)) },[profile])

  const headers = useMemo(()=> ({ 'Content-Type':'application/json', ...(token? { 'Authorization': `Bearer ${token}` } : {}) }), [token])

  const value = { API, token, setToken, profile, setProfile, language, setLanguage, location, setLocation, headers }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(){
  const ctx = useContext(AppContext)
  if(!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
