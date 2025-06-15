import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import About from './components/About';
import Projects from './components/Projects';
import Workshops from './components/Workshops';
import Achievements from './components/Achievements';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import CodeRain from './components/CodeRain';

function App() {
  return (
    <div className="min-h-screen bg-primary-dark text-white overflow-x-hidden">
      {/* Animated Backgrounds - Lower z-index */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
        <CodeRain />
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
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;