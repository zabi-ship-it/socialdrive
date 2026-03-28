import { useState } from 'react'
import { Link } from 'react-router-dom'
import { experts } from '../../data/experts.js'
import StarRating from '../ui/StarRating.jsx'

function StatusIcon({ status }) {
  if (status === 'pass') {
    return (
      <svg className="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
  if (status === 'caution') {
    return (
      <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

function ScoreBar({ score }) {
  const color = score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${(score / 10) * 100}%` }} />
      </div>
      <span className={`text-xs font-bold w-8 text-right ${score >= 8 ? 'text-green-600' : score >= 6 ? 'text-amber-600' : 'text-red-600'}`}>
        {score}
      </span>
    </div>
  )
}

function CategoryAccordion({ category }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 mr-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-800 text-sm">{category.name}</span>
            <span className={`text-sm font-bold ${category.score >= 8 ? 'text-green-600' : category.score >= 6 ? 'text-amber-600' : 'text-red-600'}`}>
              {category.score}/10
            </span>
          </div>
          <ScoreBar score={category.score} />
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 bg-slate-50 border-t border-slate-200">
          <p className="text-sm text-slate-600 mt-3 mb-3 leading-relaxed">{category.notes}</p>
          <div className="space-y-2">
            {category.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <StatusIcon status={item.status} />
                <div>
                  <span className="text-sm text-slate-700">{item.label}</span>
                  {item.note && (
                    <span className="text-xs text-slate-500 ml-1.5 italic">— {item.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function InspectionReport({ inspection }) {
  if (!inspection) {
    return (
      <div className="text-center py-12">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-slate-600 font-semibold mb-1">No inspection report</h3>
        <p className="text-slate-400 text-sm">The seller has not requested a professional inspection for this vehicle.</p>
      </div>
    )
  }

  const expert = experts.find((e) => e.id === inspection.expertId)

  return (
    <div>
      {/* Overall score header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-sm font-medium">Overall Inspection Score</p>
            <div className="flex items-end gap-2 mt-1">
              <span className={`text-4xl font-extrabold ${inspection.overallScore >= 8 ? 'text-green-400' : inspection.overallScore >= 6 ? 'text-amber-400' : 'text-red-400'}`}>
                {inspection.overallScore}
              </span>
              <span className="text-slate-400 text-lg mb-0.5">/10</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs">Inspected</p>
            <p className="text-white text-sm font-medium">{inspection.date}</p>
          </div>
        </div>

        {/* Score breakdown mini bars */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
          {inspection.categories.map((cat) => (
            <div key={cat.name} className="text-center">
              <p className="text-slate-400 text-xs mb-1 truncate">{cat.name.split(' ')[0]}</p>
              <p className={`text-sm font-bold ${cat.score >= 8 ? 'text-green-400' : cat.score >= 6 ? 'text-amber-400' : 'text-red-400'}`}>
                {cat.score}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Red flags */}
      {inspection.redFlags.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="font-bold text-red-700">Red Flags</h3>
          </div>
          <ul className="space-y-1">
            {inspection.redFlags.map((flag, i) => (
              <li key={i} className="text-sm text-red-600 flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expert recommendation */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-teal-800 text-sm mb-1">Expert Recommendation</h3>
        <p className="text-teal-700 text-sm leading-relaxed">{inspection.recommendation}</p>
      </div>

      {/* Category accordion */}
      <h3 className="font-bold text-slate-800 mb-3">Detailed Category Breakdown</h3>
      <div className="space-y-2 mb-6">
        {inspection.categories.map((cat) => (
          <CategoryAccordion key={cat.name} category={cat} />
        ))}
      </div>

      {/* Expert card */}
      {expert && (
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Inspected by</h3>
          <div className="flex items-center gap-3">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-12 h-12 rounded-full object-cover bg-slate-100"
              onError={(e) => { e.target.src = `https://placehold.co/60/1e293b/94a3b8?text=${expert.name[0]}` }}
            />
            <div className="flex-1 min-w-0">
              <Link to={`/experts/${expert.id}`} className="font-semibold text-slate-800 hover:text-teal-600 transition-colors">
                {expert.name}
              </Link>
              <p className="text-xs text-slate-500">{expert.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={expert.rating} size="xs" />
                <span className="text-xs text-slate-500">{expert.rating} · {expert.totalInspections} inspections</span>
              </div>
            </div>
            <Link to={`/experts/${expert.id}`} className="text-xs text-teal-600 font-medium hover:underline shrink-0">
              View Profile →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
