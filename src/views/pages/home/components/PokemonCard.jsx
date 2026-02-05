function PokemonCard({ pokemon }) {
  return (
    <div className="h-56">
      <div className="w-44 h-60 bg-red-500 p-2 rounded-lg">
      <div className="rounded-lg w-40 h-56 bg-rose-700 backdrop-blur transition-all p-5 text-center flex justify-center items-center">
        <div className="absolute w-20 h-20 bg-rose-400 rounded-full -translate-y-9"></div>
        <div className="absolute w-36 h-36 backdrop-blur-lg rounded-2xl -translate-y-9"></div>
        <div className="">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-32 h-32 drop-shadow-2xl"
          />

        <h3 className="font-bold font-montserrat capitalize mt-4 text-white">
          {pokemon.name}
        </h3>
        <div className="flex justify-center gap-x-2 mt-3">
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
    </div>
  )
}

export default PokemonCard
