import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../../context/UserContext.jsx'

export default function Navbar() {
  const { role, setRole } = useUser()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-teal-400 font-extrabold text-xl tracking-tight">Social</span>
            <span className="text-white font-extrabold text-xl tracking-tight">Drive</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/listings"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/listings')
                  ? 'text-white bg-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Browse Cars
            </Link>
            {role === 'seller' && (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-white bg-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                My Dashboard
              </Link>
            )}
            {role === 'buyer' && (
              <span className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 cursor-not-allowed">
                Saved Cars
              </span>
            )}
          </div>

          {/* Right side: role switcher */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Demo Mode:</span>
              <div className="flex bg-slate-800 rounded-full p-0.5 border border-slate-700">
                {['buyer', 'seller', 'expert'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all capitalize ${
                      role === r
                        ? 'bg-teal-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 space-y-2">
          <Link
            to="/listings"
            className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={() => setMobileOpen(false)}
          >
            Browse Cars
          </Link>
          {role === 'seller' && (
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-700"
              onClick={() => setMobileOpen(false)}
            >
              My Dashboard
            </Link>
          )}
          <div className="pt-2 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Demo Mode:</p>
            <div className="flex gap-2">
              {['buyer', 'seller', 'expert'].map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setMobileOpen(false) }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                    role === r ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
