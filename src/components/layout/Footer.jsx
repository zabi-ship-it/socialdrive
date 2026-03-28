import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-teal-400 font-extrabold text-lg">Social</span>
              <span className="text-white font-extrabold text-lg">Drive</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Transparent, community-driven used car transactions backed by expert inspection.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listings" className="hover:text-teal-400 transition-colors">Browse Cars</Link></li>
              <li><Link to="/listings?filter=expert_verified" className="hover:text-teal-400 transition-colors">Expert Verified</Link></li>
              <li><span className="text-slate-600 cursor-not-allowed">Advanced Search</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Price Guide</span></li>
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Sellers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-teal-400 transition-colors">Seller Dashboard</Link></li>
              <li><span className="text-slate-600 cursor-not-allowed">Request Inspection</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Pricing Tools</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Seller Guide</span></li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Trust & Safety</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-600 cursor-not-allowed">How Inspections Work</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Escrow Protection</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Dispute Resolution</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2026 SocialDrive. All rights reserved.</p>
          <p className="text-xs text-slate-600">
            5–8% commission on successful sales &middot; Secure escrow payments &middot; PCI-DSS compliant
          </p>
        </div>
      </div>
    </footer>
  )
}
