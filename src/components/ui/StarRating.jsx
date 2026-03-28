export default function StarRating({ rating, maxRating = 5, size = 'md', showValue = false }) {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating)
          const partial = !filled && i < rating

          return (
            <svg
              key={i}
              className={`${sizes[size]} ${
                filled
                  ? 'text-amber-400'
                  : partial
                  ? 'text-amber-300'
                  : 'text-slate-200'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )
        })}
      </div>
      {showValue && (
        <span className={`font-semibold text-slate-700 ${textSizes[size]}`}>
          {typeof rating === 'number' ? rating.toFixed(1) : rating}
        </span>
      )}
    </div>
  )
}
