import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Code, Send, CheckCircle, AlertCircle, Edit, X } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';

interface MemberFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    rollNumber: string;
    branch: string;
    year: string;
    profileImage: string;
  };
  professionalInfo: {
    role: string;
    bio: string;
    skills: string[];
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
  };
  membershipInfo: {
    memberType: string;
    position: string;
  };
}

interface MemberFormProps {
  onClose: () => void;
  editingEmail?: string;
}

const MemberForm: React.FC<MemberFormProps> = ({ onClose, editingEmail }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(!!editingEmail);
  
  const [formData, setFormData] = useState<MemberFormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      rollNumber: '',
      branch: '',
      year: '',
      profileImage: ''
    },
    professionalInfo: {
      role: '',
      bio: '',
      skills: [],
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      twitterUrl: ''
    },
    membershipInfo: {
      memberType: 'active',
      position: ''
    }
  });

  // Load existing member data if editing
  useEffect(() => {
    if (editingEmail) {
      const fetchMemberData = async () => {
        try {
          const response = await fetch(`/api/members/profile/${editingEmail}`);
          const data = await response.json();
          
          if (data.success) {
            setFormData(data.data);
          } else {
            setErrorMessage('Failed to load member data');
          }
        } catch (error) {
          setErrorMessage('Failed to load member data');
        }
      };
      
      fetchMemberData();
    }
  }, [editingEmail]);

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Flutter', 'React Native',
    'UI/UX Design', 'Machine Learning', 'Data Science', 'DevOps', 'Blockchain', 'Cybersecurity',
    'Mobile Development', 'Web Development', 'Backend Development', 'Frontend Development'
  ];

  const roleOptions = [
    'Team Lead', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 
    'Mobile Developer', 'UI/UX Designer', 'DevOps Engineer', 'AI/ML Engineer',
    'Data Scientist', 'Product Manager', 'Technical Writer'
  ];

  const handleInputChange = (section: keyof MemberFormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const currentSkills = prev.professionalInfo.skills;
      const newSkills = currentSkills.includes(skill)
        ? currentSkills.filter(s => s !== skill)
        : [...currentSkills, skill];
      
      return {
        ...prev,
        professionalInfo: {
          ...prev.professionalInfo,
          skills: newSkills
        }
      };
    });
  };

  const validateForm = (): boolean => {
    const { personalInfo, professionalInfo } = formData;
    
    if (!personalInfo.fullName || !personalInfo.email || !personalInfo.phone || 
        !personalInfo.rollNumber || !personalInfo.branch || !personalInfo.year) {
      setErrorMessage('Please fill in all personal information fields');
      return false;
    }
    
    if (!professionalInfo.role || !professionalInfo.bio || professionalInfo.skills.length === 0) {
      setErrorMessage('Please fill in all professional information fields');
      return false;
    }
    
    if (professionalInfo.bio.length > 300) {
      setErrorMessage('Bio must be 300 characters or less');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const url = isEditing 
        ? `/api/members/profile/${editingEmail}`
        : '/api/members';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="p-8 text-center max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-accent-success mx-auto mb-4" />
          <h3 className="text-2xl font-space font-bold text-primary-text mb-4">
            {isEditing ? 'Profile Updated!' : 'Profile Created!'}
          </h3>
          <p className="text-secondary-text font-inter leading-relaxed">
            {isEditing 
              ? 'Your profile has been updated successfully and will be visible on the team page.'
              : 'Your profile has been created successfully and will be visible on the team page.'
            }
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-8">
        <GlassCard className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-space font-bold text-primary-text">
              {isEditing ? 'Edit Profile' : 'Add Member Profile'}
            </h2>
            <button
              onClick={onClose}
              className="text-muted-text hover:text-primary-text transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-space font-semibold text-primary-text mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-accent-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="your.email@example.com"
                    disabled={isEditing}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Roll Number *</label>
                  <input
                    type="text"
                    value={formData.personalInfo.rollNumber}
                    onChange={(e) => handleInputChange('personalInfo', 'rollNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="21XXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Branch *</label>
                  <select
                    value={formData.personalInfo.branch}
                    onChange={(e) => handleInputChange('personalInfo', 'branch', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="CHE">Chemical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Year *</label>
                  <select
                    value={formData.personalInfo.year}
                    onChange={(e) => handleInputChange('personalInfo', 'year', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-inter text-secondary-text mb-2">Profile Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.personalInfo.profileImage}
                  onChange={(e) => handleInputChange('personalInfo', 'profileImage', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-xl font-space font-semibold text-primary-text mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-accent-secondary" />
                Professional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Role *</label>
                  <select
                    value={formData.professionalInfo.role}
                    onChange={(e) => handleInputChange('professionalInfo', 'role', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    required
                  >
                    <option value="">Select Role</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Member Type</label>
                  <select
                    value={formData.membershipInfo.memberType}
                    onChange={(e) => handleInputChange('membershipInfo', 'memberType', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                  >
                    <option value="active">Active Member</option>
                    <option value="core">Core Team</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-inter text-secondary-text mb-2">Bio * (Max 300 characters)</label>
                <textarea
                  value={formData.professionalInfo.bio}
                  onChange={(e) => handleInputChange('professionalInfo', 'bio', e.target.value)}
                  maxLength={300}
                  rows={3}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300 resize-vertical"
                  placeholder="Brief description about yourself and your expertise..."
                  required
                />
                <div className="text-right text-xs text-muted-text mt-1">
                  {formData.professionalInfo.bio.length}/300
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-inter text-secondary-text mb-3">Skills * (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.professionalInfo.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 text-accent-primary bg-glass-white border-glass-border rounded focus:ring-accent-primary focus:ring-2"
                      />
                      <span className="text-sm font-inter text-secondary-text">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Portfolio URL</label>
                  <input
                    type="url"
                    value={formData.professionalInfo.portfolioUrl}
                    onChange={(e) => handleInputChange('professionalInfo', 'portfolioUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.professionalInfo.githubUrl}
                    onChange={(e) => handleInputChange('professionalInfo', 'githubUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.professionalInfo.linkedinUrl}
                    onChange={(e) => handleInputChange('professionalInfo', 'linkedinUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                <div>
                  <label className="block text-sm font-inter text-secondary-text mb-2">Twitter URL</label>
                  <input
                    type="url"
                    value={formData.professionalInfo.twitterUrl}
                    onChange={(e) => handleInputChange('professionalInfo', 'twitterUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-inter text-secondary-text mb-2">Position (Optional)</label>
                <input
                  type="text"
                  value={formData.membershipInfo.position}
                  onChange={(e) => handleInputChange('membershipInfo', 'position', e.target.value)}
                  className="w-full px-4 py-3 bg-glass-white border border-glass-border rounded-lg text-primary-text font-inter placeholder-muted-text focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-colors duration-300"
                  placeholder="e.g., Technical Lead, Project Manager"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 bg-accent-error/10 border border-accent-error/30 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-accent-error flex-shrink-0" />
                <span className="text-accent-error font-inter text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-glass-white border border-glass-border text-secondary-text rounded-lg font-inter font-medium hover:bg-hover-bg transition-colors duration-300"
              >
                Cancel
              </button>
              <GlowButton
                type="submit"
                disabled={isSubmitting}
                className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Profile' : 'Create Profile'}
                  </>
                )}
              </GlowButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default MemberForm;