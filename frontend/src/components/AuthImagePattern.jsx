import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
  return (
  <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12">
    <div className="max-w-md text-center bg-white/80 rounded-xl shadow-xl p-8">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                i % 3 === 0
                  ? "bg-pink-400/30 animate-pulse"
                  : i % 2 === 0
                  ? "bg-indigo-400/30 animate-pulse"
                  : "bg-purple-400/30"
              }`}
            />
          ))}
        </div>
  <h2 className="text-3xl font-extrabold mb-4 text-indigo-700 drop-shadow-lg">{title}</h2>
  <p className="text-lg text-purple-700/80 mb-2">{subtitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern