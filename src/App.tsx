import React, { useState } from 'react';
import { Home, Search, Bell, Mail, Bookmark, User, Building, Trophy, Calendar, Settings, Hash, BarChart2, Video, Users, ShoppingBag } from 'lucide-react';
import ProfilePage from './components/ProfilePage';
import OrganizationsPage from './components/OrganizationsPage';
import NotificationsPage from './components/NotificationsPage';
import MessagingPage from './components/MessagingPage';
import EventsPage from './components/EventsPage';
import RankingPage from './components/RankingPage';
import SettingsPage from './components/SettingsPage';
import HashtagsPage from './components/HashtagsPage';
import PollsPage from './components/PollsPage';
import LivestreamPage from './components/LivestreamPage';
import TeamManagementPage from './components/TeamManagementPage';
import MarketplacePage from './components/MarketplacePage';
import ExplorePage from './components/ExplorePage';
import Tweet from './components/Tweet';

export interface PostType {
  id: number;
  user: string;
  handle: string;
  content: string;
  likes: number;
  shares: number;
  comments: number;
  replies: any[];
  level: string;
}

export interface Organization {
  id: number;
  name: string;
  handle: string;
  followers: number;
  isFollowing: boolean;
  image: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  isAttending: boolean;
}

export interface UserRanking {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  points: number;
  rank: number;
  badges: string[];
  streak: number;
}

export interface Game {
  id: number;
  name: string;
  description: string;
  playedCount: number;
}

export interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: number[];
  createdBy: string;
  createdAt: string;
  endsAt: string;
}

