"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import Avatar from '../Avatar'

const links = [
  { href: "/admin/addProduct", label: "Add Blogs", icon: "/add_icon.png" },
  { href: "/admin/subscription", label: "Add Events", icon: "/add_icon.png" },
  { href: "/admin/blogList", label: "Blog Lists", icon: "/blog_icon.png" },
]

const SIdebar = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="w-72 min-h-screen bg-[#0d0d14] border-r border-white/5 font-title flex flex-col">
      <Link href="/" className="flex items-center gap-2 px-6 py-6 border-b border-white/5">
        <img src="/icon-trans.png" alt="" className="w-10" />
        <span className="text-white font-semibold">Enigma</span>
      </Link>

      <div className="flex flex-col gap-1 px-4 mt-6">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <img src={l.icon} alt="" className="w-5 opacity-70" />
              {l.label}
            </Link>
          )
        })}
      </div>

      {session && (
        <div className="mt-auto p-4 border-t border-white/5 flex items-center gap-3">
          <Avatar name={session.user.name} sizePx={36} />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white truncate">{session.user.name}</div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs text-white/40 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default SIdebar
