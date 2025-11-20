import { useState } from 'react'
import Nav from '../components/Nav'
import { useApp } from '../context/AppContext'

export default function Complaints(){
  const { API, headers } = useApp()
  const [text, setText] = useState('')
  const [cid, setCid] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function file(){
    if(!text.trim()) return
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/complaints/create`, { method:'POST', headers, body: JSON.stringify({ text }) })
      const data = await res.json()
      setCid(data.id)
    }catch(e){}
    setLoading(false)
  }

  async function check(){
    if(!cid) return
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/complaints/status/${cid}`)
      const data = await res.json()
      setStatus(data)
    }catch(e){}
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/70 border border-black/5 p-4">
          <h2 className="text-xl font-semibold mb-2">File a Complaint</h2>
          <textarea className="w-full bg-white border border-black/10 rounded-xl p-3 min-h-[120px]" value={text} onChange={e=>setText(e.target.value)} placeholder="Describe your issue…" />
          <button onClick={file} className="mt-3 px-4 py-2 rounded-xl bg-[#2D5016] text-white">{loading? 'Submitting…':'Submit'}</button>
          {cid && <p className="text-sm mt-2">Complaint ID: <span className="font-mono">{cid}</span></p>}
        </div>
        <div className="rounded-2xl bg-white/70 border border-black/5 p-4">
          <h2 className="text-xl font-semibold mb-2">Check Status</h2>
          <input className="bg-white border border-black/10 rounded-xl p-2" value={cid} onChange={e=>setCid(e.target.value)} placeholder="Enter Complaint ID" />
          <button onClick={check} className="ml-2 px-4 py-2 rounded-xl bg-[#4A90E2] text-white">Check</button>
          {status && (
            <div className="mt-4 text-sm">
              <div>Status: <span className="font-medium">{status.status}</span></div>
              <ul className="list-disc ml-5 mt-2">
                {status.timeline?.map((t,i)=> <li key={i}>{t.time} — {t.event}</li>)}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
