import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import useCollectionStore from '../../store/useCollectionStore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const TOTAL_POKEMON = 1010

function Profile() {
  const collection = useCollectionStore(state => state.collection)
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const username = user?.username || 'Bro'

  const handleLogout = () => {
    toast.error("berhasil Logout")
    setTimeout(() => {
      useAuthStore.getState().logout()
      localStorage.removeItem('username')
      navigate('/login')
    }, 1500)
}
  

  useEffect(() => {
    const storedName = localStorage.getItem('username')
    if (storedName) setUsername(storedName)
  }, [])

  const progress = Math.min((collection.length / TOTAL_POKEMON) * 100, 100).toFixed(1)

  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-2xl font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-sm text-gray-300">Pokémon Trainer</p>
          </div>
            </div>
          <button onClick={handleLogout} className="font-bold text-red-500 flex justify-center items-center md:hidden">
            logout
          </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-1">
            Collection Progress
          </p>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {collection.length} / {TOTAL_POKEMON} Pokémon collected ({progress}%)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div onClick={() => navigate('/collection')} className="bg-white/10 rounded-xl p-4 text-center cursor-pointer hover:scale-95 duration-300">
            <p className="text-2xl font-bold">{collection.length}</p>
            <p className="text-xs text-gray-400">Collected</p>
          </div>
          <div onClick={() => navigate('/pokemon')} className="bg-white/10 rounded-xl p-4 text-center cursor-pointer hover:scale-95 duration-300">
            <p className="text-2xl font-bold">{TOTAL_POKEMON - collection.length}</p>
            <p className="text-xs text-gray-400">Remaining</p>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          Progress disimpan otomatis di browser (local storage) 👌
        </p>
      </div>
    </div>
  )
}

export default Profile
