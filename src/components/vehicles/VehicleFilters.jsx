export default function VehicleFilters({ filters, onChange, resultCount }) {
  const bodyTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Van']
  const fuelTypes = ['Gasoline', 'Hybrid', 'Electric', 'Diesel']

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  const toggleBodyType = (type) => {
    const current = filters.bodyTypes || []
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    handleChange('bodyTypes', updated)
  }

  const toggleFuelType = (type) => {
    const current = filters.fuelTypes || []
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    handleChange('fuelTypes', updated)
  }

  const clearAll = () => {
    onChange({
      search: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      maxMileage: '',
      expertOnly: false,
      bodyTypes: [],
      fuelTypes: [],
      sortBy: 'newest',
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minYear ||
    filters.maxYear ||
    filters.maxMileage ||
    filters.expertOnly ||
    (filters.bodyTypes || []).length > 0 ||
    (filters.fuelTypes || []).length > 0

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-800 text-base">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-teal-600 hover:text-teal-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-5">
        <span className="font-semibold text-slate-800">{resultCount}</span> vehicle{resultCount !== 1 ? 's' : ''} found
      </p>

      {/* Search */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Search
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Make, model, features..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full py-2.5 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="mileage_asc">Mileage: Low to High</option>
          <option value="score_desc">Highest Inspection Score</option>
          <option value="rating_desc">Highest Community Rating</option>
        </select>
      </div>

      {/* Expert Verified toggle */}
      <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.expertOnly || false}
            onChange={(e) => handleChange('expertOnly', e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500 accent-amber-500"
          />
          <div>
            <p className="text-sm font-semibold text-amber-800">Expert Verified Only</p>
            <p className="text-xs text-amber-600">Show only professionally inspected vehicles</p>
          </div>
        </label>
      </div>

      {/* Price range */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-full py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Year range */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Year
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="From"
            value={filters.minYear || ''}
            onChange={(e) => handleChange('minYear', e.target.value)}
            className="w-full py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            placeholder="To"
            value={filters.maxYear || ''}
            onChange={(e) => handleChange('maxYear', e.target.value)}
            className="w-full py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Max mileage */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Max Mileage
        </label>
        <input
          type="number"
          placeholder="e.g. 50000"
          value={filters.maxMileage || ''}
          onChange={(e) => handleChange('maxMileage', e.target.value)}
          className="w-full py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Body type */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Body Type
        </label>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => {
            const active = (filters.bodyTypes || []).includes(type)
            return (
              <button
                key={type}
                onClick={() => toggleBodyType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>

      {/* Fuel type */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Fuel Type
        </label>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((type) => {
            const active = (filters.fuelTypes || []).includes(type)
            return (
              <button
                key={type}
                onClick={() => toggleFuelType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
