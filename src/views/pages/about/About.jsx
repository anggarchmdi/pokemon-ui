function About() {
  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-rose-900 via-indigo-900 to-black text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent">
            PokéDex Web App
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            A modern Pokémon encyclopedia built for learning frontend development, API integration, and clean UI/UX patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:scale-95 transition">
            <h3 className="font-semibold mb-2">⚡ Tech Stack</h3>
            <p className="text-sm text-gray-300">
              React, Tailwind CSS, Zustand, Axios, REST API, Responsive Design
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:scale-95 transition">
            <h3 className="font-semibold mb-2">🎯 Purpose</h3>
            <p className="text-sm text-gray-300">
              Showcase frontend skills, API consumption, state management, and UI polish in a real-world style project.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:scale-95 transition">
            <h3 className="font-semibold mb-2">🚧 Status</h3>
            <p className="text-sm text-gray-300">
              MVP released. Some features are under active development and marked as “Coming Soon”.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400">
            This project is for educational and portfolio purposes only.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
