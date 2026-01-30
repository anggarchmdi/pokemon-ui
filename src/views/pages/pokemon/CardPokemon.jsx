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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-x-8">
      {pokemons.map(pokemon => (
        <div
          key={pokemon.id}
          onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          className="relative 2xl:w-72 h-56 bg-[#FF6500] rounded-2xl shadow-lg  p-5
                    hover:scale-95 duration-300
                     transition-all cursor-pointer flex justify-center flex-col items-center "
        >
          <div className="w-14 h-14 bg-yellow-200 absolute rounded-full z-30"></div>
            <div className="w-20 h-20 bg-yellow-300 absolute rounded-full z-20"></div>
            <div className="w-24 h-24 bg-[#FF6500] absolute rounded-full z-10"></div>
            <div className="2xl:w-56 lg:w-48 md:w-40 w-32 h-56 rounded-2xl backdrop-filter backdrop-blur-xl absolute z-40"></div>
          <div className="absolute z-40">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto" 
            data-aos="fade"
            />
          <h3 className="text-center font-bold font-rotobo text-white capitalize mt-4">
            {pokemon.name}
          </h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardPokemon
