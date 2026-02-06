import { useEffect } from "react"
import AOS from "aos"
import { useNavigate } from "react-router-dom"

function CardPokemon({ pokemons }) {
  const navigate = useNavigate()

  useEffect(() => {
              AOS.init({
                  duration:300,
                  once:true,
                  easing: "ease-in-out"
              })
          })
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-x-6 py-8">
      {pokemons.map(pokemon => (
        <div
          key={pokemon.id}
          onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          className="relative 2xl:w-56 w-40 md:w-44 lg:w-52 xl:w-48 h-56 bg-red-500 rounded-2xl shadow-lg px-4 py-2
                    hover:scale-95 duration-300
                     transition-all cursor-pointer flex justify-center flex-col items-center"
        >
          <div className="w-36 md:w-40 lg:w-48 xl:w-44 2xl:w-52 h-52 bg-rose-700 rounded-lg backdrop-blur transition-all p-5 text-center flex justify-center items-center">
            <div className="absolute w-20 h-20 bg-rose-400 rounded-full"></div>
            <div className="absolute w-36 h-36 backdrop-blur-lg rounded-2xl"></div>
            <div className="relative flex flex-col justify-center items-center">
              <img src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-32 h-32" 
                data-aos="fade" />
                <h3 className="text-center font-bold font-rotobo text-white capitalize mt-4">
                {pokemon.name}
                </h3>
                <div className="flex justify-center gap-x-2">
          {pokemon.types.map(t => (
              <span
              key={t.type.name}
              className="text-xs px-3  py-1 rounded-full bg-yellow-300 text-amber-800 font-bold"
              >
              {t.type.name}
            </span>
          ))}
          </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardPokemon
