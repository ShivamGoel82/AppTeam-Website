import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Github, Linkedin, Twitter, Code, Palette, Brain, Users, Plus, Edit, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';
import MemberForm from './MemberForm';

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
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | undefined>();
  const [memberEmail, setMemberEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

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
      const response = await fetch('/api/members');
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
    if (role.toLowerCase().includes('design')) return <Palette className="w-5 h-5" />;
    if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('ml')) return <Brain className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  }, []);

  const handleEditProfile = useCallback(() => {
    if (memberEmail.trim()) {
      setEditingEmail(memberEmail.trim());
      setShowMemberForm(true);
      setShowEmailInput(false);
      setMemberEmail('');
    }
  }, [memberEmail]);

  const handleFormClose = useCallback(() => {
    setShowMemberForm(false);
    setEditingEmail(undefined);
    fetchMembers(); // Refresh the members list
  }, [fetchMembers]);

  const MemberCard: React.FC<{ member: Member }> = React.memo(({ member }) => (
    <GlassCard className="p-6 text-center group overflow-hidden">
      {/* Profile Image */}
      <div className="relative mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-2 border-accent-primary/30 group-hover:border-accent-primary transition-colors duration-300">
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
        <h3 className="text-xl font-space font-semibold text-primary-text group-hover:text-accent-primary transition-colors duration-300">
          {member.personalInfo.fullName}
        </h3>
      </div>
      
      <p className="text-accent-secondary font-inter font-medium mb-2 text-sm">
        {member.professionalInfo.role}
      </p>

      {member.membershipInfo.position && (
        <p className="text-accent-tertiary font-inter text-xs mb-4">
          {member.membershipInfo.position}
        </p>
      )}
      
      <p className="text-muted-text font-inter text-sm mb-6 leading-relaxed">
        {member.professionalInfo.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {member.professionalInfo.skills.slice(0, 4).map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-3 py-1 bg-accent-tertiary/10 text-accent-tertiary text-xs font-inter rounded-full border border-accent-tertiary/30"
          >
            {skill}
          </span>
        ))}
        {member.professionalInfo.skills.length > 4 && (
          <span className="px-3 py-1 bg-neutral-500/10 text-neutral-400 text-xs font-inter rounded-full border border-neutral-500/30">
            +{member.professionalInfo.skills.length - 4}
          </span>
        )}
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-4">
        {member.professionalInfo.githubUrl && (
          <a
            href={member.professionalInfo.githubUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {member.professionalInfo.linkedinUrl && (
          <a
            href={member.professionalInfo.linkedinUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {member.professionalInfo.twitterUrl && (
          <a
            href={member.professionalInfo.twitterUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {member.professionalInfo.portfolioUrl && (
          <a
            href={member.professionalInfo.portfolioUrl}
            className="text-muted-text hover:text-accent-primary transition-colors duration-300 transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-5 h-5" />
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto"></div>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-bold text-primary-text mb-4 md:mb-6">
            Meet Our <span className="text-accent-primary">Team</span>
          </h2>
          <p className="text-base md:text-xl font-inter text-secondary-text max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind AppTeam. A diverse group of passionate 
            developers, designers, and innovators united by our love for creating exceptional software.
          </p>
        </div>

        {/* Member Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <GlowButton
            onClick={() => setShowMemberForm(true)}
            className="group"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your Profile
          </GlowButton>
          
          <GlowButton
            variant="secondary"
            onClick={() => setShowEmailInput(!showEmailInput)}
            className="group"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </GlowButton>
        </div>

        {/* Email Input for Editing */}
        {showEmailInput && (
          <div className="max-w-md mx-auto mb-8">
            <GlassCard className="p-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="Enter your email to edit profile"
                  className="flex-1 px-3 py-2 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                />
                <button
                  onClick={handleEditProfile}
                  disabled={!memberEmail.trim()}
                  className="px-4 py-2 bg-accent-primary text-white rounded-lg font-inter font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  Edit
                </button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* All Team Members in One Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>

        {/* Member Form Modal */}
        {showMemberForm && (
          <MemberForm 
            onClose={handleFormClose}
            editingEmail={editingEmail}
          />
        )}
      </div>
    </section>
  );
};

export default React.memo(Team);