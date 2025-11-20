import { useState } from 'react'
import Nav from '../components/Nav'
import { useApp } from '../context/AppContext'

export default function Knowledge(){
  const { API, headers } = useApp()
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)

  async function ingest(){
    if(!text.trim()) return
    await fetch(`${API}/rag/ingest`, { method:'POST', headers, body: JSON.stringify({ source_type:'text', title, text }) })
    alert('Added to knowledge base')
    setText(''); setTitle('')
  }

  async function ask(){
    if(!query.trim()) return
    setLoading(true)
    const res = await fetch(`${API}/rag/query`, { method:'POST', headers, body: JSON.stringify({ question: query }) })
    const data = await res.json()
    setAnswer(data.answer); setSources(data.sources||[])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/70 border border-black/5 p-6">
          <h2 className="text-2xl font-bold">Knowledge Base</h2>
          <p className="mt-2 text-sm opacity-80">Add notes, URLs or document text to build your private knowledge.</p>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title (optional)" className="w-full bg-white border border-black/10 rounded-xl p-3 mt-3" />
          <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} placeholder="Paste text or URL" className="w-full bg-white border border-black/10 rounded-xl p-3 mt-3" />
          <button onClick={ingest} className="mt-3 px-4 py-2 rounded-xl bg-[#2D5016] text-white">Add</button>
        </div>
        <div className="rounded-2xl bg-white/70 border border-black/5 p-6">
          <h3 className="text-xl font-semibold">Ask your knowledge</h3>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Your question" className="w-full bg-white border border-black/10 rounded-xl p-3 mt-3" />
          <button onClick={ask} className="mt-3 px-4 py-2 rounded-xl bg-[#4A90E2] text-white">Ask</button>
          {loading && <div className="mt-3 text-sm opacity-70">Searching…</div>}
          {answer && (
            <div className="mt-4">
              <div className="text-sm whitespace-pre-wrap">{answer}</div>
              {sources.length>0 && <div className="text-xs opacity-70 mt-2">Sources: {sources.map((s,i)=> <span key={i} className="mr-2 underline">{s.title || s.url || 'source'}</span>)}</div>}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
