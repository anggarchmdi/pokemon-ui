import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            users: [],
            hasHydrated: false,

            register: ({username, email, password}) => {
                const users = get().users

                const exists = users.find(u => u.email === email)
                if(exists) {
                    throw new Error("email sudah terdaftar")
                }

                const newUser = { id: Date.now(), username, email, password}
                set({ users: [...users, newUser]})
            },

            login: ({ email, password}) => {
                const user = get().users.find(
                    u => u.email === email && u.password === password
                )

                if(!user) {
                    throw new Error("email atau password  salah")
                }
                set({user})
            },

            logout: () => set({user: null}),
        }),
        {
            name: "auth-storage",
             onRehydrateStorage: () => (state) => {
                state.hasHydrated = true
            },
        }
    )
)