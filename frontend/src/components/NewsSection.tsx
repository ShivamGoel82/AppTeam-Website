import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import GlassCard from './GlassCard';
import GlowButton from './GlowButton';
import { Link } from 'react-router-dom'; // Make sure react-router-dom is installed and configured

interface Announcement {
  _id: string; // Assuming your backend uses _id for the unique identifier
  title: string;
  content: string; // Changed from description to content to match NewsSection's usage
  date: string; // Assuming date is a string from the backend
  author?: string; // Optional author field
}

const NewsSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Ensure this URL is correct for your backend API
      const response = await fetch('https://appteam-website-1.onrender.com/api/announcements');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Assuming your API returns { success: true, data: [...] }
      if (data.success && Array.isArray(data.data)) {
        // Sort by date in descending order (newest first)
        const sortedData = data.data.sort((a: Announcement, b: Announcement) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setAnnouncements(sortedData);
      } else {
        setAnnouncements([]); // If API returns success but no data or wrong format
      }
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
      setError("Failed to load announcements. Please try again later.");
      setAnnouncements([]); // Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]); // Re-run effect if fetchAnnouncements changes (due to useCallback, it won't)

  // Helper function to format the date for display
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString; // Return original string if formatting fails
    }
  };

  return (
    <section id="news" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header - Preserved UI */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl lg:text-4xl font-space font-bold text-primary-text mb-2">
            Latest <span className="text-accent-primary">Announcements</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            Stay updated with the latest news, events, and updates from AppTeam.
          </p>
        </div>

        {/* Action Button (Link to announcements management page) - Preserved UI */}
        {/* This link assumes you have a route set up for /manage-announcements */}
        <div className="flex justify-center mb-8 md:mb-12">
          <Link to="/manage-announcements">
            <GlowButton>
              <Plus className="w-4 h-4 mr-2" />
              Manage Announcements
            </GlowButton>
          </Link>
        </div>

        {/* Conditional Rendering based on loading, error, and data presence */}
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-accent-primary mx-auto"></div>
            <p className="text-secondary-text mt-4">Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center text-secondary-text">
            <p>No announcements found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {announcements.map((announcement) => (
              <GlassCard key={announcement._id} className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-space font-semibold text-primary-text mb-3 line-clamp-2">
                    {announcement.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-text font-inter leading-relaxed mb-4 line-clamp-4">
                    {announcement.content} {/* Displaying content from fetched data */}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-accent-tertiary font-inter">
                  <span>{formatDate(announcement.date)}</span>
                  {announcement.author && <span>By {announcement.author}</span>}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(NewsSection);