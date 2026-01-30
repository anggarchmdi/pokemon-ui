import React from 'react'
import { useNavigate } from 'react-router-dom'

function CTASection() {
  const navigate = useNavigate()

  const handleExplore = () => {
    setTimeout(() => {
      navigate('/pokemon')
    }, 1000)
  }
  return (
   <section className="py-9 bg-gray-900 text-center">
      <h2 className="text-3xl font-bold text-white">
        Ready to Catch Them All?
      </h2>
      <button onClick={handleExplore}
        className="inline-block mt-6 px-8 py-3 bg-white text-[#FF6500] duration-300 rounded-full font-semibold hover:scale-95 transition"
      >
        Start Exploring
      </button>
    </section>
  )
}

export default CTASection