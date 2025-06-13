import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Calendar, CheckCircle } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'hello@appteam.nith.ac.in',
      color: 'text-electric-blue',
      href: 'mailto:hello@appteam.nith.ac.in'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+91 98765 43210',
      color: 'text-neon-magenta',
      href: 'tel:+919876543210'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Find Us',
      content: 'F5, Old LH, NIT Hamirpur',
      color: 'text-vibrant-green',
      href: 'https://maps.google.com/?q=NIT+Hamirpur'
    }
  ];

  const opportunities = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Join Our Team',
      description: 'Looking for passionate developers to join our elite team. Open positions for all skill levels.',
      color: 'text-electric-blue'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Collaborate',
      description: 'Interested in collaborating on a project? We love working with other innovative teams.',
      color: 'text-neon-magenta'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Workshop Requests',
      description: 'Want us to conduct a workshop or tech talk at your event? We\'d be happy to share our knowledge.',
      color: 'text-vibrant-green'
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-jetbrains font-bold text-white mb-4 md:mb-6">
            Get In <span className="text-electric-blue">Touch</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate, join our team, or discuss your next big idea? 
            We're always excited to connect with fellow innovators and tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-jetbrains font-semibold text-white mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-jetbrains font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-cyber-gray/50 border border-glass-border rounded-lg text-white font-inter placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-jetbrains font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-cyber-gray/50 border border-glass-border rounded-lg text-white font-inter placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-jetbrains font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-cyber-gray/50 border border-glass-border rounded-lg text-white font-inter focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="collaboration">Collaboration Opportunity</option>
                  <option value="join-team">Join Our Team</option>
                  <option value="workshop">Workshop Request</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-jetbrains font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-cyber-gray/50 border border-glass-border rounded-lg text-white font-inter placeholder-gray-400 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors duration-300 resize-none"
                  placeholder="Tell us about your idea, question, or how we can help..."
                />
              </div>

              <GlowButton 
                className="w-full justify-center relative"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </GlowButton>

              {submitStatus === 'success' && (
                <div className="text-center text-vibrant-green text-sm font-inter">
                  Thank you! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-center text-red-400 text-sm font-inter">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </GlassCard>

          {/* Contact Information & Opportunities */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <GlassCard key={index} className="p-6 hover:scale-105 transition-transform duration-300">
                <a 
                  href={info.href}
                  className="flex items-center space-x-4 group"
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-jetbrains font-semibold text-white group-hover:text-electric-blue transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-gray-300 font-inter">
                      {info.content}
                    </p>
                  </div>
                </a>
              </GlassCard>
            ))}

            {/* Opportunities */}
            <div className="space-y-6">
              <h3 className="text-xl font-jetbrains font-semibold text-white">
                Opportunities
              </h3>
              {opportunities.map((opportunity, index) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${opportunity.color} mt-1 flex-shrink-0`}>
                      {opportunity.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-jetbrains font-semibold text-white mb-2">
                        {opportunity.title}
                      </h4>
                      <p className="text-gray-300 font-inter text-sm leading-relaxed">
                        {opportunity.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;