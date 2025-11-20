import Nav from '../components/Nav'

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white border border-black/5 p-4">
          <h3 className="font-semibold">Today’s Weather</h3>
          <p className="text-sm opacity-80 mt-1">Sunny, 31°C, light winds. Rain chance 10%.</p>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-4">
          <h3 className="font-semibold">Market Prices</h3>
          <p className="text-sm opacity-80 mt-1">Wheat ₹2100/q, Paddy ₹1900/q (local mandi)</p>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-4">
          <h3 className="font-semibold">Today’s Tip</h3>
          <p className="text-sm opacity-80 mt-1">Water your crop early morning to reduce evaporation.</p>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-4 lg:col-span-2">
          <h3 className="font-semibold">Soil Report</h3>
          <p className="text-sm opacity-80 mt-1">Upload coming soon.</p>
        </div>
        <div className="rounded-2xl bg-white border border-black/5 p-4">
          <h3 className="font-semibold">Advisory</h3>
          <ul className="list-disc ml-5 text-sm opacity-80 mt-1">
            <li>Use certified seeds for better yield.</li>
            <li>Check local weather before pesticide application.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
