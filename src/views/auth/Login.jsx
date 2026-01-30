import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: ""});
   const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const handleLogin = e => {
      e.preventDefault();
      try {
        login(form)
        toast.success("login berhasil", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
         navigate('/')
        }, 2000);
      } catch (err) {
        toast.error("Email atau Password salah", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  return (
    <div className='w-full flex flex-col justify-center'>
      <div className="w-full h-12 bg-gradient-to-br mb-4 from-[#FF6500] to-yellow-400 flex justify-center text-center bg-clip-text">
      <h1 className='font-bold text-[2rem] font-poppins text-transparent text-center'>Pokémon</h1>
      </div>

      <form onSubmit={handleLogin} className='space-y-3'>
        <input
          type="email"
          name="email"
          placeholder="masukkan email"
          className='border border-[#FF6500] p-2 w-full rounded focus:ring-1 focus:ring-yellow-400 focus:outline-none'
          onChange={handleChange}
          value={form.email}
          required
        />
        <div className='relative'>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border border-[#FF6500] p-2 w-full rounded pr-10 focus:ring-1 focus:ring-yellow-400 focus:outline-none"
            onChange={handleChange}
            value={form.password}
            required
          />
          <div
            className='absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-600'
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-[#FF6500] text-white font-rotobo font-bold w-full py-2 rounded transition-all transform hover:scale-95 duration-500"
        >
          Login
        </button>
      </form>
      <div className="flex mb-auto items-end translate-y-16 gap-x-1.5 font-rotobo">
        <h1>Belum punya akun?</h1>
      <a href="/register" className='text-indigo-500 hover:underline '>Daftar Sekarang!</a>
      </div>
    </div>
  )
}

export default Login
