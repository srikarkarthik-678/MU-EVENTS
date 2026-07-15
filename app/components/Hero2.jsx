"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const Hero2 = ({ title, description, category, image, id, onDelete }) => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "admin"

  const handledel = async () => {
    try {
      await axios.delete(`/api/blogdel/${id}`)
      toast.success("Blog deleted")
      onDelete?.()
    } catch (err) {
      toast.error("Could not delete blog")
    }
  }

  return (
    <div className="w-[280px] sm:w-[300px] rounded-2xl overflow-hidden bg-[#12121a] border border-white/10 hover:border-emerald-500/40 hover:shadow-glow transition-all duration-300 mt-8" data-aos="fade-up">
      <Link href={`/blogpost/${id}`}>
        <div className="overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={180}
            className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-lg font-bold mb-1 text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-white/50 mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between">
          <Link href={`/blogpost/${id}`} className="flex items-center text-sm font-semibold text-emerald-400 hover:underline">
            Read more
            <img src="/arrow.png" alt="" className="ml-2 w-4 h-4 invert" />
          </Link>

          {isAdmin && (
            <button
              onClick={handledel}
              className="text-xs px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Hero2
