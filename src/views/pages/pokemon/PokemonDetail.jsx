import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../lib/axios'
import { Skeleton } from '@mui/material'

const MIN_SKELETON_TIME = 1500

function PokemonDetail() {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)

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

        setTimeout(() => {
          if (isMounted) setLoading(false)
        }, remaining > 0 ? remaining : 0)
      }
    }

    fetchDetail()

    return () => {
      isMounted = false
    }
  }, [name])

  const description = species?.flavor_text_entries
    ?.find(text => text.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ')

  if (loading) {
    return (
      <div className="py-24 px-10 max-w-4xl mx-auto space-y-4">
        <Skeleton height={40} width="40%" />
        <Skeleton height={300} />
        <Skeleton height={100} />
      </div>
    )
  }

  if (!pokemon) return null

  return (
    <div className="py-24 px-10 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">

        <div className="flex justify-center">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-72 h-72"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold capitalize">
            {pokemon.name}
          </h1>

          <div className="flex gap-2 mt-3">
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                className="px-3 py-1 rounded-full text-sm text-white bg-yellow-500 capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {description}
          </p>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Base Stats</h3>
            <div className="space-y-2">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled
            className="mt-8 w-full py-3 rounded-xl
                       bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Save to Collection (coming soon)
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
