import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Github, Linkedin, Twitter, Code, Palette, Brain, Users, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';

interface Member {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
    profileImage?: string;
  };
  professionalInfo: {
    role: string;
    bio: string;
    skills: string[];
    portfolioUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
  };
  membershipInfo: {
    memberType: string;
    position?: string;
  };
}

const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Default team members (fallback) - memoized
  const defaultMembers = useMemo(() => [
    {
      _id: 'default-1',
      personalInfo: {
        fullName: 'Pratyush Pragyey',
        email: 'pratyush@example.com',
        profileImage: 'pratyush_web.webp'
      },
      professionalInfo: {
        role: 'Team Lead & Full-Stack MERN Developer',
        bio: 'Expertise in MERN stack and currently learning DevOps. Led our team to successfully organize HOH-6.0',
        skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
        githubUrl: '#',
        linkedinUrl: '#',
        twitterUrl: '#'
      },
      membershipInfo: {
        memberType: 'core'
      }
    },
    {
      _id: 'default-2',
      personalInfo: {
        fullName: 'Ishaan Yadav',
        email: 'ishaan@example.com',
        profileImage: 'finance_ishan.webp'
      },
      professionalInfo: {
        role: 'UI/UX Designer & Frontend Developer',
        bio: 'Design enthusiast and frontend specialist. Creates stunning user experiences with modern design principles.',
        skills: ['Figma', 'React', 'Tailwind', 'Framer'],
        githubUrl: '#',
        linkedinUrl: '#',
        twitterUrl: '#'
      },
      membershipInfo: {
        memberType: 'core'
      }
    },
    {
      _id: 'default-3',
      personalInfo: {
        fullName: 'Aryan Raghav',
        email: 'aryan@example.com',
        profileImage: 'image.png'
      },
      professionalInfo: {
        role: 'DSA Expert & AI/ML Enthusiast',
        bio: 'Solving complex problems with code. Exploring artificial intelligence and machine learning technologies.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
        githubUrl: '#',
        linkedinUrl: '#',
        twitterUrl: '#'
      },
      membershipInfo: {
        memberType: 'active'
      }
    }
  ], []);

  const fetchMembers = useCallback(async () => {
    try {
      const response = await fetch('https://appteam-website-1.onrender.com/api/members');
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setMembers(data.data);
      } else {
        // Use default members if no members found
        setMembers(defaultMembers);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
      // Use default members on error
      setMembers(defaultMembers);
    } finally {
      setLoading(false);
    }
  }, [defaultMembers]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const getRoleIcon = useCallback((role: string) => {
    if (role.toLowerCase().includes('design')) return <Palette className="w-4 h-4 md:w-5 md:h-5" />;
    if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('ml')) return <Brain className="w-4 h-4 md:w-5 md:h-5" />;
    return <Code className="w-4 h-4 md:w-5 md:h-5" />;
  }, []);

  const MemberCard: React.FC<{ member: Member }> = React.memo(({ member }) => (
    <GlassCard className="p-4 md:p-6 text-center group overflow-hidden">
      {/* Profile Image */}
      <div className="relative mb-4 md:mb-6 mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent-primary/30 group-hover:border-accent-primary transition-colors duration-300">
        <img
          src={member.personalInfo.profileImage || '/AppTeam.png'}
          alt={member.personalInfo.fullName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/AppTeam.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Member Info */}
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="text-accent-primary">
          {getRoleIcon(member.professionalInfo.role)}
        </div>
        <h3 className="text-lg md:text-xl font-space font-semibold text-primary-text group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
          {member.personalInfo.fullName}
        </h3>
      </div>
      
      <p className="text-accent-secondary font-inter font-medium mb-2 text-xs md:text-sm line-clamp-2">
        {member.professionalInfo.role}
      </p>

      {member.membershipInfo.position && (
        <p className="text-accent-tertiary font-inter text-xs mb-3 md:mb-4">
          {member.membershipInfo.position}
        </p>
      )}
      
      <p className="text-muted-text font-inter text-xs md:text-sm mb-4 md:mb-6 leading-relaxed line-clamp-3">
        {member.professionalInfo.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 md:mb-6">
        {member.professionalInfo.skills.slice(0, 3).map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-2 md:px-3 py-1 bg-accent-tertiary/10 text-accent-tertiary text-xs font-inter rounded-full border border-accent-tertiary/30"
          >
            {skill}
          </span>
        ))}
        {member.professionalInfo.skills.length > 3 && (
          <span className="px-2 md:px-3 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-inter rounded-full border border-neutral-500/30">
            +{member.professionalInfo.skills.length - 3}
          </span>
        )}
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-3 md:space-x-4">
        {member.professionalInfo.githubUrl && (
          <a
            href={member.professionalInfo.githubUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.linkedinUrl && (
          <a
            href={member.professionalInfo.linkedinUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.twitterUrl && (
          <a
            href={member.professionalInfo.twitterUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
        {member.professionalInfo.portfolioUrl && (
          <a
            href={member.professionalInfo.portfolioUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        )}
      </div>
    </GlassCard>
  ));

  if (loading) {
    return (
      <section id="team" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-accent-primary mx-auto"></div>
            <p className="text-secondary-text mt-4">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-space font-bold text-primary-text mb-4 md:mb-6">
            Meet Our <span className="text-accent-primary">Team</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl font-inter text-secondary-text max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind AppTeam. A diverse group of passionate 
            developers, designers, and innovators united by our love for creating exceptional software.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Team);