"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Addblog = () => {
  const { data: session } = useSession()
  if (session?.user?.role !== "admin") return null

  return (
    <div className="text-center mt-16">
      <Link href="/admin/addProduct">
        <button className="px-6 py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all">
          Add Your Own Blog
        </button>
      </Link>
    </div>
  )
}
export default Addblog
