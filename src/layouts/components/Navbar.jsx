import React, { useEffect, useRef, useState } from 'react'
import { FaSearch, FaUserCircle } from 'react-icons/fa'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthStore } from '../../store/authStore'
import useDebounce from '../../hooks/useDebounce'
import { BiBookmarks } from "react-icons/bi";
import { CgProfile } from "react-icons/cg"
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [keyword, setKeyword] = useState('')
  const profileRef = useRef(null)
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const debouncedKeyword = useDebounce(keyword, 500)
  const isPokemonPage = location.pathname === '/pokemon'

  useEffect(() => {
    setKeyword(searchParams.get('q') || '')
  }, [])

 useEffect(() => {
  if (!isPokemonPage) return

  if (debouncedKeyword.trim()) {
    navigate(`/pokemon?q=${debouncedKeyword.toLowerCase()}`)
  } else {
    navigate('/pokemon')
  }
}, [debouncedKeyword, isPokemonPage])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    toast.error('Logout berhasil')
    setTimeout(() => {
      logout()
      navigate('/login')
    }, 1500)
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-gray-900/90 backdrop-blur-xl shadow-md' : 'bg-gray-900'}
      `}
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-4 xl:px-8 2xl:px-14 py-4 flex items-center justify-between">
        <h1
          onClick={() => navigate('/')}
          className="text-xl font-bold cursor-pointer text-white"
        >
          <span className="text-yellow-400">Poké</span>Dex
        </h1>

        {/* DESKTOP */}
        <div className="flex items-center gap-6">
          {/* SEARCH */}
          {isPokemonPage && (
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search Pokémon..."
              className="bg-transparent outline-none ml-2 text-sm w-24 md:w-40"
            />
          </div>
        )}

          {/* MENU */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {['/', '/pokemon', '/about'].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? 'text-yellow-400 font-semibold'
                      : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                {['Home', 'Pokémon', 'About'][i]}
              </NavLink>
            ))}
          </ul>

          {/* PROFILE */}
          <div className="relative flex items-center" ref={profileRef}>
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="hover:animate-pulse transition"
            >
              <FaUserCircle className="text-2xl text-white" />
            </button>

            {openProfile && (
              <div className="absolute right-0 top-8 mt-2 w-40 bg-white shadow-lg font-bold rounded-lg text-sm overflow-hidden">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex justify-start items-center gap-x-2 w-full text-left px-4 py-2 hover:scale-95 duration-300"
                >
                  <span><CgProfile /></span>
                  Profile
                </button>
                <button
                  onClick={() => navigate('/collection')}
                  className="flex justify-start items-center gap-x-2 w-full text-left px-4 py-2 hover:scale-95 duration-300"
                >
                  <span><BiBookmarks /></span>
                  Collection
                </button>
                <button
                  onClick={handleLogout}
                  className="flex justify-start items-center gap-x-2 w-full text-left px-4 py-2 text-red-500 hover:scale-95 duration-300"
                >
                  <span><CiLogout /></span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
