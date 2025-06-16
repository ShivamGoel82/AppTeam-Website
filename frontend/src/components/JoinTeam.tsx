import React, { useState } from 'react';
import { Users, ArrowRight, Star, Code, Palette, Brain, Shield } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';
import TeamApplication from './TeamApplication';

const JoinTeam: React.FC = () => {
  const [showApplication, setShowApplication] = useState(false);

  const benefits = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Skill Development',
      description: 'Work on real-world projects and learn cutting-edge technologies',
      color: 'text-accent-blue'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Networking',
      description: 'Connect with like-minded peers and industry professionals',
      color: 'text-accent-purple'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Recognition',
      description: 'Get recognized for your contributions and achievements',
      color: 'text-accent-teal'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Mentorship',
      description: 'Learn from experienced developers and get career guidance',
      color: 'text-success-green'
    }
  ];

  const requirements = [
    'Passion for technology and innovation',
    'Basic programming knowledge in any language',
    'Willingness to learn and collaborate',
    'Commitment to team goals and deadlines',
    'Creative problem-solving mindset'
  ];

  const roles = [
    {
      title: 'Frontend Developer',
      description: 'Build beautiful and responsive user interfaces',
      skills: ['React', 'JavaScript', 'CSS', 'UI/UX'],
      icon: <Palette className="w-8 h-8" />
    },
    {
      title: 'Backend Developer',
      description: 'Develop robust server-side applications and APIs',
      skills: ['Node.js', 'Python', 'Databases', 'APIs'],
      icon: <Code className="w-8 h-8" />
    },
    {
      title: 'Mobile Developer',
      description: 'Create cross-platform mobile applications',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: 'AI/ML Engineer',
      description: 'Work on artificial intelligence and machine learning projects',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
      icon: <Brain className="w-8 h-8" />
    }
  ];

  if (showApplication) {
    return (
      <section id="join-team" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <button
              onClick={() => setShowApplication(false)}
              className="text-accent-blue hover:text-accent-blue/80 font-inter font-medium mb-4 inline-flex items-center"
            >
              ← Back to Join Team Info
            </button>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-primary-text mb-4">
              Apply to Join <span className="text-accent-blue">AppTeam</span>
            </h2>
            <p className="text-base md:text-xl font-inter text-primary-text/80 max-w-3xl mx-auto leading-relaxed">
              Fill out this application form to join our team. We'll review your application and get back to you soon.
            </p>
          </div>
          <TeamApplication />
        </div>
      </section>
    );
  }

  return (
    <section id="join-team" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-primary-text mb-4 md:mb-6">
            Join Our <span className="text-accent-blue">Team</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-primary-text/80 max-w-3xl mx-auto leading-relaxed">
            Ready to be part of something amazing? Join AppTeam and work on innovative projects, 
            participate in competitions, and grow your skills alongside passionate developers.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {benefits.map((benefit, index) => (
            <GlassCard key={index} className="p-6 text-center group">
              <div className={`${benefit.color} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                {benefit.icon}
              </div>
              <h3 className="text-lg font-space font-semibold text-primary-text mb-3 group-hover:text-accent-blue transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-primary-text/80 font-inter text-sm leading-relaxed">
                {benefit.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Available Roles */}
        <GlassCard className="p-6 md:p-8 mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-space font-bold text-primary-text mb-6 md:mb-8 text-center">
            Available <span className="text-accent-purple">Roles</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {roles.map((role, index) => (
              <div key={index} className="p-6 bg-glass-white/50 rounded-lg border border-glass-border hover:border-accent-blue/30 transition-colors duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="text-accent-blue group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-space font-semibold text-primary-text mb-2 group-hover:text-accent-blue transition-colors duration-300">
                      {role.title}
                    </h4>
                    <p className="text-primary-text/80 font-inter text-sm mb-4 leading-relaxed">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-xs font-inter rounded-full border border-accent-teal/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-6">
              What We're Looking For
            </h3>
            <ul className="space-y-3">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-primary-text/80 font-inter leading-relaxed">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-6">
              Application Process
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-blue/20 rounded-full flex items-center justify-center text-accent-blue text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-space font-medium text-primary-text mb-1">Submit Application</h4>
                  <p className="text-primary-text/80 font-inter text-sm">Fill out our comprehensive application form</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-purple/20 rounded-full flex items-center justify-center text-accent-purple text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-space font-medium text-primary-text mb-1">Review Process</h4>
                  <p className="text-primary-text/80 font-inter text-sm">We'll review your application within 5-7 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-teal/20 rounded-full flex items-center justify-center text-accent-teal text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-space font-medium text-primary-text mb-1">Interview</h4>
                  <p className="text-primary-text/80 font-inter text-sm">Technical interview and team fit assessment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success-green/20 rounded-full flex items-center justify-center text-success-green text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-space font-medium text-primary-text mb-1">Welcome Aboard</h4>
                  <p className="text-primary-text/80 font-inter text-sm">Join our onboarding program and start contributing</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* CTA */}
        <div className="text-center">
          <GlassCard className="p-8 md:p-12 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5">
            <h3 className="text-2xl md:text-3xl font-space font-bold text-primary-text mb-4">
              Ready to Join Us?
            </h3>
            <p className="text-primary-text/80 font-inter leading-relaxed mb-8 max-w-2xl mx-auto">
              Take the first step towards joining one of the most innovative tech teams at NIT Hamirpur. 
              We're excited to see what you can bring to our community!
            </p>
            <GlowButton 
              className="group text-lg px-8 py-4"
              onClick={() => setShowApplication(true)}
            >
              Apply Now
              <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;