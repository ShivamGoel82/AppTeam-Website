import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#home',         label: 'Home' },
  { href: '#about',        label: 'About' },
  { href: '#projects',     label: 'Projects' },
  { href: '#workshops',    label: 'Workshops' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#team',         label: 'Team' },
  { href: '#join-team',    label: 'Join Us' },
  { href: '#contact',      label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);

  // FIX 1: Add passive:true — the original was missing this, causing scroll jank
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX 2: Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // FIX 3: Smooth scroll that respects the sticky header height (scroll-padding-top is set in CSS,
  //         but this JS path is a fallback that also works in older Safari)
  const scrollToSection = useCallback((href: string) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    if (!id || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'backdrop-blur-xl bg-primary-dark/90 border-b border-glass-border shadow-lg shadow-accent-primary/5'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="container mx-auto px-6 py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-15 h-15 flex items-center justify-center">
              <img
                src="/AppTeam.png"
                alt="AppTeam Logo"
                className="w-12 h-12 rounded-full ring-2 ring-accent-primary/20"
                loading="eager"
                width={48}
                height={48}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-secondary-text font-inter hover:text-accent-primary transition-colors duration-300 relative group font-medium text-sm"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Accessible 48x48 touch target */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-text hover:text-accent-primary transition-colors duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center -mr-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4">
            <div className="backdrop-blur-xl bg-glass-white rounded-lg border border-glass-border p-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-secondary-text font-inter hover:text-accent-primary transition-colors duration-300 font-medium"
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;