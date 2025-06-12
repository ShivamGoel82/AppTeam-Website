import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Calendar } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'hello@codecraftcollective.dev',
      color: 'text-electric-blue'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+91 98765 43210',
      color: 'text-neon-magenta'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Find Us',
      content: 'Computer Science Department, Main Campus',
      color: 'text-vibrant-green'
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
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Get In <span className="text-electric-blue">Touch</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate, join our team, or discuss your next big idea? 
            We're always excited to connect with fellow innovators and tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <GlassCard className="p-8">
            <h3 className="text-2xl font-jetbrains font-semibold text-white mb-6">
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

              <GlowButton className="w-full justify-center">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </GlowButton>
            </form>
          </GlassCard>

          {/* Contact Information & Opportunities */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`${info.color}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-jetbrains font-semibold text-white">
                      {info.title}
                    </h4>
                    <p className="text-gray-300 font-inter">
                      {info.content}
                    </p>
                  </div>
                </div>
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
                    <div className={`${opportunity.color} mt-1`}>
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