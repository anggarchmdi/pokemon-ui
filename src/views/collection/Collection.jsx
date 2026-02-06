import useCollectionStore from '../../store/useCollectionStore'

function Collection() {
  const { collection, removeFromCollection } = useCollectionStore()

  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-slate-900 to-black text-white">
      <h1 className="text-3xl font-bold mb-8">My Pokémon Collection</h1>

      {collection.length === 0 ? (
        <div className="text-center text-gray-400">
          Koleksi masih kosong 😢
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collection.map(p => (
            <div key={p.id} className="bg-white/10 rounded-xl p-4 hover:scale-95 transition">
              <img src={p.sprites.other['official-artwork'].front_default} className="w-28 mx-auto" />
              <p className="text-center mt-2 capitalize">{p.name}</p>
              <button
                onClick={() => removeFromCollection(p.id)}
                className="mt-3 w-full text-xs bg-rose-500 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Collection
