"use client"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Bloglist from "./components/Bloglist"
import Eventslist from "./components/Eventslist"
import { useEffect } from "react"
import AOS from "aos"
import Addblog from "./components/Addblog"
import "aos/dist/aos.css"
import Aboutus from "./components/Aboutus"
import We from "./components/Admincomponenets/We"
import Addevent from "./components/Addevent"

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0f] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
      >
        <source src="/istockphoto-1365468767-640_adpp_is.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/90 to-[#0a0a0f] z-0" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Eventslist />
        <Addevent />
        <Bloglist />
        <Addblog />
        <Aboutus />
        <We />
        <Footer />
      </div>
    </div>
  )
}
