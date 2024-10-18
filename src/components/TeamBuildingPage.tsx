import React, { useState } from 'react';
import { Users, Award, TrendingUp, UserPlus, Building, ChevronDown, ChevronRight, CheckSquare, Target } from 'lucide-react';

interface User {
  id: number;
  name: string;
  rank: string;
  avatar: string;
  downline: User[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Mission {
  id: number;
  title: string;
  progress: number;
}

const TeamBuildingPage: React.FC = () => {
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);

  const currentUser: User = {
    id: 1,
    name: 'John Doe',
    rank: 'Gold',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    downline: [
      {
        id: 2,
        name: 'Alice Smith',
        rank: 'Silver',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Alice',
        downline: [],
      },
      {
        id: 3,
        name: 'Bob Johnson',
        rank: 'Bronze',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Bob',
        downline: [],
      },
    ],
  };

  const tasks: Task[] = [
    { id: 1, title: 'Complete 5 daily posts', completed: false },
    { id: 2, title: 'Invite 3 new members', completed: true },
    { id: 3, title: 'Attend weekly team meeting', completed: false },
  ];

  const missions: Mission[] = [
    { id: 1, title: 'Organize a local community event', progress: 60 },
    { id: 2, title: 'Launch a fundraising campaign', progress: 30 },
  ];

  const toggleUserExpansion = (userId: number) => {
    setExpandedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const renderUserHierarchy = (user: User, level: number = 0) => {
    const isExpanded = expandedUsers.includes(user.id);

    return (
      <div key={user.id} className="mb-2">
        <div className={`flex items-center p-2 bg-saffron-50 rounded-lg ${level > 0 ? 'ml-4' : ''}`}>
          <button onClick={() => toggleUserExpansion(user.id)} className="mr-2">
            {user.downline.length > 0 && (isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />)}
          </button>
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
          <span className="font-semibold">{user.name}</span>
          <span className="ml-2 text-saffron-600">({user.rank})</span>
        </div>
        {isExpanded && user.downline.map(downlineUser => renderUserHierarchy(downlineUser, level + 1))}
      </div>
    );
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Team Building</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 text-saffron-800">Your Team</h2>
          {renderUserHierarchy(currentUser)}
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 text-saffron-800">Tasks</h2>
          {tasks.map(task => (
            <div key={task.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through text-saffron-500' : ''}>{task.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-saffron-800">Active Missions</h2>
        {missions.map(mission => (
          <div key={mission.id} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span>{mission.title}</span>
              <span>{mission.progress}%</span>
            </div>
            <div className="w-full bg-saffron-200 rounded-full h-2.5">
              <div
                className="bg-saffron-600 h-2.5 rounded-full"
                style={{ width: `${mission.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBuildingPage;