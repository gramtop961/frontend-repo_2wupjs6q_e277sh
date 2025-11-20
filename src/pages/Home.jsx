import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Features from '../components/Features'

export default function Home(){
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <Hero />
      <Features />
      <footer className="bg-[#FAF9F6] py-10 border-t border-black/5">
        <div className="container mx-auto px-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Gramin Saathi · Built for rural accessibility
        </div>
      </footer>
    </div>
  )
}
