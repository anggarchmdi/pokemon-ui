import React, { useState } from 'react'
import api from '../../lib/axios'
import { useUserStore } from '../../store/userStore';
import { toast } from 'react-toastify';

function Login() {
  const login = useUserStore((s) => s.login);

  const [form, setForm] = useState({ email: "", password: ""});

    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post("/login", form);
        login(res.data);
        toast.success("login berhasil", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = '/user';
        }, 2000);
      } catch (err) {
        toast.error("Email atau Password salah", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <form onSubmit={handleLogin} className='space-y-3'>
        <input
          type="email"
          name="email"
          placeholder="masukkan email"
          className='border p-2 w-full rounded'
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          onChange={handleChange}
          value={form.password}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
