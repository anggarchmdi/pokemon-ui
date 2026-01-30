import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../../lib/axios"
import CardPokemon from "./CardPokemon"
import PokemonPagination from "./PokemonPagination"
import PokemonSkeleton from "./PokemonSkeleton"
import Floating from "../../../layouts/components/Floating"

const LIMIT = 20
const MIN_SKELETON_TIME = 1500

function Pokemon() {
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(20)
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")?.toLowerCase() || ""

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      setPokemons([])
      const startTime = Date.now()

      try {
        if (query) {
          const listRes = await api.get("/pokemon?limit=1000")
          const filtered = listRes.data.results
            .filter(pokemon =>
              pokemon.name.includes(query)
            )
            .slice(0, LIMIT)
          const detailResults = await Promise.all(
            filtered.map(pokemon => api.get(pokemon.url))
          )
          setPokemons(detailResults.map(res => res.data))
          setTotalPage(1)
        } 
        else {
          const offset = (page - 1) * LIMIT + 1
          const ids = Array.from(
            { length: LIMIT },
            (_, i) => offset + i
          )
          const results = await Promise.all(
            ids.map(id => api.get(`/pokemon/${id}`))
          )
          setPokemons(results.map(res => res.data))
          setTotalPage(20)
        }
      } catch (error) {
        console.error("Fetch Pokémon error:", error)
        setPokemons([])
      } finally {
        const elapsed = Date.now() - startTime
        const remaining = MIN_SKELETON_TIME - elapsed

        if (remaining > 0) {
          setTimeout(() => setLoading(false), remaining)
        } else {
          setLoading(false)
        }
      }
    }

    fetchPokemons()
  }, [page, query])

  return (
    <div className="py-20 min-h-screen px-10">
      <div className="w-72 h-8 bg-gradient-to-bl from-orange-800 to-amber-400 mb-12 bg-clip-text">
      <h1 className="font-bold text-3xl text-transparent">Pilih Pokemon</h1>
      <p className="font-poppins text-gray-600 text-sm text-clip line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, quas.</p>
      </div>
      <Floating />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-screen">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <PokemonSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CardPokemon pokemons={pokemons} />
      )}
      {!query && !loading && (
        <PokemonPagination
          page={page}
          totalPage={totalPage}
          onChange={setPage}
        />
      )}
    </div>
  )
}

export default Pokemon
