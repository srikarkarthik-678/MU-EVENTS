import React from 'react'

const items = [
  { title: "Events", desc: "We organize hackathons and workshops throughout the year, as well as socials for networking.", hoverClass: "hover:border-emerald-500/40" },
  { title: "Sub-committees", desc: "Enigma has several subcommittees, for Systems, WebDev, GameDev, AI/ML, Comp Coding and more.", hoverClass: "hover:border-purple-500/40" },
  { title: "Collaborations", desc: "We partner with other clubs and companies to bring bigger events and opportunities to members.", hoverClass: "hover:border-teal-500/40" },
  { title: "Prizes", desc: "Hackathons and competitions throughout the year come with prizes, goodies and recognition.", hoverClass: "hover:border-emerald-500/40" },
]

const We = () => {
  return (
    <div className="font-title" id="whatweare">
      <div className="mt-32 px-6 sm:px-24">
        <div className="text-center text-3xl font-bold text-white">What We Do</div>
        <p className="text-center mt-3 text-white/50">
          Here&apos;s what to look for when you join Enigma or attend an event
        </p>

        <div className="flex items-stretch justify-between gap-5 mt-10 max-lg:flex-col">
          {items.map((it) => (
            <div
              key={it.title}
              className={`w-full flex flex-col items-center text-center p-6 rounded-2xl bg-[#12121a] border border-white/10 ${it.hoverClass} transition-all`}
            >
              <div className="text-lg font-semibold text-white">{it.title}</div>
              <p className="mt-3 text-sm text-white/50">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default We
