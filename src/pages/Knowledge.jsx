import Nav from '../components/Nav'

export default function Knowledge(){
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8">
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="text-2xl font-bold">Knowledge Base</h2>
          <p className="mt-2 text-sm opacity-80">Curated articles and FAQs. Coming soon with search and filters.</p>
        </div>
      </section>
    </div>
  )
}
