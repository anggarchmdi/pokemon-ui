import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify'

function Register() {
  const register = useAuthStore(state=> state.register)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [showPass, setShowPass] = useState(false)

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    try{
      register(form)
      toast.success('Register berhasil 🎉', {
        autoClose: 1500,
      })
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
       toast.error(err.message || 'Register gagal')
    }
  }
  return (
    <div className="w-full">
      <div className="w-full h-12 bg-gradient-to-br mb-4 from-[#FF6500] to-yellow-400 flex justify-center text-center bg-clip-text">
      <h1 className='font-bold text-[2rem] font-poppins text-transparent text-center'>Pokémon</h1>
      </div>
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
        required
        className="border border-[#FF6500] p-2 w-full rounded pr-10 focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        required
        className="border border-[#FF6500] p-2 w-full rounded pr-10 focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        />

      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          className="border border-[#FF6500] p-2 w-full rounded pr-10 focus:ring-1 focus:ring-yellow-400 focus:outline-none pr-10"
          />
        <span
          onClick={() => setShowPass(!showPass)}
          className="absolute right-2 top-3 text-xl cursor-pointer"
          >
          {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>

      <button className="bg-yellow-400 hover:bg-[#FF6500] text-white font-rotobo font-bold w-full py-2 rounded transition-all transform hover:scale-95 duration-500">
        Register
      </button>
    </form>
    <div className="flex mb-auto items-end translate-y-12 gap-x-1.5 font-rotobo">
        <h1>Sudah punya akun?</h1>
      <a href="/login" className='text-indigo-500 hover:underline '>Login Sekarang!</a>
      </div>
  </div>
  )
}

export default Register