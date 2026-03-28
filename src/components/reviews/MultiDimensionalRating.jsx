import StarRating from '../ui/StarRating.jsx'

const DIMENSIONS = [
  { key: 'enginePerformance', label: 'Engine Performance' },
  { key: 'comfortErgonomics', label: 'Comfort & Ergonomics' },
  { key: 'handlingBraking', label: 'Handling & Braking' },
  { key: 'interiorCondition', label: 'Interior Condition' },
  { key: 'fuelEfficiency', label: 'Fuel Efficiency' },
  { key: 'noiseLevels', label: 'Noise Levels' },
  { key: 'overallRecommend', label: 'Overall Recommendation' },
]

function avgRating(reviews) {
  if (!reviews || reviews.length === 0) return null
  const totals = {}
  DIMENSIONS.forEach(({ key }) => { totals[key] = 0 })
  reviews.forEach((r) => {
    DIMENSIONS.forEach(({ key }) => {
      totals[key] += r.ratings[key] || 0
    })
  })
  const averages = {}
  DIMENSIONS.forEach(({ key }) => {
    averages[key] = totals[key] / reviews.length
  })
  return averages
}

export default function MultiDimensionalRating({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm">
        No ratings yet.
      </div>
    )
  }

  const averages = avgRating(reviews)
  const overallAvg = reviews.reduce((sum, r) => sum + r.averageRating, 0) / reviews.length

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      {/* Overall summary */}
      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-slate-900">{overallAvg.toFixed(1)}</p>
          <StarRating rating={overallAvg} size="sm" />
          <p className="text-xs text-slate-500 mt-1">{reviews.length} test {reviews.length === 1 ? 'drive' : 'drives'}</p>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Math.round(r.averageRating) === star).length
            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
            return (
              <div key={star} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 w-4">{star}</span>
                <svg className="w-3 h-3 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-amber-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-6 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Per-dimension breakdown */}
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Category Breakdown</h4>
      <div className="space-y-2.5">
        {DIMENSIONS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-sm text-slate-600 w-44 shrink-0">{label}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-2">
              <div
                className="bg-teal-500 h-2 rounded-full transition-all"
                style={{ width: `${(averages[key] / 5) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-700 w-8 text-right">
              {averages[key].toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
