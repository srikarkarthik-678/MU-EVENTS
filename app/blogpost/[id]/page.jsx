"use client"
import { assets } from '@/public/assets'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from "next/navigation";
import axios from 'axios'

const Page = () => {
  const params = useParams();
  const [data, setdata] = useState(null)

  const fetchblogdata = async () => {
  const response = await axios.get("/api/blog", {
    params: { id: params.id },
  });

  console.log("Params:", params);
  console.log("Response:", response.data);

  setdata(response.data);
};

  useEffect(() => {
    fetchblogdata()
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/50 text-xl font-title">
        Loading blog post...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-title">
      <div className="bg-[#0d0d14] border-b border-white/5 py-6">
        <div className="flex items-center justify-between px-6 sm:px-24 max-sm:flex-col max-sm:gap-3">
          <Link href="/">
            <img src="/icon-trans.png" alt="" className="w-16" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 border border-white/10 px-4 py-2 rounded-full text-white/70 hover:bg-white/5 transition-all"
          >
            Back to Home
          </Link>
        </div>

        <div className="text-center my-10 px-6">
          <div className="text-3xl sm:text-4xl font-bold max-w-[700px] mx-auto text-white">
            {data.title}
          </div>
        </div>

        <div className="text-center pb-6 text-white/50">by {data.author}</div>
      </div>

      <div className="max-w-[700px] mx-auto px-6 py-10">
        <img
          src={data.image}
          alt=""
          className="w-full rounded-2xl border border-white/10"
        />

        <div className="mt-10">
          <div className="text-xl font-bold text-emerald-400">Introduction</div>
          <p className="mt-4 text-white/70 leading-relaxed">{data.description}</p>

          <div className="mt-10">
            <div className="text-lg font-semibold text-white mb-4">Share this article</div>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/">
                <Image src={assets.facebook_icon} className="w-10 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" alt="" />
              </a>
              <a href="https://x.com/">
                <Image src={assets.twitter_icon} className="w-10 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" alt="" />
              </a>
              <a href="https://www.google.com/">
                <Image src={assets.googleplus_icon} className="w-10 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page
