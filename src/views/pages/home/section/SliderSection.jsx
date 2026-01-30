import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import api from '../../../../lib/axios'
import PokemonCard from '../components/PokemonCard'
import AOS from 'aos'

function SliderSection() {
  const [pokemons, setPokemons] = useState([])
   useEffect(() => {
          AOS.init({
              duration:1000,
              delay:700,
              once:false,
              easing: "ease-in-out"
          })
      })

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

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <section className="py-20 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-12 text-yellow-500" data-aos="fade-up">
        Popular Pokémon
      </h2>

      <div className="p-2">
       <Slider {...settings}>
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="flex justify-center">
          <PokemonCard pokemon={pokemon}  />
        </div>
      ))}
    </Slider>
      </div>
    </section>
  )
}

export default SliderSection
