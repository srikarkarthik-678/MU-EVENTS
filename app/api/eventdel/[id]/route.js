import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ConnectmongoDB from '@/lib/config/email'
import eventModel from '@/lib/models/emailrequest'

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
  await eventModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Event deleted successfully' })
}
