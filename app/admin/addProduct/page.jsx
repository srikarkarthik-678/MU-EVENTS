"use client"
import React, { useState } from 'react'
import { assets } from '@/public/assets'
import { toast } from 'react-toastify'
import Image from 'next/image'
import axios from 'axios'

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImg: "/author_img.png"
  })
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const onSubmitChange = async (e) => {
    e.preventDefault()
    if (!image) {
      toast.error("Please select a thumbnail image")
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('category', form.category)
    formData.append('author', form.author)
    formData.append('authorImg', form.authorImg)
    formData.append("image", image)

    try {
      const response = await axios.post('/api/blog', formData)
      if (response.data.success) {
        toast.success(response.data.msg)
        setForm({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImg: "/author_img.png"
        })
        setImage(null)
      } else {
        toast.error("Blog creation failed")
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="text-2xl font-bold text-white mb-8">Add a Blog</div>

      <form onSubmit={onSubmitChange} className="flex flex-col gap-6">
        <div>
          <div className="text-sm text-white/60 mb-2">Upload Thumbnail</div>
          <label htmlFor="image" className="inline-block cursor-pointer">
            <Image
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
              className="w-40 h-28 object-cover rounded-xl border border-white/10"
              width={160}
              height={112}
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            hidden
            required
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Blog Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-emerald-500/50 transition-colors"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Blog Description</label>
          <textarea
            name="description"
            placeholder="Write content here"
            rows={6}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-emerald-500/50 transition-colors resize-none"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Blog Category</label>
          <select
            name="category"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-emerald-500/50 transition-colors"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Startup">Startup</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-fit px-8 py-3 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  )
}
export default Page
