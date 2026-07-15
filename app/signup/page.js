"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import axios from "axios"

export default function SignUp() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await axios.post("/api/auth/signup", form)

      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (res.error) {
        router.push("/signin")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 font-title">
      <div className="w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.08)]">
        <div className="flex flex-col items-center gap-2 mb-8">
          <img src="/icon-trans.png" alt="Enigma" className="w-16" />
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-sm text-white/50">Join Enigma to get started</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-white/60">Full name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a22] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a22] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-white/60">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a22] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-400 transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-white/40 text-center mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
