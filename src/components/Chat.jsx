import { useEffect, useRef, useState } from 'react'
import { Mic, Send, Globe2, MapPin, Pin, Volume2, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Chat(){
  const { API, headers, language, location } = useApp()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState('')
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
      const res = await fetch(`${API}/api/chat/ask`, { method:'POST', headers, body: JSON.stringify({ message: user.text, language, state: location.state, district: location.district, session_id: sessionId || undefined }) })
      const data = await res.json()
      setSessionId(s => s || data.session_id || '')
      setMessages(m => [...m, { role:'assistant', text: data.answer, sources: data.sources, confidence: data.confidence }])
    }catch(e){
      setMessages(m => [...m, { role:'assistant', text: 'Network error. Please try again.' }])
    }finally{
      setLoading(false)
    }
  }

  function onKey(e){ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send() } }

  async function pin(idx){
    try{
      await fetch(`${API}/api/chat/pin`, { method:'POST', headers: { ...headers }, body: new URLSearchParams({ ref_id: `${sessionId}:${idx}` }) })
      // small UI hint
      alert('Pinned to bookmarks')
    }catch{}
  }

  function speak(text){
    if('speechSynthesis' in window){
      const u = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(u)
    }
  }

  return (
    <section id="chat" className="bg-[#FAF9F6] py-14">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-black/5 p-4 shadow-sm">
          <div className="flex items-center gap-2 p-2">
            <div className="flex items-center gap-2 text-[#2C3E50]">
              <Globe2 className="w-5 h-5" />
              <span className="text-sm">{language.toUpperCase()}</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-[#2C3E50]">
              <MapPin className="w-5 h-5" />
              <span className="text-xs">{location.state || 'State'}</span>
              <span className="text-xs">{location.district || 'District'}</span>
            </div>
          </div>

          <div className="h-[52vh] overflow-y-auto px-3 py-2 space-y-3">
            {messages.map((m,i)=> (
              <div key={i} className={`max-w-[85%] ${m.role==='user'?'ml-auto bg-[#4A90E2] text-white':'bg-white border border-black/5 text-[#2C3E50]'} rounded-2xl px-4 py-3 shadow-sm`}> 
                <p className="whitespace-pre-wrap text-sm">{m.text}</p>
                {m.sources && m.sources.length>0 && (
                  <div className="mt-2 text-[11px] opacity-70 flex items-center gap-3">
                    <span>Sources:</span>
                    <div className="flex gap-2 flex-wrap">
                      {m.sources.map((s,idx)=> <a key={idx} className="underline" href={s.url || '#'} target="_blank" rel="noreferrer">{s.title || s.source || 'source'}</a>)}
                    </div>
                    <span>| conf: {(m.confidence*100).toFixed(0)}%</span>
                    <button onClick={()=>pin(i)} title="Pin" className="ml-auto text-[#2D5016]"><Pin className="w-4 h-4" /></button>
                    <button onClick={()=>speak(m.text)} title="Listen" className="text-[#2D5016]"><Volume2 className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-sm text-[#2C3E50]/70"><Loader2 className="w-4 h-4 animate-spin"/> Thinking…</div>}
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
