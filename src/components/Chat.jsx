import { useEffect, useRef, useState } from 'react'
import { Mic, Send, Globe2, MapPin } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
]

export default function Chat(){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [lang, setLang] = useState('en')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send(){
    if(!input.trim()) return
    const user = { role:'user', text: input }
    setMessages(m => [...m, user])
    setInput('')
    setLoading(true)
    try{
      const res = await fetch(`${API}/api/chat/ask`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ message: user.text, language: lang, state: state || undefined, district: district || undefined }) })
      const data = await res.json()
      setMessages(m => [...m, { role:'assistant', text: data.answer, sources: data.sources, confidence: data.confidence }])
    }catch(e){
      setMessages(m => [...m, { role:'assistant', text: 'Network error. Please try again.' }])
    }finally{
      setLoading(false)
    }
  }

  function onKey(e){ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send() } }

  return (
    <section id="chat" className="bg-[#FAF9F6] py-14">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-black/5 p-4 shadow-sm">
          <div className="flex items-center gap-2 p-2">
            <div className="flex items-center gap-2 text-[#2C3E50]">
              <Globe2 className="w-5 h-5" />
              <select value={lang} onChange={e=>setLang(e.target.value)} className="bg-transparent outline-none">
                {LANGS.map(l=> <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>
            <div className="ml-auto flex items-center gap-2 text-[#2C3E50]">
              <MapPin className="w-5 h-5" />
              <input placeholder="State" value={state} onChange={e=>setState(e.target.value)} className="bg-transparent outline-none border-b border-black/10" />
              <input placeholder="District" value={district} onChange={e=>setDistrict(e.target.value)} className="bg-transparent outline-none border-b border-black/10" />
            </div>
          </div>

          <div className="h-[52vh] overflow-y-auto px-3 py-2 space-y-3">
            {messages.map((m,i)=> (
              <div key={i} className={`max-w-[85%] ${m.role==='user'?'ml-auto bg-[#4A90E2] text-white':'bg-white border border-black/5 text-[#2C3E50]'} rounded-2xl px-4 py-3 shadow-sm`}> 
                <p className="whitespace-pre-wrap text-sm">{m.text}</p>
                {m.sources && m.sources.length>0 && (
                  <div className="mt-2 text-[11px] opacity-70">
                    Sources: {m.sources.map((s,idx)=> <span key={idx} className="mr-2">{s.title || s.source || 'source'}</span>)} | conf: {(m.confidence*100).toFixed(0)}%
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-center text-sm text-[#2C3E50]/70">Thinking…</div>}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 mt-2 p-2">
            <button className="p-3 rounded-2xl bg-white border border-black/5 text-[#2D5016] shadow" title="Voice soon"><Mic className="w-5 h-5" /></button>
            <textarea rows={1} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask anything…" className="flex-1 resize-none rounded-2xl bg-white border border-black/5 p-3 outline-none" />
            <button onClick={send} className="px-5 py-3 rounded-2xl bg-[#2D5016] text-white shadow active:translate-y-[1px]"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
