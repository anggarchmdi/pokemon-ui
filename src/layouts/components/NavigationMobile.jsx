import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { MdCatchingPokemon } from "react-icons/md"

function NavigationMobile() {
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    {
      icon: FaHome,
      link: '/'
    },
    {
      icon: MdCatchingPokemon,
      link: '/pokemon'
    },
    { 
      icon: CgProfile,
      link: '/profile'
    }
  ]

  return (
    <div className='fixed z-50 w-full bottom-1 md:hidden'>
      <div className="flex justify-center items-center w-full">
        <div className="max-w-52 w-full py-2 bg-black rounded-3xl border border-yellow-400">
          <div className="grid grid-cols-3 gap-4 text-white w-full">
            {menu.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.link

              return (
                <button
                  key={index}
                  onClick={() => navigate(item.link)}
                  className={`flex justify-center items-center transition-all duration-200
                    ${isActive ? 'text-yellow-400 scale-110' : 'text-white'}
                  `}
                >
                  <Icon size={30} />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMobile
