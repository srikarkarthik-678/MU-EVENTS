import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import ConnectmongoDB from '@/lib/config/email'
import UserModel from '@/lib/models/UserModel'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectmongoDB()

        const user = await UserModel.findOne({ email: credentials.email })
        if (!user) throw new Error("No account found with this email")

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) throw new Error("Incorrect password")

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
