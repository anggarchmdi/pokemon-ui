import React, { useEffect, useState } from 'react'
import api from '../../../../lib/axios'
import AOS from 'aos'
import { useNavigate } from 'react-router-dom'


function HeroSection() {
  const [pokemon, setPokemon] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  const fetchRandom = async () => {
    try {
      const id = Math.floor(Math.random() * 898) + 1
      const { data } = await api.get(`/pokemon/${id}`)
      setPokemon(data)
    } catch (err) {
      console.error('failed fetch pokemon', err)
    }
  }

  useEffect(() => {
    fetchRandom()
    const interval = setInterval(fetchRandom, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen md:h-96 flex w-full items-center bg-gradient-to-b from-slate-900 via-slate-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-0 lg:px-4 xl:px-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-10">
        <div data-aos="fade-up">
          <span className="inline-block mb-3 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
            New Pokémon every 10s
          </span>

          <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-extrabold text-white leading-tight">
            Discover Your <span className="text-yellow-400">Pokémon</span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-sm">
            Explore Pokémon with interactive cards, stats, and modern UI experience.
          </p>
          <div className="mt-5 flex gap-3">
            <button onClick={() => navigate('/pokemon')} className="rounded-full bg-yellow-400 px-5 hover:scale-95 duration-300 py-2 text-sm font-semibold text-slate-900 hover:bg-yellow-300 transition">
              Explore Now
            </button>
          </div>
        </div>

        {pokemon && (
          <div
            data-aos="zoom-in"
            className="order-first md:order-last flex justify-center items-center"
          >
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-56 md:w-80 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              draggable={false}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
