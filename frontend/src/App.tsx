import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import About from './components/About';
import Projects from './components/Projects';
import Workshops from './components/Workshops';
import Achievements from './components/Achievements';
import Team from './components/Team';
import JoinTeam from './components/JoinTeam';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import CodeRain from './components/CodeRain';

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
        <NewsSection />
        <About />
        <Projects />
        <Workshops />
        <Achievements />
        <Team />
        <JoinTeam />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;