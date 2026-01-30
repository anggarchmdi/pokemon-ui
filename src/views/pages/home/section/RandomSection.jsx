import React from 'react'

function RandomSection() {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-10">
        Discover Random Pokémon
      </h2>

      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:-translate-y-1 transition p-4"
          >
            <div className="h-28 bg-gray-100 rounded mb-4" />
            <p className="text-center font-medium">Random Pokémon</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RandomSection