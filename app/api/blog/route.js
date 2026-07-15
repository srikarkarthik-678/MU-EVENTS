import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import blogModel from '@/lib/models/BlogModel'
import ConnectmongoDB from '@/lib/config/email'
import cloudinary from '@/lib/config/cloudinary'
import mongoose from 'mongoose'

const LoadDb = async () => {
  await ConnectmongoDB()
}
LoadDb()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const blogid = searchParams.get('id')

  if (blogid) {
    if (!mongoose.Types.ObjectId.isValid(blogid)) {
      return NextResponse.json({ error: 'Invalid Blog ID' }, { status: 400 })
    }
    const blog = await blogModel.findById(blogid)
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json(blog)
  }

  const blogs = await blogModel.find({}).sort({ createdAt: -1 })
  return NextResponse.json({ blogs })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const image = formData.get('image')
  const arrayBuffer = await image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const uploadPromise = new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'blog_images' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    stream.end(buffer)
  })

  const result = await uploadPromise
  const blogData = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    author: session.user.name,
    image: result.secure_url,
    authorImg: formData.get('authorImg'),
  }

  await blogModel.create(blogData)
  return NextResponse.json({ success: true, msg: 'Blog created' })
}
