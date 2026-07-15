import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import ConnectmongoDB from '@/lib/config/email'
import UserModel from '@/lib/models/UserModel'

const LoadDb = async () => { await ConnectmongoDB() }
LoadDb()

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existing = await UserModel.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    // First-ever registered user becomes admin automatically.
    // Everyone after gets the "user" role. Promote manually in the DB if needed.
    const userCount = await UserModel.countDocuments()
    const role = userCount === 0 ? "admin" : "user"

    await UserModel.create({ name, email, password: hashed, role })

    return NextResponse.json({ success: true, msg: "Account created" })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
