import React from "react"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      <div className="px-10 py-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-yellow-400">Poké</span>Dex
          </h1>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Explore Pokémon data using public API.  
            Built with React, Vite, Axios, and modern UI practices.
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Menu</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li onClick={() => navigate('/')} className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li onClick={() => navigate('/pokemon')} className="hover:text-yellow-400 cursor-pointer">Pokémon</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Connect</h2>
          <div className="flex gap-4 text-xl text-gray-400">
            <a
              href="#"
              className="hover:text-yellow-400 transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-white py-4">
        © {new Date().getFullYear()} PokéDex by Angga Rachmadi | All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
