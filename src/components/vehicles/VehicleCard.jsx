import { Link } from 'react-router-dom'
import StarRating from '../ui/StarRating.jsx'

export default function VehicleCard({ vehicle }) {
  const {
    id,
    make,
    model,
    year,
    mileage,
    price,
    expertVerifiedPrice,
    isExpertVerified,
    inspectionScore,
    confidenceScore,
    bodyType,
    transmission,
    fuelType,
    location,
    images,
    reviewCount,
    communityRatingAvg,
  } = vehicle

  return (
    <Link
      to={`/listings/${id}`}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={images[0]}
          alt={`${year} ${make} ${model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/800x500/1e293b/94a3b8?text=${year}+${make}+${model}`
          }}
        />
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isExpertVerified && (
            <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Expert Verified
            </span>
          )}
          {confidenceScore === 'high' && !isExpertVerified && (
            <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              High Confidence
            </span>
          )}
          {confidenceScore === 'low' && (
            <span className="bg-slate-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              Needs Inspection
            </span>
          )}
        </div>
        {/* Body type pill */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
            {bodyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-teal-600 transition-colors">
            {year} {make} {model}
          </h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0115 12.268V13a1 1 0 001 1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-3.268A2.968 2.968 0 0117.038 6H15a1 1 0 00-.832.445l-1.977 2.966A2.5 2.5 0 0010 9H9V5a1 1 0 00-1-1H3z" />
            </svg>
            {mileage.toLocaleString()} mi
          </span>
          <span>·</span>
          <span>{transmission}</span>
          <span>·</span>
          <span>{fuelType}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </div>

        {/* Community rating */}
        {reviewCount > 0 && communityRatingAvg && (
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={communityRatingAvg} size="xs" />
            <span className="text-xs text-slate-500">
              {communityRatingAvg.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
        {(!reviewCount || reviewCount === 0) && (
          <div className="mb-3">
            <span className="text-xs text-slate-400 italic">No community reviews yet</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xl font-extrabold text-slate-900">
              ${price.toLocaleString()}
            </p>
            {isExpertVerified && expertVerifiedPrice === price && (
              <p className="text-xs text-amber-600 font-medium flex items-center gap-0.5 mt-0.5">
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Expert Verified Price
              </p>
            )}
          </div>
          {inspectionScore && (
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">Inspection</p>
              <p className={`text-lg font-bold ${inspectionScore >= 8 ? 'text-green-600' : inspectionScore >= 6 ? 'text-amber-600' : 'text-red-600'}`}>
                {inspectionScore}<span className="text-xs font-normal text-slate-400">/10</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
