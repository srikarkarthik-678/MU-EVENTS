"use client"
import SIdebar from "../components/Admincomponenets/SIdebar"
import Avatar from "../components/Avatar"
import { ToastContainer } from 'react-toastify'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] font-title">
      <ToastContainer theme="dark" />

      <div className="hidden sm:block">
        <SIdebar />
      </div>

      {mobileMenuOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SIdebar />
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-4 text-white/40 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center h-16 px-6 border-b border-white/5 bg-[#0d0d14]">
          <button className="sm:hidden text-white/70 text-xl" onClick={() => setMobileMenuOpen(true)}>
            ☰
          </button>
          <div className="text-white font-semibold">Admin Panel</div>
          {session?.user?.name ? <Avatar name={session.user.name} sizePx={32} /> : <div className="w-8" />}
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
