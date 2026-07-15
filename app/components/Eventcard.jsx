"use client"
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const Eventcard = ({ title, description, image, date, id, onDelete }) => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "admin"

  const handledel = async () => {
    try {
      await axios.delete(`/api/eventdel/${id}`)
      toast.success("Event deleted")
      onDelete?.()
    } catch (err) {
      toast.error("Could not delete event")
    }
  }

  return (
    <div className="w-[280px] sm:w-[300px] rounded-2xl overflow-hidden bg-[#12121a] border border-white/10 hover:border-teal-500/40 hover:shadow-glow transition-all duration-300 mt-8" data-aos="fade-up">
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={180}
          className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        {date && <p className="text-xs text-teal-400 mb-1">{new Date(date).toDateString()}</p>}
        <h3 className="text-lg font-bold mb-1 text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-white/50 mb-3 line-clamp-3">{description}</p>

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
  )
}
export default Eventcard