export interface Livestream {
  id: number;
  title: string;
  description: string;
  organizationId: number;
  startTime: string;
  endTime: string;
  viewers: number;
  status: 'upcoming' | 'live' | 'ended';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState<PostType[]>([
    { id: 1, user: 'Ramesh Kumar', handle: '@rameshkumar', content: 'Just joined Sankalp! Excited to connect with fellow Hindu organizations.', likes: 5, shares: 2, comments: 1, replies: [], level: 'national' },
    { id: 2, user: 'Priya Sharma', handle: '@priyasharma', content: 'Sankalp is an amazing platform for our community!', likes: 10, shares: 4, comments: 3, replies: [], level: 'state' },
    { id: 3, user: 'Amit Patel', handle: '@amitpatel', content: 'Local temple renovation project starting next week. Volunteers needed!', likes: 15, shares: 8, comments: 5, replies: [], level: 'local' },
  ]);
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: 1, name: 'Vedic Foundation', handle: '@vedicfoundation', followers: 25600, isFollowing: false, image: 'https://api.dicebear.com/6.x/initials/svg?seed=VF' },
    { id: 2, name: 'Hindu Youth Forum', handle: '@hinduyouthforum', followers: 18300, isFollowing: true, image: 'https://api.dicebear.com/6.x/initials/svg?seed=HYF' },
    { id: 3, name: 'Sanskrit Lovers', handle: '@sanskritlovers', followers: 12900, isFollowing: false, image: 'https://api.dicebear.com/6.x/initials/svg?seed=SL' },
  ]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRanking, setUserRanking] = useState<UserRanking>({
    id: 1,
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    points: 1000,
    rank: 5,
    badges: ['Top Contributor', 'Event Organizer'],
    streak: 7
  });
  const [games, setGames] = useState<Game[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [livestreams, setLivestreams] = useState<Livestream[]>([]);

  const renderMainContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-saffron-800">Welcome to Sankalp</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-saffron-700">Recent Posts</h2>
              {posts.map((post) => (
                <Tweet
                  key={post.id}
                  tweet={post}
                  onLike={() => {}}
                  onShare={() => {}}
                  onComment={() => {}}
                  onBookmark={() => {}}
                />
              ))}
            </div>
          </div>
        );
      case 'explore':
        return <ExplorePage />;
      case 'notifications':
        return <NotificationsPage notifications={[]} />;
      case 'messages':
        return <MessagingPage chats={[]} messages={[]} onSendMessage={() => {}} />;
      case 'bookmarks':
        return <div>Bookmarks Page Content</div>;
      case 'profile':
        return <ProfilePage userRanking={userRanking} posts={posts} organizations={organizations} onLike={() => {}} onShare={() => {}} onComment={() => {}} />;
      case 'organizations':
        return <OrganizationsPage organizations={organizations} setOrganizations={setOrganizations} posts={posts} onLike={() => {}} onShare={() => {}} onComment={() => {}} />;
      case 'ranking':
        return <RankingPage userRanking={userRanking} games={games} />;
      case 'events':
        return <EventsPage events={events} setEvents={setEvents} />;
      case 'settings':
        return <SettingsPage />;
      case 'hashtags':
        return <HashtagsPage />;
      case 'polls':
        return <PollsPage polls={polls} setPolls={setPolls} />;
      case 'livestream':
        return <LivestreamPage livestreams={livestreams} setLivestreams={setLivestreams} />;
      case 'teamManagement':
        return <TeamManagementPage />;
      case 'marketplace':
        return <MarketplacePage />;
      default:
        return null;
    }
  };

  const renderLeftSidebar = () => (
    <div className="w-1/4 py-4 px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-saffron-700">Sankalp</h1>
      </div>
      <nav>
        <a href="#" onClick={() => setCurrentPage('home')} className={`flex items-center mb-4 text-lg ${currentPage === 'home' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Home className="mr-4" /> Home</a>
        <a href="#" onClick={() => setCurrentPage('explore')} className={`flex items-center mb-4 text-lg ${currentPage === 'explore' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Search className="mr-4" /> Explore</a>
        <a href="#" onClick={() => setCurrentPage('notifications')} className={`flex items-center mb-4 text-lg ${currentPage === 'notifications' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Bell className="mr-4" /> Notifications</a>
        <a href="#" onClick={() => setCurrentPage('messages')} className={`flex items-center mb-4 text-lg ${currentPage === 'messages' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Mail className="mr-4" /> Messages</a>
        <a href="#" onClick={() => setCurrentPage('bookmarks')} className={`flex items-center mb-4 text-lg ${currentPage === 'bookmarks' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Bookmark className="mr-4" /> Bookmarks</a>
        <a href="#" onClick={() => setCurrentPage('profile')} className={`flex items-center mb-4 text-lg ${currentPage === 'profile' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><User className="mr-4" /> Profile</a>
        <a href="#" onClick={() => setCurrentPage('organizations')} className={`flex items-center mb-4 text-lg ${currentPage === 'organizations' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Building className="mr-4" /> Organizations</a>
        <a href="#" onClick={() => setCurrentPage('ranking')} className={`flex items-center mb-4 text-lg ${currentPage === 'ranking' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Trophy className="mr-4" /> Ranking</a>
        <a href="#" onClick={() => setCurrentPage('events')} className={`flex items-center mb-4 text-lg ${currentPage === 'events' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Calendar className="mr-4" /> Events</a>
        <a href="#" onClick={() => setCurrentPage('settings')} className={`flex items-center mb-4 text-lg ${currentPage === 'settings' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Settings className="mr-4" /> Settings</a>
        <a href="#" onClick={() => setCurrentPage('hashtags')} className={`flex items-center mb-4 text-lg ${currentPage === 'hashtags' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Hash className="mr-4" /> Hashtags</a>
        <a href="#" onClick={() => setCurrentPage('polls')} className={`flex items-center mb-4 text-lg ${currentPage === 'polls' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><BarChart2 className="mr-4" /> Polls</a>
        <a href="#" onClick={() => setCurrentPage('livestream')} className={`flex items-center mb-4 text-lg ${currentPage === 'livestream' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Video className="mr-4" /> Livestream</a>
        <a href="#" onClick={() => setCurrentPage('teamManagement')} className={`flex items-center mb-4 text-lg ${currentPage === 'teamManagement' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><Users className="mr-4" /> Team Management</a>
        <a href="#" onClick={() => setCurrentPage('marketplace')} className={`flex items-center mb-4 text-lg ${currentPage === 'marketplace' ? 'font-bold text-saffron-800' : 'text-saffron-600'}`}><ShoppingBag className="mr-4" /> Marketplace</a>
      </nav>
    </div>
  );

  const renderRightSidebar = () => {
    if (currentPage !== 'home' && currentPage !== 'explore') {
      return null;
    }

    return (
      <div className="w-1/4 py-4 px-6">
        <div className="bg-saffron-100 rounded-lg p-4 mb-4">
          <h2 className="font-bold text-xl mb-4 text-saffron-800">Trending Topics</h2>
          <div className="mb-3">
            <p className="text-sm text-saffron-600">Trending in Spirituality</p>
            <p className="font-bold text-saffron-800">#Diwali2023</p>
            <p className="text-sm text-saffron-600">5,234 Posts</p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-saffron-600">Culture · Trending</p>
            <p className="font-bold text-saffron-800">#YogaDay</p>
            <p className="text-sm text-saffron-600">32.1K Posts</p>
          </div>
          <a href="#" className="text-saffron-600 text-sm hover:text-saffron-700">Show more</a>
        </div>
        <div className="bg-saffron-100 rounded-lg p-4">
          <h2 className="font-bold text-xl mb-4 text-saffron-800">Organizations to follow</h2>
          <div className="mb-3">
            <p className="font-bold text-saffron-800">Vedic Foundation</p>
            <button className="text-saffron-600 text-sm hover:text-saffron-700">Follow</button>
          </div>
          <div className="mb-3">
            <p className="font-bold text-saffron-800">Hindu Youth Forum</p>
            <button className="text-saffron-600 text-sm hover:text-saffron-700">Follow</button>
          </div>
          <a href="#" className="text-saffron-600 text-sm hover:text-saffron-700">Show more</a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-saffron-50">
      <div className="container mx-auto flex">
        {renderLeftSidebar()}
        <div className="w-1/2 border-x border-saffron-200 bg-white">
          {renderMainContent()}
        </div>
        {renderRightSidebar()}
      </div>
    </div>
  );
};

export default App;