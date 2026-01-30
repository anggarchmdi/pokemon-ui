function PokemonCard({ pokemon }) {
  return (
    <div className="px-3 h-56"  data-aos="fade">
      <div className="rounded-lg w-40 h-56 bg-white backdrop-blur transition-all p-5 text-center flex justify-center items-center">
        <div className="absolute w-20 h-20 bg-yellow-400 rounded-full -translate-y-9"></div>
        <div className="absolute w-32 h-32 backdrop-blur-xl rounded-2xl -translate-y-9"></div>
        <div className="">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-32 h-32 drop-shadow-2xl"
          />

        <h3 className="font-bold capitalize mt-4">
          {pokemon.name}
        </h3>
        <div className="flex justify-center gap-x-2 mt-3">
          {pokemon.types.map(t => (
              <span
              key={t.type.name}
              className="text-xs px-3  py-1 rounded-full bg-yellow-600 text-yellow-200 font-bold"
              >
              {t.type.name}
            </span>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
