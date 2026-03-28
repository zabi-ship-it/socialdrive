import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { experts } from '../data/experts.js'
import { useUser } from '../context/UserContext.jsx'
import StarRating from '../components/ui/StarRating.jsx'
import Button from '../components/ui/Button.jsx'

export default function ExpertProfilePage() {
  const { id } = useParams()
  const { role } = useUser()
  const expert = experts.find((e) => e.id === id)

  const [bookingDate, setBookingDate] = useState('')
  const [bookingNote, setBookingNote] = useState('')
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  if (!expert) return <Navigate to="/listings" />

  const handleBooking = (e) => {
    e.preventDefault()
    setBookingSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-teal-600">Home</Link>
        <span>›</span>
        <span className="text-slate-800">Expert Inspectors</span>
        <span>›</span>
        <span className="text-slate-800">{expert.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Expert profile */}
        <div className="lg:col-span-1 space-y-5">
          {/* Profile card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-24 h-24 rounded-full object-cover bg-slate-100 mx-auto"
                onError={(e) => {
                  e.target.src = `https://placehold.co/100/0d9488/ffffff?text=${expert.name[0]}`
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h1 className="text-xl font-extrabold text-slate-900">{expert.name}</h1>
            <p className="text-slate-500 text-sm mb-3">{expert.title}</p>

            <div className="flex items-center justify-center gap-1.5 mb-4">
              <StarRating rating={expert.rating} size="sm" showValue />
              <span className="text-xs text-slate-400">({expert.totalRatings} ratings)</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mb-4">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {expert.location}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 mb-4">
              <div className="text-center">
                <p className="text-lg font-extrabold text-slate-900">{expert.totalInspections}</p>
                <p className="text-xs text-slate-400">Inspections</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-slate-900">{expert.yearsExperience}</p>
                <p className="text-xs text-slate-400">Years Exp.</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-teal-600">${expert.inspectionFee}</p>
                <p className="text-xs text-slate-400">Inspection</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Certifications</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {expert.certifications.map((cert) => (
                  <span key={cert} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Specialties</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {expert.specialties.map((s) => (
                  <span key={s} className="text-xs bg-teal-50 text-teal-700 border border-teal-100 px-2 py-1 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Response & availability */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Response time: <strong>{expert.responseTime}</strong>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-teal-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Available: <strong>{expert.availability.join(', ')}</strong>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-6.54H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.992a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.99A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
                Languages: <strong>{expert.languages.join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-800 mb-3">About {expert.name.split(' ')[0]}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{expert.bio}</p>
          </div>
        </div>

        {/* Right: Inspections + booking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent inspections */}
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Recent Inspections</h2>
            <div className="space-y-3">
              {expert.recentInspections.map((insp) => (
                <Link
                  key={insp.vehicleId}
                  to={`/listings/${insp.vehicleId}`}
                  className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-teal-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                      {insp.vehicle}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Inspected on {insp.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-lg font-extrabold ${insp.score >= 8 ? 'text-green-600' : insp.score >= 6 ? 'text-amber-600' : 'text-red-600'}`}>
                      {insp.score}
                    </p>
                    <p className="text-xs text-slate-400">/ 10</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-teal-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Buyer reviews of the expert */}
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">What clients say</h2>
            <div className="space-y-3">
              {expert.reviews.map((rev, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
                        {rev.reviewer[0]}
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{rev.reviewer}</span>
                    </div>
                    <div className="text-right">
                      <StarRating rating={rev.rating} size="xs" />
                      <p className="text-xs text-slate-400 mt-0.5">{rev.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book inspection (sellers and buyers only) */}
          {role !== 'expert' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                Book an Inspection with {expert.name.split(' ')[0]}
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                Inspection fee: <strong className="text-slate-800">${expert.inspectionFee}</strong> · Available: {expert.availability.join(', ')}
              </p>

              {bookingSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Booking Sent!</h3>
                  <p className="text-slate-500 text-sm">
                    {expert.name} will confirm your inspection within {expert.responseTime}.
                  </p>
                  <button
                    className="mt-4 text-teal-600 text-sm font-semibold hover:underline"
                    onClick={() => { setBookingSubmitted(false); setBookingDate(''); setBookingNote('') }}
                  >
                    Book another date
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Preferred date *</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 2021 Toyota Camry"
                        className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes for the inspector (optional)</label>
                    <textarea
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      rows={3}
                      placeholder="Any specific concerns or areas to focus on..."
                      className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    />
                  </div>
                  <Button type="submit" fullWidth size="lg">
                    Request Inspection · ${expert.inspectionFee}
                  </Button>
                  <p className="text-xs text-slate-400 text-center">
                    You won't be charged until {expert.name.split(' ')[0]} confirms the booking.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
