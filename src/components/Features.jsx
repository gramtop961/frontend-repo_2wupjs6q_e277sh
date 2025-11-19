import { ShieldCheck, Mic, MapPinned, Bot, Upload, MessagesSquare } from 'lucide-react'

const features = [
  { icon: ShieldCheck, title: 'Verified Answers', desc: 'Trusted sources with confidence and citations.' },
  { icon: Mic, title: 'Voice Support', desc: 'Speak and listen in local languages.' },
  { icon: MapPinned, title: 'Location Smart', desc: 'State, district and village aware responses.' },
  { icon: Bot, title: 'WhatsApp & SMS', desc: 'Chat using your preferred channel.' },
  { icon: Upload, title: 'Document Summary', desc: 'Upload PDFs for quick bullet summaries.' },
  { icon: MessagesSquare, title: 'Scheme Guide', desc: 'Personalized scheme recommendations.' },
]

export default function Features(){
  return (
    <section id="features" className="bg-[#FAF9F6] py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] text-center">Premium, Rural-friendly Experience</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {features.map(({icon:Icon, title, desc}) => (
            <div key={title} className="rounded-2xl bg-white/70 backdrop-blur-md border border-black/5 p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center mb-4">
                <Icon />
              </div>
              <h3 className="text-xl font-semibold text-[#2C3E50]">{title}</h3>
              <p className="text-[#2C3E50]/70 mt-2 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
