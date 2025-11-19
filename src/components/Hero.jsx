import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2C3E50] tracking-tight">
          Gramin Saathi
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[#2C3E50]/80 max-w-2xl mx-auto">
          Your multilingual rural assistant for trusted answers, schemes, and services.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="#chat" className="px-6 py-3 rounded-full text-white bg-[#2D5016] shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] hover:scale-105 transition">
            Start Chat
          </a>
          <a href="#features" className="px-6 py-3 rounded-full text-[#2D5016] bg-white/70 backdrop-blur-md border border-black/5 hover:scale-105 transition">
            Explore Features
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent" />
    </section>
  );
}
