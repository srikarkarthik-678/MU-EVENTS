"use client"
import React, { useEffect, useState } from 'react'
import Eventcard from './Eventcard'
import Hero3 from './Hero3'
import axios from 'axios'

const Eventslist = () => {
  const [events, setevents] = useState([])
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  const fetchevents = async () => {
    try {
      const response = await axios.get("/api/email")
      setevents(response.data.event)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id) => {
    setevents(events.filter((item) => item._id !== id))
  }

  useEffect(() => {
    fetchevents()
  }, [])

  const now = new Date()
  const filtered = events.filter((item) => {
    if (filter === "All") return true
    const eventDate = item.date ? new Date(item.date) : null
    if (!eventDate) return true
    return filter === "Upcoming" ? eventDate >= now : eventDate < now
  })

  return (
    <div>
      <Hero3 filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
        {loading ? (
          <p className="text-white/40 mt-10">Loading events...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/40 mt-10">No events to show.</p>
        ) : (
          filtered.map((item) => (
            <Eventcard
              key={item._id}
              title={item.title}
              description={item.description}
              date={item.date}
              image={item.image}
              id={item._id}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
export default Eventslist
