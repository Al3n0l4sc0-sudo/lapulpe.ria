import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import StarryBackground from './components/StarryBackground';
import GalacticLoader from './components/GalacticLoader';
import LandingPage from './pages/LandingPage';
import './App.css';

// Lazy load all other pages for faster initial load
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const GoogleCallback = lazy(() => import('./pages/GoogleCallback'));
const MapView = lazy(() => import('./pages/MapView'));
const PulperiaProfile = lazy(() => import('./pages/PulperiaProfile'));
const SharedPulperiaLink = lazy(() => import('./pages/SharedPulperiaLink'));
const SearchProducts = lazy(() => import('./pages/SearchProducts'));
const ShoppingCart = lazy(() => import('./pages/ShoppingCart'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const PulperiaDashboard = lazy(() => import('./pages/PulperiaDashboard'));
const Messages = lazy(() => import('./pages/Messages'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const UserTypeSelector = lazy(() => import('./pages/UserTypeSelector'));
const JobsServices = lazy(() => import('./pages/JobsServices'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const Advertising = lazy(() => import('./pages/Advertising'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AdAssignmentLog = lazy(() => import('./pages/AdAssignmentLog'));
const RecommendedPage = lazy(() => import('./pages/RecommendedPage'));
const FeaturedAdsPage = lazy(() => import('./pages/FeaturedAdsPage'));
const GlobalAnnouncementsPage = lazy(() => import('./pages/GlobalAnnouncementsPage'));

// Enhanced loading spinner with nebula background
const LoadingSpinner = () => (
  <div className="min-h-screen bg-stone-950 flex items-center justify-center relative overflow-hidden">
    {/* Nebulosa de fondo */}
    <div 
      className="absolute inset-0 animate-nebula-pulse"
      style={{
        background: `
          radial-gradient(ellipse 100% 80% at 30% 50%, rgba(220, 38, 38, 0.2), transparent 50%),
          radial-gradient(ellipse 80% 60% at 70% 40%, rgba(250, 204, 21, 0.15), transparent 45%),
          radial-gradient(ellipse 60% 50% at 50% 70%, rgba(147, 51, 234, 0.1), transparent 40%)
        `
      }}
    />
    {/* Estrellas */}
    <div 
      className="absolute inset-0 animate-twinkle"
      style={{
        backgroundImage: `
          radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.5), transparent),
          radial-gradient(1.5px 1.5px at 50% 30%, rgba(255,255,255,0.6), transparent),
          radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.5), transparent),
          radial-gradient(1.5px 1.5px at 90% 45%, rgba(255,255,255,0.6), transparent)
        `
      }}
    />
    <div className="relative z-10">
      <GalacticLoader size="default" text="Cargando..." />
    </div>
  </div>
);

function AppRouter() {
  const location = useLocation();
  
  if (location.hash?.includes('session_id=')) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AuthCallback />
      </Suspense>
    );
  }
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="/p/:id" element={<SharedPulperiaLink />} />
        <Route path="/select-type" element={<ProtectedRoute><UserTypeSelector /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
        <Route path="/pulperia/:id" element={<ProtectedRoute><PulperiaProfile /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchProducts /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><PulperiaDashboard /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobsServices /></ProtectedRoute>} />
        <Route path="/jobs-services" element={<ProtectedRoute><JobsServices /></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/advertising" element={<ProtectedRoute><Advertising /></ProtectedRoute>} />
        <Route path="/recommended" element={<ProtectedRoute><RecommendedPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/ad-log" element={<AdAssignmentLog />} />
        <Route path="/anuncios" element={<ProtectedRoute><FeaturedAdsPage /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <div className="App relative">
      {/* Global starry background for all pages */}
      <StarryBackground density={100} enableParallax={true} />
      
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <div className="relative z-10">
              <AppRouter />
            </div>
            <Toaster 
              position="top-center" 
              richColors 
              toastOptions={{
                style: {
                  background: '#1c1917',
                  color: 'white',
                  border: '1px solid #44403c'
                },
                className: 'animate-scale-in'
              }}
            />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
