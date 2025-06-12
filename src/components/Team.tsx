import React from 'react';
import { Github, Linkedin, Twitter, Code, Palette, Brain, Shield } from 'lucide-react';
import GlassCard from './GlassCard';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Pratyush Pragyey',
      role: 'Team Lead & Full-Stack MERN Developer',
      image: 'pratyush pragyey.jpg',
      bio: 'Expertise in MERN, and currenly learning dev Ops. Led our team to successfully organize HOH-6.0',
      skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
      icon: <Code className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Ishaan Yadav',
      role: 'UI/UX Designer & Frontend Dev',
      image: 'ishaan yadav.jpg',
      bio: 'Design enthusiast and frontend specialist. Creates stunning user experiences.',
      skills: ['Figma', 'React', 'Tailwind', 'Framer'],
      icon: <Palette className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Aryan Raghav',
      role: 'DSA Expert & AI/ML enthusiast',
      image: 'image.png',
      bio: 'Solving complex problems with code. Exploring intelligence with AI.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
      icon: <Brain className="w-5 h-5" />,
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    // {
    //   name: 'Avinash Garla',
    //   role: 'Mobile App Developer',
    //   image: 'Avinash.jpeg',
    //   bio: 'Flutter and GoLang Backend Developer, Built cross-platform apps.',
    //   skills: ['Flutter', 'React Native', 'Dart', 'Firebase'],
    //   icon: <Shield className="w-5 h-5" />,
    //   social: {
    //     github: '#',
    //     linkedin: '#',
    //     twitter: '#'
    //   }
    // },
    // {
    //   name: 'Vikash Singh',
    //   role: 'Backend Developer',
    //   image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   bio: 'Backend architecture specialist with expertise in scalable systems. Ensures our apps can handle massive user loads.',
    //   skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes'],
    //   icon: <Code className="w-5 h-5" />,
    //   social: {
    //     github: '#',
    //     linkedin: '#',
    //     twitter: '#'
    //   }
    // },
    // {
    //   name: 'Ananya Reddy',
    //   role: 'DevOps & Cloud Engineer',
    //   image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   bio: 'Cloud infrastructure expert and DevOps specialist. Manages our deployment pipelines and ensures 99.9% uptime.',
    //   skills: ['AWS', 'Docker', 'Jenkins', 'Terraform'],
    //   icon: <Shield className="w-5 h-5" />,
    //   social: {
    //     github: '#',
    //     linkedin: '#',
    //     twitter: '#'
    //   }
    // }
  ];

  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Meet Our <span className="text-electric-blue">Team</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            The brilliant minds behind CodeCraft Collective. A diverse group of passionate 
            developers, designers, and innovators united by our love for creating exceptional software.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <GlassCard key={index} className="p-6 text-center group overflow-hidden">
              {/* Profile Image */}
              <div className="relative mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-electric-blue/30 group-hover:border-electric-blue transition-colors duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Member Info */}
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="text-electric-blue">
                  {member.icon}
                </div>
                <h3 className="text-xl font-jetbrains font-semibold text-white group-hover:text-electric-blue transition-colors duration-300">
                  {member.name}
                </h3>
              </div>
              
              <p className="text-neon-magenta font-jetbrains font-medium mb-4 text-sm">
                {member.role}
              </p>
              
              <p className="text-gray-300 font-inter text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {member.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-vibrant-green/20 text-vibrant-green text-xs font-jetbrains rounded-full border border-vibrant-green/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.github}
                  className="text-gray-400 hover:text-electric-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={member.social.linkedin}
                  className="text-gray-400 hover:text-electric-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-gray-400 hover:text-electric-blue transition-colors duration-300 transform hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;