"use client"
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import Avatar from './Avatar'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <div className="sticky top-0 z-50 font-title bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 sm:px-24 py-4">
        <Link href="/">
          <img src="/icon-trans.png" alt="" className="w-14" />
        </Link>

        {status === "loading" ? null : session ? (
          <div className="flex items-center gap-4">
            {session.user.role === "admin" && (
              <Link href="/admin/addProduct" className="text-sm text-white/70 hover:text-emerald-400 transition-colors max-sm:hidden">
                Dashboard
              </Link>
            )}
            <Avatar name={session.user.name} sizePx={32} />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm px-4 py-2 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm px-5 py-2 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default Navbar
