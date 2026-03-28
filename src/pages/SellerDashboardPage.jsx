import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { sellerDashboard } from '../data/seller.js'
import Button from '../components/ui/Button.jsx'

function OfferCard({ offer, onAction }) {
  if (offer.status !== 'pending') {
    return (
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
              {offer.buyerName[0]}
            </div>
            <span className="font-medium text-sm text-slate-700">{offer.buyerName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              offer.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {offer.status}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1">${offer.amount.toLocaleString()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-sm font-bold shrink-0">
          {offer.buyerName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-800 text-sm">{offer.buyerName}</span>
            <span className="text-xs text-slate-400">{offer.date}</span>
          </div>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">${offer.amount.toLocaleString()}</p>
          {offer.message && (
            <p className="text-sm text-slate-500 mt-1 leading-relaxed italic">"{offer.message}"</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onAction(offer.offerId, 'accepted')}
          size="sm"
          fullWidth
        >
          Accept
        </Button>
        <Button
          onClick={() => onAction(offer.offerId, 'declined')}
          variant="secondary"
          size="sm"
          fullWidth
        >
          Decline
        </Button>
      </div>
    </div>
  )
}

function ListingsTab({ dashboard, offerStates, setOfferStates }) {
  const [expanded, setExpanded] = useState(null)

  const handleOffer = (offerId, status) => {
    setOfferStates((prev) => ({ ...prev, [offerId]: status }))
  }

  return (
    <div className="space-y-4">
      {dashboard.listings.map((listing) => {
        const isExpanded = expanded === listing.vehicleId
        const pendingOffers = listing.offers.filter(
          (o) => (offerStates[o.offerId] || o.status) === 'pending'
        )

        return (
          <div key={listing.vehicleId} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img
                  src={listing.image}
                  alt={`${listing.year} ${listing.make} ${listing.model}`}
                  className="w-20 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                  onError={(e) => { e.target.src = `https://placehold.co/100x70/1e293b/94a3b8?text=${listing.make}` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-800">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="text-slate-500 text-sm">${listing.price.toLocaleString()}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : listing.status === 'sold'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {listing.status === 'sold' ? `Sold ${listing.soldDate}` : listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {listing.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                      </svg>
                      {listing.testDrivesScheduled} test drives
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Listed {listing.daysListed} days ago
                    </span>
                    {listing.inspectionStatus === 'completed' && (
                      <span className="text-amber-600 font-medium">Expert verified</span>
                    )}
                  </div>
                </div>
              </div>

              {listing.status === 'active' && listing.offers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {pendingOffers.length} pending offer{pendingOffers.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : listing.vehicleId)}
                    className="text-sm text-teal-600 font-semibold flex items-center gap-1"
                  >
                    {isExpanded ? 'Hide' : 'View offers'}
                    <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3 bg-slate-50">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Offers Received</h4>
                {listing.offers.map((offer) => (
                  <OfferCard
                    key={offer.offerId}
                    offer={{ ...offer, status: offerStates[offer.offerId] || offer.status }}
                    onAction={handleOffer}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ListCarTab() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    make: '', model: '', year: '', mileage: '', price: '',
    transmission: 'Automatic', fuelType: 'Gasoline', bodyType: 'Sedan',
    color: '', description: '', requestInspection: false, inspectionTier: 'standard',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Listing Submitted!</h2>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
          Your {form.year} {form.make} {form.model} has been submitted for review.
          {form.requestInspection && ' An expert inspector will contact you within 24 hours to schedule your inspection.'}
        </p>
        <Button onClick={() => { setSubmitted(false); setStep(1); setForm({ make: '', model: '', year: '', mileage: '', price: '', transmission: 'Automatic', fuelType: 'Gasoline', bodyType: 'Sedan', color: '', description: '', requestInspection: false, inspectionTier: 'standard' }) }}>
          List Another Vehicle
        </Button>
      </div>
    )
  }

  const inputClass = "w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-xl">
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= s ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > s ? (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : s}
            </div>
            <span className={`text-xs font-medium ${step >= s ? 'text-teal-700' : 'text-slate-400'}`}>
              {s === 1 ? 'Vehicle Info' : s === 2 ? 'Description' : 'Inspection'}
            </span>
            {s < 3 && <span className="text-slate-300 ml-1">›</span>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-4">Step 1: Basic Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Make *</label>
              <input value={form.make} onChange={(e) => update('make', e.target.value)} placeholder="e.g. Toyota" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Model *</label>
              <input value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="e.g. Camry" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Year *</label>
              <input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} placeholder="e.g. 2021" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Mileage *</label>
              <input type="number" value={form.mileage} onChange={(e) => update('mileage', e.target.value)} placeholder="e.g. 34200" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Asking Price ($) *</label>
              <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="e.g. 22500" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Color</label>
              <input value={form.color} onChange={(e) => update('color', e.target.value)} placeholder="e.g. Midnight Blue" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Body Type</label>
              <select value={form.bodyType} onChange={(e) => update('bodyType', e.target.value)} className={inputClass}>
                {['Sedan', 'SUV', 'Truck', 'Coupe', 'Van'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Transmission</label>
              <select value={form.transmission} onChange={(e) => update('transmission', e.target.value)} className={inputClass}>
                {['Automatic', 'Manual', 'CVT', 'Single-Speed'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fuel Type</label>
              <select value={form.fuelType} onChange={(e) => update('fuelType', e.target.value)} className={inputClass}>
                {['Gasoline', 'Hybrid', 'Electric', 'Diesel'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Button
            onClick={() => setStep(2)}
            disabled={!form.make || !form.model || !form.year || !form.price}
            fullWidth
          >
            Continue →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-4">Step 2: Description & Details</h3>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Vehicle Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={5}
              placeholder="Describe the vehicle's history, condition, highlights, and any known issues..."
              className={`${inputClass} resize-none`}
            />
            <p className="text-xs text-slate-400 mt-1">{form.description.length} characters (minimum 50 recommended)</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-500 font-medium mb-1">Photo Upload</p>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-400">
              <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-xs">Photo upload available after listing creation</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(1)} fullWidth>← Back</Button>
            <Button onClick={() => setStep(3)} disabled={form.description.length < 20} fullWidth>Continue →</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 mb-4">Step 3: Expert Inspection</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="inspection"
                checked={form.requestInspection}
                onChange={(e) => update('requestInspection', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-amber-500"
              />
              <label htmlFor="inspection" className="cursor-pointer">
                <p className="font-semibold text-amber-800 text-sm">Request Expert Inspection</p>
                <p className="text-xs text-amber-600 mt-1">
                  Expert-verified listings sell 3x faster. A certified inspector will visit your vehicle, document its condition, and recommend a fair market price.
                </p>
              </label>
            </div>
          </div>

          {form.requestInspection && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Select inspection tier:</p>
              {[
                { id: 'basic', label: 'Basic', price: '$50', desc: '25-point inspection, condition report' },
                { id: 'standard', label: 'Standard', price: '$99', desc: '50-point inspection, price recommendation, photos' },
                { id: 'premium', label: 'Premium', price: '$149', desc: '100-point inspection, video walkthrough, full report' },
              ].map(({ id, label, price, desc }) => (
                <label key={id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  form.inspectionTier === id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 bg-white hover:border-teal-200'
                }`}>
                  <input
                    type="radio"
                    name="tier"
                    value={id}
                    checked={form.inspectionTier === id}
                    onChange={() => update('inspectionTier', id)}
                    className="mt-0.5 accent-teal-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-800">{label}</span>
                      <span className="text-sm font-bold text-teal-700">{price}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(2)} fullWidth>← Back</Button>
            <Button onClick={() => setSubmitted(true)} fullWidth>
              Submit Listing
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SellerDashboardPage() {
  const { role } = useUser()
  const [activeTab, setActiveTab] = useState('listings')
  const [offerStates, setOfferStates] = useState({})

  if (role !== 'seller') {
    return <Navigate to="/" />
  }

  const pendingOfferCount = sellerDashboard.listings.reduce(
    (sum, l) => sum + l.offers.filter((o) => (offerStates[o.offerId] || o.status) === 'pending').length,
    0
  )

  const tabs = [
    { id: 'listings', label: 'My Listings' },
    { id: 'list', label: 'List a Car' },
    { id: 'earnings', label: 'Earnings' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Seller Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, {sellerDashboard.name}!</p>
        </div>
        <Button onClick={() => setActiveTab('list')}>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          List a Car
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Listings', value: sellerDashboard.totalListings, color: 'text-teal-600' },
          { label: 'Pending Offers', value: pendingOfferCount, color: 'text-amber-600' },
          { label: 'Completed Sales', value: sellerDashboard.completedSales, color: 'text-green-600' },
          { label: 'Total Earned', value: `$${sellerDashboard.totalEarned.toLocaleString()}`, color: 'text-slate-900' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming test drives */}
      {sellerDashboard.upcomingTestDrives.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-teal-800 text-sm mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Upcoming Test Drives
          </h3>
          <div className="space-y-2">
            {sellerDashboard.upcomingTestDrives.map((td, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {td.buyerName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{td.buyerName}</p>
                  <p className="text-xs text-slate-500 truncate">{td.vehicle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-slate-700">{td.date}</p>
                  <p className="text-xs text-slate-400">{td.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              {id === 'listings' && pendingOfferCount > 0 && (
                <span className="ml-2 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                  {pendingOfferCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'listings' && (
        <ListingsTab
          dashboard={sellerDashboard}
          offerStates={offerStates}
          setOfferStates={setOfferStates}
        />
      )}

      {activeTab === 'list' && <ListCarTab />}

      {activeTab === 'earnings' && (
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Earned (All Time)', value: `$${sellerDashboard.totalEarned.toLocaleString()}`, sub: 'After platform commission', color: 'text-green-600' },
            { label: 'Pending Offers Value', value: `$${sellerDashboard.listings.flatMap((l) => l.offers.filter((o) => o.status === 'pending')).reduce((s, o) => s + o.amount, 0).toLocaleString()}`, sub: 'Awaiting acceptance', color: 'text-amber-600' },
            { label: 'Active Listings Value', value: `$${sellerDashboard.listings.filter((l) => l.status === 'active').reduce((s, l) => s + l.price, 0).toLocaleString()}`, sub: 'Current asking prices', color: 'text-teal-600' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</p>
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
          <div className="sm:col-span-3 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-2 text-sm">Commission Structure</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              SocialDrive charges a <strong>5–8% commission</strong> on successful sales, deducted automatically from escrow at time of transaction completion. Inspection fees (paid at time of booking) are separate and go directly to the expert inspector (60–70%) and platform (30–40%).
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
