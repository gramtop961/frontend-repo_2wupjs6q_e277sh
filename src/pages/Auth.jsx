import { useState } from 'react'
import Nav from '../components/Nav'
import { useApp } from '../context/AppContext'

export default function Auth(){
  const { API, setToken } = useApp()
  const [identifier, setIdentifier] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function requestOtp(){
    setError(''); setLoading(true)
    try{
      const res = await fetch(`${API}/auth/request-otp`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ identifier, channel: 'sms' }) })
      if(!res.ok) throw new Error('Failed to request OTP')
      setOtpSent(true)
    }catch(e){ setError('Failed to request OTP') }
    setLoading(false)
  }

  async function verifyOtp(){
    setError(''); setLoading(true)
    try{
      const res = await fetch(`${API}/auth/verify-otp`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ identifier, otp }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail||'Failed')
      setToken(data.access_token)
    }catch(e){ setError('Invalid OTP') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E50]">
      <Nav />
      <section className="container mx-auto px-6 py-8 max-w-md">
        <div className="rounded-2xl bg-white/70 border border-black/5 p-6">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-sm opacity-80">Use your phone or email</p>
          <input className="w-full bg-white border border-black/10 rounded-xl p-3 mt-4" value={identifier} onChange={e=>setIdentifier(e.target.value)} placeholder="Phone or Email" />
          {otpSent && (
            <input className="w-full bg-white border border-black/10 rounded-xl p-3 mt-3" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
          )}
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
          <div className="flex gap-2 mt-4">
            {!otpSent ? (
              <button onClick={requestOtp} className="px-4 py-2 rounded-xl bg-[#2D5016] text-white">{loading? 'Sending…':'Send OTP'}</button>
            ) : (
              <button onClick={verifyOtp} className="px-4 py-2 rounded-xl bg-[#4A90E2] text-white">{loading? 'Verifying…':'Verify OTP'}</button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
