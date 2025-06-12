import React from 'react';
import { Code2, Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const events = [
    { name: 'HOH 6.0', href: '#' },
    { name: 'Nimbus', href: '#' },
    { name: 'Hillfair', href: '#' },
  ];

  return (
    <footer className="bg-cyber-dark/50 backdrop-blur-md border-t border-glass-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/AppTeam.png"
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
            </div>
              <span className="text-xl font-jetbrains font-bold text-white">
                AppTeam<span className="text-electric-blue">,NITH</span>
              </span>
            </div>
            <p className="text-gray-300 font-inter leading-relaxed max-w-md mb-6">
              Best Techno Innovation team of NITH, pushing the boundaries of innovation through 
              competitive programming, app development, and cutting-edge technology solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-electric-blue transition-colors duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-jetbrains font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 font-inter hover:text-electric-blue transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-lg font-jetbrains font-semibold text-white mb-4">
              Events
            </h3>
            <ul className="space-y-2">
              {events.map((event, index) => (
                <li key={index}>
                  <a
                    href={event.href}
                    className="text-gray-300 font-inter hover:text-neon-magenta transition-colors duration-300"
                  >
                    {event.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-jetbrains font-semibold text-white mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-jetbrains text-electric-blue bg-electric-blue/20 px-2 py-1 rounded">React</span>
                <span className="text-xs font-jetbrains text-neon-magenta bg-neon-magenta/20 px-2 py-1 rounded">Flutter</span>
                <span className="text-xs font-jetbrains text-vibrant-green bg-vibrant-green/20 px-2 py-1 rounded">AI/ML</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-inter text-sm">
            © {currentYear} CodeCraft Collective. Built with passion and code.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 font-inter text-sm hover:text-electric-blue transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 font-inter text-sm hover:text-electric-blue transition-colors duration-300">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;