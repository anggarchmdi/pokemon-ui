import React, { useEffect, useState } from 'react'
import api from '../../../../lib/axios'

function RandomSection() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('info')

  const getRandomPokemon = async () => {
    try {
      setLoading(true)
      const randomId = Math.floor(Math.random() * 1010) + 1
      const res = await api.get(`/pokemon/${randomId}`)
      setPokemon(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRandomPokemon()
  }, [])

  return (
    <section className="relative overflow-hidden py-8 bg-gradient-to-br bg-white">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#D02752"
          d="M0,192L80,170.7C160,149,320,107,480,106.7C640,107,800,149,960,154.7C1120,160,1280,128,1360,112L1440,96V320H0Z"
        />
      </svg>

      <div className="relative container mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-8 tracking-tight font-montserrat">
          Discover Random <span className='text-rose-500'>Pokémon</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center">
            <div className="absolute w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30" />
            {loading ? (
              <div className="w-64 h-64 animate-pulse" />
            ) : (
              <img
                key={pokemon?.id}
                src={pokemon?.sprites?.other?.['official-artwork']?.front_default}
                alt={pokemon?.name}
                className="relative w-72 h-72 object-contain drop-shadow-2xl animate-[fadeIn_.4s_ease]"
              />
            )}
          </div>
          <div className="bg-white/60  backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="flex gap-3 mb-6">
              
              {['info', 'stats'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    tab === t
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-white text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  {t === 'info' ? 'Info' : 'Stats'}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold font-montserrat capitalize mb-3">
                  {pokemon?.name}
                </h3>

                {tab === 'info' && (
                  <>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {pokemon?.types?.map((t) => (
                        <span
                          key={t.type.name}
                          className="px-3 py-1 rounded-full text-sm bg-yellow-300 text-amber-700 font-semibold"
                        >
                          {t.type.name}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm">
                      Height: {pokemon?.height} | Weight: {pokemon?.weight}
                    </p>
                  </>
                )}

                {tab === 'stats' && (
                  <div className="space-y-2">
                    {pokemon?.stats?.map((s) => (
                      <div key={s.stat.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{s.stat.name}</span>
                          <span className="font-semibold">
                            {s.base_stat}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full transition-all"
                            style={{ width: `${(s.base_stat / 150) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={getRandomPokemon}
                    className="px-6 py-2 rounded-xl text-sm bg-red-600 font-semibold font-poppins text-white hover:scale-95 duration-300 transition-transform"
                  >
                    🎲 Acak
                  </button>

                  <a
                    href={`/pokemon/${pokemon?.name}`}
                    className="px-6 py-2 rounded-xl border text-sm border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white font-semibold font-poppins hover:scale-95 duration-300 transition"
                  >
                    Lihat Detail
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px) scale(.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
    </section>
  )
}

export default RandomSection
