import { create } from "zustand";

export const usePokemonStore = create(set => ({
    type: 'all',
    page: 1,
    limit: 12,

    setType: type => set({type, page: 1}),
    setPage: page => set({page}),
}))