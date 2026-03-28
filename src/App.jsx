import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ListingsPage from './pages/ListingsPage.jsx'
import VehicleDetailPage from './pages/VehicleDetailPage.jsx'
import SellerDashboardPage from './pages/SellerDashboardPage.jsx'
import ExpertProfilePage from './pages/ExpertProfilePage.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<VehicleDetailPage />} />
          <Route path="/dashboard" element={<SellerDashboardPage />} />
          <Route path="/experts/:id" element={<ExpertProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
