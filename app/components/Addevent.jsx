"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Addevent = () => {
  const { data: session } = useSession()
  if (session?.user?.role !== "admin") return null

  return (
    <div className="text-center mt-10">
      <Link href="/admin/subscription">
        <button className="px-6 py-3 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-400 transition-all">
          Add an Event
        </button>
      </Link>
    </div>
  )
}
export default Addevent
