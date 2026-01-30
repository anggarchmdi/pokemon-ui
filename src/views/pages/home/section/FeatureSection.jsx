import React from 'react'
import { FaSearch, FaBolt, FaShoppingCart } from "react-icons/fa"

function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8 grid md:grid-cols-3 gap-10 text-center">
        <Feature icon={<FaSearch />} title="Smart Search" />
        <Feature icon={<FaBolt />} title="Fast Experience" />
        <Feature icon={<FaShoppingCart />} title="Cart & Checkout" />
      </div>
    </section>
  )
}
function Feature({ icon, title }) {
  return (
    <div className="p-6 rounded-xl hover:shadow-lg transition">
      <div className="text-yellow-400 text-3xl mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm">
        Modern UI with smooth interaction.
      </p>
    </div>
  )
}

export default FeatureSection