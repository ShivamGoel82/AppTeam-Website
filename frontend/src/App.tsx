import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import CodeRain from './components/CodeRain';

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

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-primary-dark text-primary-text overflow-x-hidden">
      {/* Enhanced Animated Backgrounds - Lower z-index */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
        <CodeRain />
        
        {/* Additional ambient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-primary-dark/20 pointer-events-none" />
      </div>
      
      {/* Main Content - Higher z-index */}
      <div className="relative z-10">
        <Header />
        <Hero />
        
        <Suspense fallback={<LoadingSpinner />}>
          <NewsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Workshops />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Achievements />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Team />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <JoinTeam />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;