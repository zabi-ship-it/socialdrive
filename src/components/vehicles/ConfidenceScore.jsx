export default function ConfidenceScore({ score, inspectionScore, reviewCount, reviewAvg, compact = false }) {
  const config = {
    high: {
      label: 'High Confidence',
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
      dot: 'bg-green-500',
      icon: (
        <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    medium: {
      label: 'Medium Confidence',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: (
        <svg className="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    low: {
      label: 'Low Confidence',
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
      dot: 'bg-red-500',
      icon: (
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
  }

  const c = config[score] || config.low

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.bg} ${c.border} ${c.color}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {c.label}
      </span>
    )
  }

  return (
    <div className={`rounded-xl border p-4 ${c.bg} ${c.border}`}>
      <div className="flex items-center gap-2 mb-2">
        {c.icon}
        <span className={`font-bold text-base ${c.color}`}>{c.label}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {inspectionScore != null && (
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-slate-500 font-medium">Expert Score</p>
            <p className="text-lg font-bold text-slate-800">{inspectionScore}<span className="text-sm font-normal text-slate-500">/10</span></p>
          </div>
        )}
        {reviewCount > 0 && (
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-slate-500 font-medium">Community Rating</p>
            <p className="text-lg font-bold text-slate-800">
              {reviewAvg?.toFixed(1)}<span className="text-sm font-normal text-slate-500">/5 ({reviewCount})</span>
            </p>
          </div>
        )}
        {inspectionScore == null && (
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-slate-500 font-medium">Expert Score</p>
            <p className="text-sm font-medium text-slate-400 italic">Not inspected</p>
          </div>
        )}
        {reviewCount === 0 && (
          <div className="bg-white rounded-lg p-2.5">
            <p className="text-xs text-slate-500 font-medium">Community Rating</p>
            <p className="text-sm font-medium text-slate-400 italic">No reviews yet</p>
          </div>
        )}
      </div>
      {score === 'low' && (
        <p className="mt-3 text-xs text-red-600 font-medium">
          This listing lacks expert verification or community reviews. Consider requesting an inspection before purchase.
        </p>
      )}
    </div>
  )
}
