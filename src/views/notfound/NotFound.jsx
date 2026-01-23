import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'

function NotFound () {
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      try{
        const id = Math.floor(Math.random() * 898) + 1
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${id}`)
        setPokemon(data);
      } catch (err) {
        console.error(err) 
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing:'ease-in-out',
      delay: 300,
    })
  }, [])


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 flex flex-col justify-center items-center p-6 text-white">
      {loading ? (
        <div className="animate-pulse flex flex-col gap-4 items-center">
          <div className="w-40 h-40 rounded-full bg-white/20" />
          <div className="h-6 w-48 bg-white/30 rounded" />
        </div>
      ) : (
        <>
          {pokemon && (
            <div className="h-56">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-40 sm:w-56 drop-shadow-2xl mb-4"
              draggable={false}
              data-aos="fade-up"
              />
              </div>
          )}

          <h1 className="text-[2.2rem] sm:text-[3rem] font-bold drop-shadow-xl tracking-tight mb-2">
            Oops! Halaman Tidak Tersedia
          </h1>

          <p className="text-base sm:text-lg opacity-90 mb-6 text-center">
            Sepertinya kamu nyasar. {pokemon ? `${pokemon.name.toLowerCase()} bingung mencarimu...` : 'Coba jalan lain!'}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg font-medium bg-white text-blue-600 hover:bg-white/90 transition shadow-lg"
          >
            Kembali ke Home
          </button>
        </>
      )}
    </div>
  )
}

export default NotFound 