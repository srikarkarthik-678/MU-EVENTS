import React from 'react'
import Image from 'next/image'
import { assets } from '@/public/assets'

const Footer = () => {
  return (
    <div className="font-title mt-32">
      <div className="flex justify-between items-center bg-[#0a0a0f] border-t border-white/5 text-white/60 px-6 sm:px-24 py-6 max-md:flex-col max-md:gap-3">
        <img src="/icon-trans.png" alt="" className="w-12" />
        <div className="text-sm">© {new Date().getFullYear()} Enigma — Mahindra University</div>
        <div className="flex items-center gap-4">
          <Image src={assets.facebook_icon} alt="" width={22} className="opacity-60 hover:opacity-100 transition-opacity" />
          <Image src={assets.twitter_icon} alt="" width={22} className="opacity-60 hover:opacity-100 transition-opacity" />
          <Image src={assets.googleplus_icon} alt="" width={22} className="opacity-60 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  )
}
export default Footer
