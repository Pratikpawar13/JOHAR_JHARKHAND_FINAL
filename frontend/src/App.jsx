import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/home/Home.jsx'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Experiences from './pages/Experiences'
import PlanTrip from './pages/PlanTrip'
import Festivals from './pages/Festivals'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import PaymentPage from "./components/PaymentPage"
import AttractionsList from "./components/AttractionsList";
// import HomeP from "./registered-tour-operators/src/components/Home";
import MotiJharnaHome from "./registered-tour-operators/src/components/MotiJharnaHome";
import TourOperators from "./registered-tour-operators/src/components/TourOperators";
import RegisteredTourGuides from "./registered-tour-operators/src/components/RegisteredTourGuides";
import TeliagarhiFortHome from "./registered-tour-operators/src/components/TeliagarhiFortHome";
import RajmahalFossilParkHome from "./registered-tour-operators/src/components/RajmahalFossilParkHome";
import GangaGhatSahibganjHome from "./registered-tour-operators/src/components/GangaGhatSahibganjHome";
import SilverArcadeHotelsHome from "./registered-tour-operators/src/components/SilverArcadeHotelsHome";
import "./registered-tour-operators/src/index.css";
import EcomHome from './components/jk_ecommerce/bajaarhome';
import FeedbackForm from './pages/FeedbackForm';
import FeedbackDashboard from './pages/FeedbackDashboard.jsx'
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfile';
import GuideServicesPage from './pages/GuideServicesPage';
import GuideRegistrationPage from './pages/GuideRegistrationPage';
import FindGuidePage from './pages/FindGuidePage';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';



// import ChatBot from './components/jharkhand-ai-assistant/frontend/src/components/ChatBot.jsx'




export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/plan-your-trip" element={<PlanTrip />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/attractionlist" element={<AttractionsList />} />
            <Route path="/moti-jharna" element={<MotiJharnaHome />} />
            <Route path="/operators" element={<TourOperators />} />
            <Route path="/registered-tour-guides" element={<RegisteredTourGuides />} />
            <Route path="/teliagarhi-fort" element={<TeliagarhiFortHome />} />
            <Route path="/rajmahal-fossil-park" element={<RajmahalFossilParkHome />} />
            <Route path="/ganga-ghat-sahibganj" element={<GangaGhatSahibganjHome />} />
            <Route path="/silver-arcade-hotels" element={<SilverArcadeHotelsHome />} />
            
            {/* Guide Services routes */}
            <Route path="/guide-services" element={<GuideServicesPage />} />
            <Route path="/guide-registration" element={<GuideRegistrationPage />} />
            <Route path="/find-guide" element={<FindGuidePage />} />
            
            {/* <Route path="/chatbot" element={<ChatBot />} /> */}
            
            {/* Authentication routes */}
            <Route path="/auth" element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } />
            
            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/feedback" element={
              <ProtectedRoute>
                <FeedbackForm />
              </ProtectedRoute>
            } />
            
            <Route path="/feedbackDashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FeedbackDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin-only feedback dashboard */}
            {/* <Route path="/feedback-public" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FeedbackDashboard />
              </ProtectedRoute>
            } />
             */}

            
            <Route path="/johar-Bajaar" element={<EcomHome />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </AuthProvider>
  )
}
