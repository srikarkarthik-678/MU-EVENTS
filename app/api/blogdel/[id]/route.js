import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ConnectmongoDB from '@/lib/config/email'
import blogModel from '@/lib/models/BlogModel'

const LoadDb = async () => {
  await ConnectmongoDB()
}
LoadDb()

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = params
  await blogModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Blog deleted successfully' })
}
