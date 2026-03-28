import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { vehicles } from '../data/vehicles.js'
import { reviews as allReviews } from '../data/reviews.js'
import { experts } from '../data/experts.js'
import { useUser } from '../context/UserContext.jsx'
import ConfidenceScore from '../components/vehicles/ConfidenceScore.jsx'
import InspectionReport from '../components/vehicles/InspectionReport.jsx'
import ReviewCard from '../components/reviews/ReviewCard.jsx'
import MultiDimensionalRating from '../components/reviews/MultiDimensionalRating.jsx'
import StarRating from '../components/ui/StarRating.jsx'
import Button from '../components/ui/Button.jsx'

function TestDriveModal({ vehicle, onClose }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Test Drive Requested!</h2>
          <p className="text-slate-500 mb-6">
            Your request for <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong> on {date} at {time} has been sent to {vehicle.sellerName}. You'll hear back within 2 hours.
          </p>
          <Button onClick={onClose} fullWidth>Close</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Book a Test Drive</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-5">
          {vehicle.year} {vehicle.make} {vehicle.model} &mdash; {vehicle.location}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred time</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select a time</option>
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <Button type="submit" fullWidth size="lg">
            Send Test Drive Request
          </Button>
        </form>
      </div>
    </div>
  )
}

function MakeOfferModal({ vehicle, onClose }) {
  const [amount, setAmount] = useState(vehicle.price)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Offer Sent!</h2>
          <p className="text-slate-500 mb-6">
            Your offer of <strong>${Number(amount).toLocaleString()}</strong> has been sent to {vehicle.sellerName}. You'll be notified when they respond.
          </p>
          <Button onClick={onClose} fullWidth>Close</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900">Make an Offer</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 mb-5 text-sm text-slate-600">
          Asking price: <strong className="text-slate-900">${vehicle.price.toLocaleString()}</strong>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your offer ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Introduce yourself and explain your offer..."
              className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
          <Button onClick={() => setSubmitted(true)} fullWidth size="lg" variant="amber">
            Send Offer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function VehicleDetailPage() {
  const { id } = useParams()
  const { role } = useUser()
  const vehicle = vehicles.find((v) => v.id === id)
  const vehicleReviews = allReviews.filter((r) => r.vehicleId === id)
  const expert = vehicle?.expertId ? experts.find((e) => e.id === vehicle.expertId) : null

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showTestDrive, setShowTestDrive] = useState(false)
  const [showOffer, setShowOffer] = useState(false)

  if (!vehicle) {
    return <Navigate to="/listings" />
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'inspection', label: `Inspection${vehicle.inspection ? ` (${vehicle.inspection.overallScore}/10)` : ''}` },
    { id: 'reviews', label: `Reviews (${vehicleReviews.length})` },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-teal-600">Home</Link>
        <span>›</span>
        <Link to="/listings" className="hover:text-teal-600">Listings</Link>
        <span>›</span>
        <span className="text-slate-800">{vehicle.year} {vehicle.make} {vehicle.model}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left / main content */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="mb-6">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-3">
              <img
                src={vehicle.images[selectedImage]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x500/1e293b/94a3b8?text=${vehicle.year}+${vehicle.make}+${vehicle.model}`
                }}
              />
            </div>
            {vehicle.images.length > 1 && (
              <div className="flex gap-2">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-teal-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = `https://placehold.co/80x60/1e293b/94a3b8?text=${i + 1}` }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title + badges */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {vehicle.isExpertVerified && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Expert Verified
                </span>
              )}
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{vehicle.bodyType}</span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{vehicle.fuelType}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {vehicle.location}
              </span>
              <span>·</span>
              <span>{vehicle.mileage.toLocaleString()} miles</span>
              <span>·</span>
              <span>{vehicle.transmission}</span>
            </div>
            {vehicleReviews.length > 0 && vehicle.communityRatingAvg && (
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={vehicle.communityRatingAvg} size="sm" />
                <span className="text-sm text-slate-600">
                  {vehicle.communityRatingAvg.toFixed(1)} from {vehicleReviews.length} test drive{vehicleReviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Confidence score */}
          <div className="mb-6">
            <ConfidenceScore
              score={vehicle.confidenceScore}
              inspectionScore={vehicle.inspectionScore}
              reviewCount={vehicleReviews.length}
              reviewAvg={vehicle.communityRatingAvg}
            />
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 mb-6">
            <div className="flex gap-0">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                    activeTab === id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div>
              {/* Key specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Year', value: vehicle.year },
                  { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} mi` },
                  { label: 'Transmission', value: vehicle.transmission },
                  { label: 'Fuel Type', value: vehicle.fuelType },
                  { label: 'Color', value: vehicle.color },
                  { label: 'VIN', value: vehicle.vin },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 mb-3">About this vehicle</h3>
                <p className="text-slate-600 leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3">Features & Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <span key={f} className="flex items-center gap-1.5 bg-teal-50 text-teal-700 border border-teal-100 text-xs font-medium px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inspection' && (
            <InspectionReport inspection={vehicle.inspection} />
          )}

          {activeTab === 'reviews' && (
            <div>
              {vehicleReviews.length > 0 ? (
                <>
                  <MultiDimensionalRating reviews={vehicleReviews} />
                  <div className="mt-6 space-y-4">
                    {vehicleReviews.map((r) => (
                      <ReviewCard key={r.id} review={r} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-12 h-12 text-slate-200 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <h3 className="font-bold text-slate-600 mb-2">No reviews yet</h3>
                  <p className="text-slate-400 text-sm">Be the first to test drive this vehicle and share your experience.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Price card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-3xl font-extrabold text-slate-900">${vehicle.price.toLocaleString()}</p>
                {vehicle.isExpertVerified && vehicle.expertVerifiedPrice === vehicle.price && (
                  <p className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Expert Verified Price
                  </p>
                )}
                {vehicle.expertVerifiedPrice && vehicle.expertVerifiedPrice !== vehicle.price && (
                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    Expert suggested: ${vehicle.expertVerifiedPrice.toLocaleString()}
                  </p>
                )}
              </div>

              {role === 'buyer' ? (
                <div className="space-y-2.5">
                  <Button fullWidth size="lg" onClick={() => setShowTestDrive(true)}>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                    </svg>
                    Schedule Test Drive
                  </Button>
                  <Button variant="secondary" fullWidth size="lg" onClick={() => setShowOffer(true)}>
                    Make an Offer
                  </Button>
                </div>
              ) : role === 'seller' ? (
                <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-500 text-center">
                  Switch to Buyer view to schedule a test drive or make an offer.
                </div>
              ) : (
                <div className="space-y-2.5">
                  <Button fullWidth variant="amber">
                    Book an Inspection
                  </Button>
                  <Button variant="secondary" fullWidth>
                    View Inspection History
                  </Button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure escrow payment
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5–8% commission only on sale
                </div>
              </div>
            </div>

            {/* Seller info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Seller</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                  {vehicle.sellerName[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{vehicle.sellerName}</p>
                  <p className="text-xs text-slate-400">Member since {vehicle.sellerMemberSince}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {vehicle.sellerPhone}
              </div>
            </div>

            {/* Expert card if verified */}
            {vehicle.isExpertVerified && expert && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-3">Expert Inspector</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-10 h-10 rounded-full object-cover bg-amber-100 shrink-0"
                    onError={(e) => { e.target.src = `https://placehold.co/40/f59e0b/ffffff?text=${expert.name[0]}` }}
                  />
                  <div>
                    <Link to={`/experts/${expert.id}`} className="font-semibold text-slate-800 text-sm hover:text-teal-600 transition-colors">
                      {expert.name}
                    </Link>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarRating rating={expert.rating} size="xs" />
                      <span className="text-xs text-slate-500">{expert.rating}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/experts/${expert.id}`}
                  className="block mt-3 text-xs text-center text-amber-700 font-semibold hover:underline"
                >
                  View inspector profile →
                </Link>
              </div>
            )}

            {/* Test drive stats */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-slate-900">{vehicle.testDriveCount}</p>
                  <p className="text-xs text-slate-500">Test drives</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{vehicleReviews.length}</p>
                  <p className="text-xs text-slate-500">Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTestDrive && (
        <TestDriveModal vehicle={vehicle} onClose={() => setShowTestDrive(false)} />
      )}
      {showOffer && (
        <MakeOfferModal vehicle={vehicle} onClose={() => setShowOffer(false)} />
      )}
    </div>
  )
}
