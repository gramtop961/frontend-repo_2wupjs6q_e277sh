import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import Nav from '../components/Nav'
import { Filter, ExternalLink } from 'lucide-react'

export default function Schemes(){
  const { API, headers, location } = useApp()
  const [filters, setFilters] = useState({ state: location.state || '', district: location.district || '', gender: '', land_size: '' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function search(){
    setLoading(true)
    try{
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([k,v])=>{ if(v) params.append(k, v) })
      const res = await fetch(`${API}/api/schemes/search?${params.toString()}`)
      const data = await res.json()
      setItems(data || [])
    }catch(e){
      setItems([])
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ search() },[])

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8">
        <div className="rounded-2xl bg-white/70 border border-black/5 p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs opacity-70">State</label>
              <input value={filters.state} onChange={e=>setFilters(f=>({...f,state:e.target.value}))} className="block bg-white border border-black/10 rounded-xl p-2" placeholder="e.g., Karnataka" />
            </div>
            <div>
              <label className="text-xs opacity-70">District</label>
              <input value={filters.district} onChange={e=>setFilters(f=>({...f,district:e.target.value}))} className="block bg-white border border-black/10 rounded-xl p-2" placeholder="e.g., Belagavi" />
            </div>
            <div>
              <label className="text-xs opacity-70">Gender</label>
              <select value={filters.gender} onChange={e=>setFilters(f=>({...f,gender:e.target.value}))} className="block bg-white border border-black/10 rounded-xl p-2">
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-xs opacity-70">Land Size (acres)</label>
              <input value={filters.land_size} onChange={e=>setFilters(f=>({...f,land_size:e.target.value}))} className="block bg-white border border-black/10 rounded-xl p-2" placeholder="e.g., 2" />
            </div>
            <button onClick={search} className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#2D5016] text-white rounded-xl">
              <Filter className="w-4 h-4" /> Search
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {loading && <div className="text-sm opacity-70">Loading…</div>}
          {!loading && items.map(s => (
            <div key={s.id} className="rounded-2xl bg-white border border-black/5 p-4">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm opacity-80 mt-1"><span className="font-medium">Eligibility:</span> {s.eligibility}</p>
              <p className="text-sm opacity-80 mt-1"><span className="font-medium">Benefits:</span> {s.benefits}</p>
              {s.apply_url && <a className="inline-flex items-center gap-2 text-[#4A90E2] mt-2" href={s.apply_url} target="_blank" rel="noreferrer">Apply <ExternalLink className="w-4 h-4" /></a>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
