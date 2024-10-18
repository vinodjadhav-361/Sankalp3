import React, { useState } from 'react';
import { Calendar, MapPin, Link, Mail, Users, Award, Briefcase } from 'lucide-react';
import Tweet from './Tweet';
import { PostType, Organization, UserRanking } from '../App';

interface ProfilePageProps {
  userRanking: UserRanking;
  posts: PostType[];
  organizations: Organization[];
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userRanking, posts, organizations, onLike, onShare, onComment }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'media'>('posts');

  // Mock user data (replace with actual user data in a real application)
  const user = {
    name: userRanking.name,
    handle: userRanking.handle,
    bio: 'Passionate about Hindu culture and traditions. Software engineer by profession.',
    location: 'Mumbai, India',
    website: 'https://example.com',
    joinDate: 'Joined September 2022',
    following: 250,
    followers: 1000,
    coverImage: 'https://source.unsplash.com/random/1500x500/?india',
    avatar: userRanking.avatar,
  };

  const userPosts = posts.filter(post => post.handle === user.handle);

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverImage})` }}></div>

      {/* Profile Info */}
      <div className="relative px-4 py-3 border-b border-saffron-200">
        <img src={user.avatar} alt={user.name} className="absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-white" />
        <div className="ml-36">
          <h1 className="text-2xl font-bold text-saffron-800">{user.name}</h1>
          <p className="text-saffron-600">{user.handle}</p>
        </div>
        <p className="mt-2 text-saffron-800">{user.bio}</p>
        <div className="flex flex-wrap items-center mt-2 text-sm text-saffron-600">
          <span className="flex items-center mr-4"><MapPin size={16} className="mr-1" />{user.location}</span>
          <span className="flex items-center mr-4"><Link size={16} className="mr-1" /><a href={user.website} className="text-saffron-500 hover:underline">{user.website}</a></span>
          <span className="flex items-center mr-4"><Calendar size={16} className="mr-1" />{user.joinDate}</span>
        </div>
        <div className="flex mt-2 text-sm text-saffron-600">
          <span className="mr-4"><strong className="text-saffron-800">{user.following}</strong> Following</span>
          <span><strong className="text-saffron-800">{user.followers}</strong> Followers</span>
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
          className={`flex-1 py-3 font-medium ${activeTab === 'replies' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('replies')}
        >
          Replies
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'media' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
      </div>

      {/* Posts */}
      <div className="divide-y divide-saffron-200">
        {userPosts.map((post) => (
          <Tweet
            key={post.id}
            tweet={post}
            onLike={onLike}
            onShare={onShare}
            onComment={onComment}
          />
        ))}
      </div>

      {/* Organizations */}
      <div className="p-4 border-t border-saffron-200">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Organizations</h2>
        <div className="grid grid-cols-2 gap-4">
          {organizations.slice(0, 4).map((org) => (
            <div
              key={org.id}
              className="bg-saffron-50 p-3 rounded-lg cursor-pointer hover:bg-saffron-100 transition duration-200"
            >
              <h3 className="font-semibold text-saffron-800">{org.name}</h3>
              <p className="text-sm text-saffron-600">{org.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;