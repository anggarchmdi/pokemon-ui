import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import api from '../../../../lib/axios'
import PokemonCard from '../components/PokemonCard'
import AOS from 'aos'

function SliderSection() {
  const [pokemons, setPokemons] = useState([])
  const swiperRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 700,
      once: false,
      easing: 'ease-in-out',
    })
  }, [])

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await api.get('/pokemon?limit=20')
      const results = await Promise.all(
        res.data.results.map(p => api.get(p.url))
      )
      setPokemons(results.map(r => r.data))
    }
    fetchPokemons()
  }, [])

  useEffect(() => {
    if (swiperRef.current && pokemons.length > 0) {
      swiperRef.current.autoplay.start()
    }
  }, [pokemons])

  return (
    <section className="py-12 shadow-md bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-2 font-rotobo ">
        Popular
        <span className='text-rose-500 ml-2'>
        Pokémon
        </span>
      </h2>
      <p className="text-center text-sm text-slate-500 mb-6">
        Fan favorites, auto-rotating every few seconds
      </p>

      <div className="px-2">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={16}
          slidesPerView={8}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: false,
          }}
          loop
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 7 },
            1536: { slidesPerView: 8 },
          }}
        >
          {pokemons.map(pokemon => (
            <SwiperSlide key={pokemon.id} className="flex justify-center py-4">
              <PokemonCard pokemon={pokemon} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default SliderSection
