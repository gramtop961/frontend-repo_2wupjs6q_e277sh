import { Leaf, MessageSquare, Map, FileText, Settings } from 'lucide-react'

export default function Nav(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-black/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#2D5016]">
          <Leaf /> <span className="font-semibold">Gramin Saathi</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-[#2C3E50]">
          <a href="#features" className="hover:opacity-80">Features</a>
          <a href="#chat" className="hover:opacity-80 flex items-center gap-1"><MessageSquare className="w-4 h-4"/>Chat</a>
          <a href="#docs" className="hover:opacity-80 flex items-center gap-1"><FileText className="w-4 h-4"/>Docs</a>
          <a href="#map" className="hover:opacity-80 flex items-center gap-1"><Map className="w-4 h-4"/>Map</a>
          <a href="#admin" className="hover:opacity-80 flex items-center gap-1"><Settings className="w-4 h-4"/>Admin</a>
        </nav>
      </div>
    </header>
  )
}
