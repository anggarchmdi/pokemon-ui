import React, { useEffect, useState } from 'react'
import api from '../../../../lib/axios'
import AOS from 'aos'

function HeroSection() {
    const [pokemon, setPokemon] = useState(null)

     useEffect(() => {
            AOS.init({
                duration:1000,
                // delay:700,
                once:false,
                easing: "ease-in-out"
            })
        })

    const fetchRandom = async () => {
        try{
            const id = Math.floor(Math.random() * 898) + 1
            const {data} = await api.get(`/pokemon/${id}`)
            setPokemon(data)
        } catch (err) {
            console.error("failed fetch pokemon", err)
        }
    }

    useEffect(() => {
        fetchRandom()
        const interval = setInterval(fetchRandom, 10000)
        return () => clearInterval(interval)
    }, []);

  return (
    <section className='h-96 flex w-full max-w-full items-center bg-gray-900'>
        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-10 items-center pt-10">
            <div>
                <h1 className="text-5xl font-bold text-white" data-aos="fade">
                    Discover Your <span className="text-yellow-500">Pokémon</span>
                </h1>
                <p className="mt-4 text-white"  data-aos="fade">
                Explore Pokémon with interactive and modern experience.
                </p>
            </div>
            {pokemon && (
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-80 mx-auto ml-56 drop-shadow-2xl transition-opacity duration-1000"
            draggable={false}  data-aos="fade"
          />
        )}
        </div>
    </section>
  )
}

export default HeroSection