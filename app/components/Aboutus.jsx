import React from 'react'

const stats = [
  { value: "1.5k+", label: "Discord Users" },
  { value: "1k+", label: "PRs merged on GitHub" },
  { value: "50+", label: "Workshops conducted" },
  { value: "20+", label: "Projects completed" },
]

const Aboutus = () => {
  return (
    <div className="font-title" id="aboutus">
      <div className="flex items-center justify-center mt-32 gap-10 px-6 sm:px-24 max-md:flex-col-reverse">
        <img src="/pilot-CA74Nnvm.png" alt="" className="w-[300px] max-md:w-[180px]" />
        <div className="flex flex-col items-start w-full md:w-[65%] gap-4">
          <div className="text-4xl font-bold text-white">About Us</div>
          <p className="text-white/60 leading-relaxed">
            Enigma is the Computer Science club at Mahindra University, dedicated to fostering a passion
            for technology and innovation among students. Established in 2017, it is also the university&apos;s
            oldest continuously running student community. The club provides a platform for tech enthusiasts
            to explore areas like programming, cybersecurity, AI, and more. Through hands-on workshops,
            hackathons, coding competitions, and expert talks, Enigma helps students develop problem-solving
            skills and stay up-to-date with cutting-edge technologies.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4 w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center bg-[#12121a] border border-white/10 rounded-xl py-4 px-2">
                <div className="text-2xl font-bold text-emerald-400">{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Aboutus
