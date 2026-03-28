import { useState, useMemo } from 'react'
import { vehicles } from '../data/vehicles.js'
import VehicleCard from '../components/vehicles/VehicleCard.jsx'
import VehicleFilters from '../components/vehicles/VehicleFilters.jsx'

const DEFAULT_FILTERS = {
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
}

function filterAndSort(allVehicles, filters) {
  let result = [...allVehicles]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (v) =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.features.some((f) => f.toLowerCase().includes(q)) ||
        v.fuelType.toLowerCase().includes(q) ||
        v.bodyType.toLowerCase().includes(q)
    )
  }

  if (filters.expertOnly) {
    result = result.filter((v) => v.isExpertVerified)
  }

  if (filters.minPrice) {
    result = result.filter((v) => v.price >= Number(filters.minPrice))
  }
  if (filters.maxPrice) {
    result = result.filter((v) => v.price <= Number(filters.maxPrice))
  }

  if (filters.minYear) {
    result = result.filter((v) => v.year >= Number(filters.minYear))
  }
  if (filters.maxYear) {
    result = result.filter((v) => v.year <= Number(filters.maxYear))
  }

  if (filters.maxMileage) {
    result = result.filter((v) => v.mileage <= Number(filters.maxMileage))
  }

  if (filters.bodyTypes && filters.bodyTypes.length > 0) {
    result = result.filter((v) => filters.bodyTypes.includes(v.bodyType))
  }

  if (filters.fuelTypes && filters.fuelTypes.length > 0) {
    result = result.filter((v) => filters.fuelTypes.includes(v.fuelType))
  }

  // Sort
  switch (filters.sortBy) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'mileage_asc':
      result.sort((a, b) => a.mileage - b.mileage)
      break
    case 'score_desc':
      result.sort((a, b) => (b.inspectionScore || 0) - (a.inspectionScore || 0))
      break
    case 'rating_desc':
      result.sort((a, b) => (b.communityRatingAvg || 0) - (a.communityRatingAvg || 0))
      break
    case 'newest':
    default:
      result.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
      break
  }

  return result
}

export default function ListingsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => filterAndSort(vehicles, filters), [filters])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Browse Vehicles</h1>
        <p className="text-slate-500 text-sm mt-1">Find your next car with expert verification and community insights.</p>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-medium text-sm px-4 py-2.5 rounded-xl shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filters
          {(filters.expertOnly ||
            filters.search ||
            filters.bodyTypes.length > 0 ||
            filters.fuelTypes.length > 0 ||
            filters.minPrice ||
            filters.maxPrice) && (
            <span className="ml-1 w-5 h-5 bg-teal-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
              !
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`
          lg:block lg:w-64 lg:shrink-0
          ${sidebarOpen ? 'block w-full mb-6' : 'hidden'}
        `}>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:sticky lg:top-24">
            <VehicleFilters filters={filters} onChange={setFilters} resultCount={filtered.length} />
          </div>
        </aside>

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <svg className="w-12 h-12 text-slate-200 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
              </svg>
              <h3 className="font-bold text-slate-600 text-lg mb-2">No vehicles found</h3>
              <p className="text-slate-400 text-sm mb-4">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="text-teal-600 font-semibold hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">
                Showing <span className="font-semibold text-slate-700">{filtered.length}</span> vehicle{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
