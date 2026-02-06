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
    <div className="py-20 min-h-screen px-2 lg:px-4 xl:px-14">
      <div className="w-96 h-8 bg-gradient-to-bl from-rose-800 to-amber-500 bg-clip-text">
      <h1 className="font-bold text-2xl md:text-3xl text-transparent">Cari & Koleksi Pokémon Favoritmu</h1>
      </div>
      <p className="line-clamp-1 w-96 md:w-[450px] font-poppins md:mt-2">Jelajahi ratusan Pokémon dari berbagai generasi. Gunakan pencarian untuk menemukan favoritmu!</p>
      <Floating />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 py-8 min-h-screen">
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
