"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'

const Page = () => {
  const [posts, setposts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchdata = async () => {
    try {
      const response = await axios.get("/api/blog")
      setposts(response.data.blogs)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogdel/${id}`)
      setposts(posts.filter((p) => p._id !== id))
      toast.success("Blog deleted")
    } catch {
      toast.error("Could not delete blog")
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div>
      <div className="text-2xl font-bold text-white mb-8">All Blogs</div>

      {loading ? (
        <p className="text-white/40">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-white/40">No blogs yet — add your first one.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {posts.map((item) => (
            <div
              key={item._id}
              className="w-[250px] rounded-2xl overflow-hidden bg-[#12121a] border border-white/10 hover:border-emerald-500/40 transition-all"
            >
              <Link href={`/blogpost/${item._id}`}>
                <Image src={item.image} alt="" className="w-full h-36 object-cover" width={250} height={144} />
              </Link>
              <div className="p-4">
                <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h5 className="text-sm font-semibold text-white line-clamp-2">{item.title}</h5>
                <p className="mt-1 text-xs text-white/50 line-clamp-2">{item.description}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-3 text-xs px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Page
