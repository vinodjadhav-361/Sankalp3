import React, { useState, useEffect } from 'react';
import { BarChart2, Calendar, CheckSquare, DollarSign, FileText, MessageCircle, Users, PlusCircle, Gift } from 'lucide-react';
import FundraisingPage from './FundraisingPage';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Upcoming';
  type: 'Event' | 'Mission' | 'Charity';
  location: 'National' | 'District' | 'Local';
  volunteers: number;
  budget: number;
  completedMilestones: number;
  totalMilestones: number;
}

const ProjectManagementPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call in a real application
    const mockProjects: Project[] = [
      { id: 1, name: "Diwali Festival", description: "Annual Diwali celebration", progress: 75, status: "In Progress", type: "Event", location: "National", volunteers: 100, budget: 50000, completedMilestones: 6, totalMilestones: 8 },
      { id: 2, name: "Temple Renovation", description: "Renovating the local temple", progress: 30, status: "In Progress", type: "Mission", location: "Local", volunteers: 50, budget: 100000, completedMilestones: 2, totalMilestones: 10 },
      { id: 3, name: "Vedic Education Program", description: "Launching online Vedic courses", progress: 0, status: "Upcoming", type: "Mission", location: "National", volunteers: 20, budget: 25000, completedMilestones: 0, totalMilestones: 5 },
      { id: 4, name: "Food Drive", description: "Charity food distribution", progress: 100, status: "Completed", type: "Charity", location: "District", volunteers: 30, budget: 10000, completedMilestones: 4, totalMilestones: 4 },
    ];
    setProjects(mockProjects);
  }, []);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Project Dashboard</h3>
            <p>Overview of all projects will be displayed here.</p>
          </div>
        );
      case 'planning':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Project Planning</h3>
            <button className="bg-saffron-600 text-white px-4 py-2 rounded-lg flex items-center">
              <PlusCircle size={20} className="mr-2" />
              Create New Project
            </button>
          </div>
        );
      case 'tasks':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Task Management</h3>
            <p>Manage and track project tasks here.</p>
          </div>
        );
      case 'volunteers':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Volunteer Management</h3>
            <p>Manage volunteers and assignments here.</p>
          </div>
        );
      case 'budget':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Budget Tracking</h3>
            <p>Monitor project budgets and expenses here.</p>
          </div>
        );
      case 'promotion':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Project Promotion</h3>
            <p>Manage project promotion and outreach here.</p>
          </div>
        );
      case 'communication':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Team Communication</h3>
            <p>Facilitate team communication and collaboration here.</p>
          </div>
        );
      case 'fundraise':
        return <FundraisingPage />;
      case 'feedback':
        return (
          <div>
            <h3 className="font-semibold text-lg mb-4">Feedback & Surveys</h3>
            <p>Collect and analyze project feedback here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const sections = [
    { id: 'dashboard', icon: BarChart2, title: 'Dashboard' },
    { id: 'planning', icon: Calendar, title: 'Planning' },
    { id: 'tasks', icon: CheckSquare, title: 'Tasks' },
    { id: 'volunteers', icon: Users, title: 'Volunteers' },
    { id: 'budget', icon: DollarSign, title: 'Budget' },
    { id: 'promotion', icon: FileText, title: 'Promotion' },
    { id: 'communication', icon: MessageCircle, title: 'Communication' },
    { id: 'fundraise', icon: Gift, title: 'Fund Raise' },
    { id: 'feedback', icon: MessageCircle, title: 'Feedback' },
  ];

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-saffron-800">Project Management</h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${
              activeSection === section.id
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-saffron-600 hover:bg-saffron-100'
            } transition-colors duration-200 shadow`}
          >
            <section.icon size={24} className="mb-2" />
            <span className="text-sm text-center">{section.title}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ProjectManagementPage;