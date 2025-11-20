import Nav from '../components/Nav'

export default function About(){
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8">
        <div className="rounded-2xl bg-white border border-black/5 p-6">
          <h2 className="text-2xl font-bold">About Gramin Saathi</h2>
          <p className="mt-2 text-sm opacity-80">A simple, multilingual assistant for rural users. Built with a focus on accessibility, trust, and reliability.</p>
        </div>
      </section>
    </div>
  )
}
