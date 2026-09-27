import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import CodeRain from './components/CodeRain';

// Import AdminPage and NoMatch directly
import AdminPage from './pages/AdminPage'; // Assuming AdminPage is in src/pages
import NoMatch from './pages/NoMatch';     // Import the new 404 page

// Lazy load components that are not immediately visible
const NewsSection = lazy(() => import('./components/NewsSection'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Workshops = lazy(() => import('./components/Workshops'));
const Achievements = lazy(() => import('./components/Achievements'));
const Team = lazy(() => import('./components/Team'));
const JoinTeam = lazy(() => import('./components/JoinTeam'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

import LazySection from './components/LazySection';

// Loading component with better mobile optimization
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8 md:py-16">
    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-accent-primary"></div>
  </div>
);

// Main homepage component
const HomePage = () => (
  <>
    <Hero />
    <Suspense fallback={<LoadingSpinner />}>
      <NewsSection />
      <About />
      <LazySection minHeight="400px">
        <Projects />
      </LazySection>
      <LazySection minHeight="400px">
        <Workshops />
      </LazySection>
      <LazySection minHeight="500px">
        <Achievements />
      </LazySection>
      <LazySection minHeight="500px">
        <Team />
      </LazySection>
      <LazySection minHeight="400px">
        <JoinTeam />
      </LazySection>
      <LazySection minHeight="300px">
        <Contact />
      </LazySection>
      <LazySection minHeight="200px">
        <Footer />
      </LazySection>
    </Suspense>
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-dark text-primary-text overflow-x-hidden">
        {/* Enhanced Animated Backgrounds */}
        <div className="fixed inset-0 z-0 bg-black pointer-events-none overflow-hidden">
          {/* Subtle deep ambient radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(59,130,246,0.10),transparent_75%)] pointer-events-none" />
          <AnimatedBackground />
          <CodeRain />
        </div>

        {/* Main Content - Higher z-index */}
        <div className="relative z-10">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Admin Page - Only accessible in development environment */}
            {import.meta.env.DEV && (
              <Route
                path="/xjfhe839" // Using the existing hidden path for consistency
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdminPage />
                  </Suspense>
                }
              />
            )}

            {/* Catch-all route for 404 - MUST BE THE LAST ROUTE */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
