import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AOS from 'aos'

export default function AuthLayout({ children }) {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init({
            duration:1000,
            delay:700,
            once:false,
            easing: "ease-in-out"
        })
    })
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
    }, [])
    
    return (
       <div className="min-h-screen bg-gradient-to-tr from-[#FF6500] to-yellow-300 w-full flex justify-center items-center">
        <div className="max-w-sm p-4 md:p-0 md:max-w-3xl h-[400px] w-full grid grid-cols-1 md:grid-cols-2 shadow-lg">
        <div className="w-full h-full bg-white rounded-l-xl flex justify-center items-center">
            <div className="p-8 flex flex-col justify-center items-center w-full">
                {children}
            </div>
        </div>
        <div className="w-full h-full bg-yellow-400 rounded-r-xl justify-center items-center md:flex hidden">
            <div className="w-64 h-64 bg-yellow-400 absolute rounded-full "></div>
            <div className="w-52 h-52 bg-yellow-300 absolute rounded-full "></div>
            <div className="w-40 h-40 bg-yellow-200 absolute rounded-full "></div>
            <div className="w-80 h-80 backdrop-filter backdrop-blur-xl absolute rounded-full "></div>
       {!loading && pokemon && (
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-56 z-20 drop-shadow-2xl"
              draggable={false}
              data-aos="fade"
            />
          )}
        </div>
        </div>
       </div>
    )
}