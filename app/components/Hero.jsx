"use client"
import React from 'react'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className="font-title" data-aos="fade-up">
      <div className="flex justify-between items-center px-6 sm:px-24 mt-16 md:mt-28 max-lg:flex-col max-lg:gap-8">
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              ENIGMA
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/60">Journal & Events</h2>
          <p className="text-white/50 mt-2">
            Enigma, the official Computer Science club of Mahindra University.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <Link
              to="aboutus" smooth={true} offset={30} duration={800}
              className="cursor-pointer px-5 py-2 rounded-full border border-white/10 text-white/80 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
            >
              About Us
            </Link>
            <Link
              to="whatweare" smooth={true} offset={10} duration={800}
              className="cursor-pointer px-5 py-2 rounded-full border border-white/10 text-white/80 hover:bg-purple-500/10 hover:border-purple-500/40 hover:text-purple-400 transition-all"
            >
              What We Do
            </Link>
          </div>
        </div>

        <img src="/party.jpg" alt="" className="w-96 rounded-2xl shadow-glow max-lg:w-64" />
      </div>
    </div>
  )
}
export default Hero
