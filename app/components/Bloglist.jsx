"use client"
import React, { useState, useEffect } from 'react'
import Hero2 from './Hero2'
import axios from 'axios'

const CATEGORIES = ["All", "Technology", "Startup", "Lifestyle"]

const Bloglist = () => {
  const [menu, setmenu] = useState("All")
  const [blogs, setblogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchblog = async () => {
    try {
      const response = await axios.get("/api/blog")
      setblogs(response.data.blogs)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => {
    setblogs(blogs.filter((item) => item._id !== id))
  }

  useEffect(() => {
    fetchblog()
  }, [])

  const filtered = blogs.filter((item) => (menu === "All" ? true : item.category === menu))

  return (
    <div className="font-title" id="blogs">
      <div className="text-center mt-32 text-4xl font-bold text-white">Blogs</div>

      <div className="flex items-center justify-center mt-8 gap-3 flex-wrap px-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setmenu(c)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              menu === c
                ? "bg-emerald-500 text-black font-medium"
                : "border border-white/10 text-white/60 hover:bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
        {loading ? (
          <p className="text-white/40 mt-10">Loading blogs...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/40 mt-10">No blogs in this category yet.</p>
        ) : (
          filtered.map((item, index) => (
            <Hero2
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              id={item._id}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
export default Bloglist
