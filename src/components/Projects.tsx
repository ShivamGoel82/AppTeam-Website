import React from 'react';
import { ExternalLink, Github, Smartphone, Monitor, Globe } from 'lucide-react';
import GlassCard from './GlassCard';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'CampusConnect',
      description: 'A comprehensive social platform connecting students across departments with event management, study groups, and resource sharing.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'mobile',
      status: 'Live',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      event: 'HOH 6.0',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'StudySync',
      description: 'AI-powered study companion that creates personalized learning schedules and tracks academic progress with smart notifications.',
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      status: 'Winner',
      technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
      event: 'Nimbus',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'EcoTracker',
      description: 'Environmental impact tracking app that gamifies sustainable living with carbon footprint monitoring and eco-challenges.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'mobile',
      status: 'Champion',
      technologies: ['Flutter', 'Dart', 'AWS', 'GraphQL'],
      event: 'Hillfair',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'CodeCollab',
      description: 'Real-time collaborative coding platform with integrated video chat, code review tools, and project management features.',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      status: 'Development',
      technologies: ['Vue.js', 'Socket.io', 'Docker', 'Redis'],
      event: 'Internal',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'HealthHub',
      description: 'Telemedicine platform connecting students with healthcare providers, featuring appointment booking and health record management.',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      status: 'Beta',
      technologies: ['Next.js', 'Prisma', 'Stripe', 'WebRTC'],
      event: 'HOH 6.0',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'SmartLibrary',
      description: 'Digital library management system with AI-powered book recommendations and automated inventory tracking.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'web',
      status: 'Live',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'OpenAI'],
      event: 'Nimbus',
      links: {
        live: '#',
        github: '#'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Winner':
      case 'Champion':
        return 'text-vibrant-green bg-vibrant-green/20 border-vibrant-green/30';
      case 'Live':
        return 'text-electric-blue bg-electric-blue/20 border-electric-blue/30';
      case 'Beta':
        return 'text-neon-magenta bg-neon-magenta/20 border-neon-magenta/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'HOH 6.0':
        return 'text-electric-blue';
      case 'Nimbus':
        return 'text-neon-magenta';
      case 'Hillfair':
        return 'text-vibrant-green';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-jetbrains font-bold text-white mb-6">
            Our <span className="text-neon-magenta">Projects</span>
          </h2>
          <p className="text-xl font-inter text-gray-300 max-w-3xl mx-auto">
            Discover our innovative applications built for competitions and real-world impact. 
            Each project represents our commitment to excellence and cutting-edge development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <GlassCard key={index} className="overflow-hidden group">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60"></div>
                
                {/* Project Type & Status */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30">
                    {project.type === 'mobile' ? (
                      <Smartphone className="w-4 h-4 text-electric-blue" />
                    ) : project.type === 'web' ? (
                      <Monitor className="w-4 h-4 text-electric-blue" />
                    ) : (
                      <Globe className="w-4 h-4 text-electric-blue" />
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-jetbrains border backdrop-blur-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                {/* Event Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 bg-cyber-dark/50 backdrop-blur-sm rounded-full text-xs font-jetbrains border border-glass-border ${getEventColor(project.event)}`}>
                    {project.event}
                  </div>
                </div>

                {/* Overlay Links */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.links.live}
                    className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30 hover:bg-electric-blue/30 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4 text-electric-blue" />
                  </a>
                  <a
                    href={project.links.github}
                    className="bg-electric-blue/20 backdrop-blur-sm rounded-lg p-2 border border-electric-blue/30 hover:bg-electric-blue/30 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4 text-electric-blue" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-jetbrains font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-vibrant-green/20 text-vibrant-green text-xs font-jetbrains rounded-full border border-vibrant-green/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;