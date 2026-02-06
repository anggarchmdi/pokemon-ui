import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../lib/axios'
import { Skeleton } from '@mui/material'
import useCollectionStore from '../../../store/useCollectionStore'
import { toast } from 'react-toastify'

const MIN_SKELETON_TIME = 1200

const typeTheme = {
  grass: {
    bg: 'from-emerald-900 via-green-800 to-slate-900',
    glow: 'bg-emerald-400/20',
    bar: 'from-emerald-400 to-lime-400'
  },
  fire: {
    bg: 'from-rose-900 via-orange-800 to-slate-900',
    glow: 'bg-orange-400/20',
    bar: 'from-orange-400 to-rose-500'
  },
  water: {
    bg: 'from-sky-900 via-blue-800 to-slate-900',
    glow: 'bg-sky-400/20',
    bar: 'from-sky-400 to-cyan-400'
  },
  electric: {
    bg: 'from-yellow-900 via-amber-700 to-slate-900',
    glow: 'bg-yellow-400/20',
    bar: 'from-yellow-300 to-amber-400'
  },
  poison: {
    bg: 'from-purple-900 via-fuchsia-800 to-slate-900',
    glow: 'bg-purple-400/20',
    bar: 'from-purple-400 to-pink-400'
  },
  default: {
    bg: 'from-slate-900 via-slate-800 to-black',
    glow: 'bg-white/10',
    bar: 'from-amber-400 to-rose-500'
  }
}

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const addToCollection = useCollectionStore(state => state.addToCollection)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const startTime = Date.now()

    const fetchDetail = async () => {
      try {
        setLoading(true)
        const [pokemonRes, speciesRes] = await Promise.all([
          api.get(`/pokemon/${name}`),
          api.get(`/pokemon-species/${name}`)
        ])

        if (!isMounted) return
        setPokemon(pokemonRes.data)
        setSpecies(speciesRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        const elapsed = Date.now() - startTime
        const remaining = MIN_SKELETON_TIME - elapsed
        setTimeout(() => isMounted && setLoading(false), Math.max(0, remaining))
      }
    }

    fetchDetail()
    return () => (isMounted = false)
  }, [name])

  const description = species?.flavor_text_entries
    ?.find(t => t.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ')

  if (loading) {
    return (
      <div className="py-24 px-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="translate-x-8 md:translate-x-0 md:translate-y-36">
        <Skeleton height={250} width="80%" />
        </div>
        <div className="mt-36 md:mt-8 -space-y-4 ">
        <Skeleton height={80} width="50%" />
        <Skeleton height={80} />
        <Skeleton height={300} />
        <Skeleton height={100} />
        </div>
        
      </div>
    )
  }

  if (!pokemon) return null

  const mainType = pokemon.types?.[0]?.type?.name || 'default'
  const theme = typeTheme[mainType] || typeTheme.default

  const handleSave = () => {
    const res = addToCollection(pokemon)
    if(res.success) {
      setTimeout(() => navigate('/pokemon'), 1200)
      toast.success('berhasil menambahkan pokemon!')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${theme.bg} text-white`}>
      <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl ${theme.glow}`} />
      <div className={`absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl ${theme.glow}`} />
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>

      <div className="relative max-w-6xl mx-auto px-4 lg:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative flex justify-center">
          <div className={`absolute w-72 h-72 rounded-full blur-2xl ${theme.glow}`} />
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-80 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          />
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
          <h1 className="text-4xl font-bold capitalize mb-2">
            {pokemon.name}
          </h1>

          <div className="flex gap-2 mb-4">
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                className="px-3 py-1 text-xs rounded-full font-semibold bg-white/20 backdrop-blur capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-200 leading-relaxed mb-6">
            {description}
          </p>

          <h3 className="font-semibold mb-2">Base Stats</h3>

          <div className="space-y-3">
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="capitalize text-gray-300">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                  <span className="font-semibold text-white">
                    {stat.base_stat}
                  </span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${theme.bar} transition-all duration-700`}
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
          onClick={handleSave}
          className="mt-8 w-full py-3 rounded-xl bg-emerald-500 hover:scale-95 duration-300 hover:bg-emerald-600 transition font-semibold"
        >
          Save to Collection
        </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
