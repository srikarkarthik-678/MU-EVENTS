import React from 'react'

const COLORS = ["bg-emerald-500", "bg-purple-500", "bg-teal-500"]

const Avatar = ({ name = "?", sizePx = 36 }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const colorIndex = name.charCodeAt(0) % COLORS.length

  return (
    <div
      style={{ width: sizePx, height: sizePx }}
      className={`rounded-full flex items-center justify-center text-xs font-semibold text-black shrink-0 ${COLORS[colorIndex]}`}
    >
      {initials}
    </div>
  )
}

export default Avatar
