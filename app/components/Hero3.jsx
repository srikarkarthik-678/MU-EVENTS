"use client"
import React, { useState } from 'react'

const Hero3 = ({ filter, setFilter }) => {
  return (
    <div className="font-title" data-aos="fade-up">
      <div className="text-center mt-32 text-4xl font-bold text-white">Events</div>
      <div className="flex gap-4 justify-center items-center mt-8">
        {["All", "Completed", "Upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter?.(f)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === f
                ? "bg-teal-500 text-black font-medium"
                : "border border-white/10 text-white/60 hover:bg-white/5"
            }`}
          >
            {f} {f !== "All" ? "Events" : ""}
          </button>
        ))}
      </div>
    </div>
  )
}
export default Hero3
