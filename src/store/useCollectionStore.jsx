import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCollectionStore = create(
  persist(
    (set, get) => ({
      collection: [],
      addToCollection: (pokemon) => {
        const exists = get().collection.some(p => p.id === pokemon.id)
        if (exists) {
          return { success: false, message: 'Pokémon sudah ada di koleksi' }
        }
        set(state => ({
          collection: [...state.collection, pokemon]
        }))
        return { success: true, message: 'Berhasil disimpan ke koleksi!' }
      },
      removeFromCollection: (id) =>
        set(state => ({
          collection: state.collection.filter(p => p.id !== id)
        }))
    }),
    { name: 'pokemon-collection' }
  )
)

export default useCollectionStore
