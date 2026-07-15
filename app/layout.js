import "./globals.css"
import Providers from "./providers"

export const metadata = {
  title: "Enigma — CS Club, Mahindra University",
  description: "Journal & Events by Enigma, the Computer Science club of Mahindra University.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
