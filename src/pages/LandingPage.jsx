import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { vehicles } from '../data/vehicles.js'
import VehicleCard from '../components/vehicles/VehicleCard.jsx'

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Expert-Verified Listings',
    description:
      'Every verified vehicle is inspected by certified mechanics who document condition, flag issues, and validate the asking price — giving you unmatched confidence.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
      </svg>
    ),
    title: 'Community Test Drive Reviews',
    description:
      'Real buyers rate vehicles across 7 dimensions after every test drive. Our community insights help you choose with confidence, not guesswork.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
      </svg>
    ),
    title: 'Secure Escrow Payments',
    description:
      'Funds are held in escrow until both parties confirm a successful handover. No wire fraud, no uncertainty — just a clean, protected transaction.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Seller Lists Vehicle',
    description: 'Upload photos, describe the car, and optionally request a professional inspection to maximize buyer trust.',
    color: 'text-teal-600',
  },
  {
    number: '02',
    title: 'Expert Inspects & Prices',
    description: 'A certified inspector visits the vehicle, documents findings, and validates a fair market price.',
    color: 'text-amber-600',
  },
  {
    number: '03',
    title: 'Buyers Test Drive & Review',
    description: 'Interested buyers schedule test drives and share detailed multi-dimensional reviews for the community.',
    color: 'text-teal-600',
  },
  {
    number: '04',
    title: 'Secure Sale & Transfer',
    description: 'Buyer submits payment to escrow. Funds release to seller upon confirmed handover. Everyone wins.',
    color: 'text-amber-600',
  },
]

const testimonials = [
  {
    quote: "I was nervous about buying a used car online, but the expert inspection report and 5 test drive reviews gave me complete confidence. Best purchase I've made.",
    name: 'Jordan T.',
    role: 'Bought a 2021 Toyota Camry',
    initials: 'JT',
    color: 'bg-teal-100 text-teal-700',
  },
  {
    quote: "Sold my Civic in 18 days — faster than any other platform I've tried. The expert verification brought serious buyers from day one.",
    name: 'Alex C.',
    role: 'Sold a 2018 Honda Civic',
    initials: 'AC',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    quote: "The community reviews are surprisingly candid and detailed. I read 4 test drive experiences before booking my own — felt like talking to friends who'd already owned the car.",
    name: 'Morgan L.',
    role: 'Bought a 2020 BMW 330i',
    initials: 'ML',
    color: 'bg-slate-100 text-slate-700',
  },
]

const stats = [
  { value: '10,000+', label: 'Active Listings' },
  { value: '95%', label: 'Transaction Success' },
  { value: '4.8★', label: 'Expert Avg Rating' },
  { value: '$500K', label: 'MRR Target (Yr 2)' },
]

export default function LandingPage() {
  const { setRole } = useUser()
  const featuredVehicles = vehicles.filter((v) => v.isExpertVerified).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-900/50 border border-teal-700/50 rounded-full px-3 py-1.5 text-teal-400 text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Trusted by 100,000+ buyers & sellers
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Buy used cars with{' '}
                <span className="text-teal-400">complete</span>{' '}
                confidence
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Expert inspections, community test drive reviews, and secure escrow payments
                combine to eliminate the risk from every used car transaction.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/listings"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-teal-900/30"
                >
                  Browse Cars
                </Link>
                <button
                  onClick={() => setRole('seller')}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-colors border border-white/10"
                >
                  List Your Car
                </button>
              </div>
            </div>

            {/* Vehicle card previews */}
            <div className="hidden lg:grid grid-cols-1 gap-3 relative">
              {featuredVehicles.map((v, i) => (
                <Link
                  key={v.id}
                  to={`/listings/${v.id}`}
                  className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors ${i === 1 ? 'ml-6' : ''}`}
                >
                  <img
                    src={v.images[0]}
                    alt={`${v.year} ${v.make} ${v.model}`}
                    className="w-16 h-12 rounded-lg object-cover bg-slate-700 shrink-0"
                    onError={(e) => { e.target.src = `https://placehold.co/80x60/1e293b/94a3b8?text=${v.make}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{v.year} {v.make} {v.model}</p>
                    <p className="text-slate-400 text-xs">{v.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-bold text-sm">${v.price.toLocaleString()}</p>
                    <span className="text-xs text-amber-400 font-medium">Expert Verified</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-teal-100 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Why SocialDrive is different
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We solved the three biggest problems in used car buying: uncertain condition, unknown fair price, and unsafe payment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon, title, description }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              How it works
            </h2>
            <p className="text-slate-500 text-lg">From listing to keys in hand — in as little as 7 days.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ number, title, description, color }, i) => (
              <div key={number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-slate-200 z-0 -translate-y-0.5" style={{ width: 'calc(100% - 2rem)', left: '100%' }} />
                )}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 h-full">
                  <span className={`text-4xl font-extrabold ${color} opacity-30 block mb-3`}>{number}</span>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
                Featured listings
              </h2>
              <p className="text-slate-500">Expert-verified vehicles ready to drive home.</p>
            </div>
            <Link
              to="/listings"
              className="hidden sm:inline-flex items-center gap-1 text-teal-600 font-semibold hover:text-teal-800 transition-colors"
            >
              View all
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              Browse All Vehicles
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              What our community says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, initials, color }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${color}`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{name}</p>
                    <p className="text-slate-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to buy or sell with confidence?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of buyers and sellers who trust SocialDrive for transparent, community-backed car transactions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Find Your Car
            </Link>
            <button
              onClick={() => setRole('seller')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 transition-colors"
            >
              List Your Car
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
