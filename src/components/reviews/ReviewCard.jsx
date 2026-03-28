import { useState } from 'react'
import StarRating from '../ui/StarRating.jsx'

const DIMENSIONS = [
  { key: 'enginePerformance', label: 'Engine' },
  { key: 'comfortErgonomics', label: 'Comfort' },
  { key: 'handlingBraking', label: 'Handling' },
  { key: 'interiorCondition', label: 'Interior' },
  { key: 'fuelEfficiency', label: 'Efficiency' },
  { key: 'noiseLevels', label: 'Noise' },
  { key: 'overallRecommend', label: 'Overall' },
]

export default function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(false)
  const [votes, setVotes] = useState(review.helpfulVotes)

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true)
      setVotes((v) => v + 1)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0">
            {review.reviewerName[0]}
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{review.reviewerName}</p>
            <p className="text-xs text-slate-400">
              Member since {review.reviewerJoinDate} &middot; {review.reviewerTotalReviews} {review.reviewerTotalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 justify-end">
            <StarRating rating={review.averageRating} size="xs" />
            <span className="text-xs font-bold text-slate-700">{review.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Test drive {review.testDriveDate}</p>
        </div>
      </div>

      {/* Dimensional ratings grid */}
      <div className="grid grid-cols-7 gap-1 mb-4 text-center">
        {DIMENSIONS.map(({ key, label }) => (
          <div key={key}>
            <div className={`text-sm font-bold ${review.ratings[key] >= 4 ? 'text-teal-600' : review.ratings[key] === 3 ? 'text-amber-600' : 'text-red-600'}`}>
              {review.ratings[key]}
            </div>
            <div className="text-xs text-slate-400 leading-tight mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Written review */}
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Liked</span>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{review.liked}</p>
        </div>
        {review.improvements && review.improvements !== 'None at this price.' && review.improvements !== 'None to speak of at this price.' && (
          <div>
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Could Improve</span>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">{review.improvements}</p>
          </div>
        )}
        {review.concerns && review.concerns !== 'None.' && review.concerns !== 'N/A' && review.concerns !== 'None at all. Marcus\'s inspection was spot on.' && (
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Concerns</span>
            <p className="text-sm text-slate-700 mt-1 leading-relaxed">{review.concerns}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          {review.wouldBuy ? (
            <>
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-green-600">Would buy</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-red-500">Would not buy</span>
            </>
          )}
        </div>
        <button
          onClick={handleHelpful}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
            helpful
              ? 'bg-teal-50 border-teal-200 text-teal-700 font-medium'
              : 'border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-600'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          Helpful ({votes})
        </button>
      </div>
    </div>
  )
}
