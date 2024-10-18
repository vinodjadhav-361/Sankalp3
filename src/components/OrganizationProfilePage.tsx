import React, { useState } from 'react';
import { Calendar, MapPin, Link, Mail, Users, Award, Briefcase, DollarSign } from 'lucide-react';
import Tweet from './Tweet';
import { PostType, Organization } from '../App';

interface OrganizationProfilePageProps {
  organization: Organization;
  posts: PostType[];
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const OrganizationProfilePage: React.FC<OrganizationProfilePageProps> = ({ organization, posts, onLike, onShare, onComment }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'about'>('posts');

  const organizationPosts = posts.filter(post => post.handle === organization.handle);

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${organization.image})` }}></div>

      {/* Profile Info */}
      <div className="relative px-4 py-3 border-b border-saffron-200">
        <img src={organization.image} alt={organization.name} className="absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-white" />
        <div className="ml-36">
          <h1 className="text-2xl font-bold text-saffron-800">{organization.name}</h1>
          <p className="text-saffron-600">{organization.handle}</p>
        </div>
        <p className="mt-2 text-saffron-800">{organization.description}</p>
        <div className="flex mt-2 text-sm text-saffron-600">
          <span className="mr-4"><strong className="text-saffron-800">{organization.followers}</strong> Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-saffron-200">
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'posts' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'events' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'about' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'posts' && (
          <div className="divide-y divide-saffron-200">
            {organizationPosts.map((post) => (
              <Tweet
                key={post.id}
                tweet={post}
                onLike={onLike}
                onShare={onShare}
                onComment={onComment}
              />
            ))}
          </div>
        )}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Upcoming Events</h2>
            {/* Add event list here */}
          </div>
        )}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">About {organization.name}</h2>
            <p className="text-saffron-700 mb-4">{organization.description}</p>
            {/* Add more organization details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationProfilePage;