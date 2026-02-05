import React from 'react'
import { FaSearch, FaStar, FaUserCircle } from "react-icons/fa"

function FeatureSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-8 text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-montserrat">
          Build Your Own <span className='text-rose-500'>Pokémon</span> Collection
        </h2>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Explore, save, and curate your favorite Pokémon. Your personal Pokédex, your way.
        </p>
      </div>

      <div className="container mx-auto px-8 grid md:grid-cols-3 gap-8">
        <Feature
          icon={<FaSearch />}
          title="Explore Pokémon"
          desc="Browse hundreds of Pokémon with details, stats, and types."
        />
        <Feature
          icon={<FaStar />}
          title="Save to Collection"
          desc="Save your favorite Pokémon to your personal collection, like Pinterest."
        />
        <Feature
          icon={<FaUserCircle />}
          title="Profile & Avatar"
          desc="Use your favorite Pokémon as your profile avatar (coming soon)."
          badge="Soon"
        />
      </div>
    </section>
  )
}

function Feature({ icon, title, desc, badge }) {
  return (
    <div className="
      relative p-8 rounded-2xl bg-white 
      shadow-sm hover:shadow-xl transition-all duration-300 
      text-center group
    ">
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] px-2 py-1 rounded-full bg-yellow-400 text-slate-900 font-bold">
          {badge}
        </span>
      )}

      <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-500 text-2xl transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm">
        {desc}
      </p>
    </div>
  )
}

export default FeatureSection
