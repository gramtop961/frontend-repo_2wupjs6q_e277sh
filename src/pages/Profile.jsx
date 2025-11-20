import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useApp } from '../context/AppContext'

export default function Profile(){
  const { API, headers, profile, setProfile, language, setLanguage, location, setLocation } = useApp()
  const [form, setForm] = useState({ name:'', phone:'', email:'', language: language, state: location.state || '', district: location.district || '', village:'', occupation:'', land_size:'' })
  const [msg, setMsg] = useState('')

  useEffect(()=>{ setForm(f=>({...f, language})); },[language])

  async function save(){
    const body = { ...form }
    const res = await fetch(`${API}/profile`, { method:'POST', headers, body: JSON.stringify(body) })
    const data = await res.json()
    setProfile(data)
    setLanguage(data.language || 'en')
    setLocation({ state: data.state || '', district: data.district || '' })
    setMsg('Saved')
    setTimeout(()=>setMsg(''), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="rounded-2xl bg-white/70 border border-black/5 p-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs opacity-70">Name</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Phone</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Email</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Language</label>
            <select className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.language} onChange={e=>setForm(f=>({...f,language:e.target.value}))}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <div>
            <label className="text-xs opacity-70">State</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">District</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.district} onChange={e=>setForm(f=>({...f,district:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Village</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.village} onChange={e=>setForm(f=>({...f,village:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Occupation</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.occupation} onChange={e=>setForm(f=>({...f,occupation:e.target.value}))} />
          </div>
          <div>
            <label className="text-xs opacity-70">Land Size (acres)</label>
            <input className="w-full bg-white border border-black/10 rounded-xl p-2" value={form.land_size} onChange={e=>setForm(f=>({...f,land_size:e.target.value}))} />
          </div>
          <button onClick={save} className="sm:col-span-2 px-4 py-2 rounded-xl bg-[#2D5016] text-white">Save</button>
          {msg && <div className="text-sm text-green-700">{msg}</div>}
        </div>
      </section>
    </div>
  )
}
