import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import CodeRain from './components/CodeRain';

function App() {
  return (
    <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">
      {/* Animated Backgrounds */}
      <AnimatedBackground />
      <CodeRain />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Team />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;