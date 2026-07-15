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
    category: "Upcoming",
    author: "Enigma",
    authorImg: "/author_img.png",
    date: ""
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
    formData.append('date', form.date)
    formData.append("image", image)

    try {
      const response = await axios.post('/api/email', formData)
      if (response.data.success) {
        toast.success(response.data.msg)
        setForm({
          title: "",
          description: "",
          category: "Upcoming",
          author: "Enigma",
          authorImg: "/author_img.png",
          date: ""
        })
        setImage(null)
      } else {
        toast.error("Event creation failed")
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="text-2xl font-bold text-white mb-8">Add an Event</div>

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
          <label className="text-sm text-white/60">Event Title</label>
          <input
            type="text"
            placeholder="Type here"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Event Description</label>
          <textarea
            name="description"
            placeholder="Write details here"
            rows={5}
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors resize-none"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm text-white/60">Event Date</label>
          <input
            type="date"
            name="date"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#12121a] border border-white/10 text-white outline-none focus:border-purple-500/50 transition-colors"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-fit px-8 py-3 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-400 transition-all disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Event"}
        </button>
      </form>
    </div>
  )
}
export default Page
