import React, { useEffect, useState } from 'react'
import Ball from '../../../public/ball.gif'
import { useAuthStore } from '../../store/authStore'

function Floating() {
  const user = useAuthStore(state => state.user)
  const username = user?.username || 'Bro'

  const messages = [
  `hey ${username}! Jangan lupa minum air ya 💧`,
  `Cari Pokémon atau cari jodoh nih, ${username}? 🤔`,
  `${username}, saksikanlah kebangkitan King MU!😉`,
  `Halo ${username}! Siap nangkep Pokémon hari ini? 🎯`,
  `hey ${username}, udah mengapresiasi pemerintah belum hari ini?🤣`,
  `${username}, hidup itu keras… tapi cicilan lebih keras 🤣`,
  `hey ${username} apapun yang terjadi, teruslah bernafas!`,
  `Hey ${username}, jangan lupa cek stats Pokémon favoritmu! 📊`,
  `${username}, ketemu Pokémon langka belum hari ini? ✨`,
  ]

  const [text, setText] = useState(messages[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length)
      setText(messages[randomIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:flex items-end gap-3 group hidden">
      <div className="
        px-4 py-2
        bg-white text-gray-800 text-sm font-semibold
        rounded-xl shadow-lg
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300
        whitespace-nowrap
      ">
        {text}
      </div>

      <div className="
        w-12 h-12
        group-hover:animate-spin
        cursor-pointer
      ">
        <img src={Ball} alt="Pokeball" />
      </div>
    </div>
  )
}

export default Floating
