import React, { useState } from 'react';
import { Calendar, MapPin, Users, Share2, Clock } from 'lucide-react';
import { Event } from '../App';

interface EventsPageProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventsPage: React.FC<EventsPageProps> = ({ events, setEvents }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttend = (id: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id
          ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
          : event
      )
    );
  };

  const handleShare = (event: Event) => {
    // Implement share functionality
    console.log(`Sharing event: ${event.name}`);
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-saffron-200">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Upcoming Events</h2>
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-saffron-800">{event.name}</h3>
                <button
                  onClick={() => handleAttend(event.id)}
                  className={`px-4 py-1 rounded-full text-sm font-bold ${
                    event.isAttending
                      ? 'bg-saffron-200 text-saffron-800'
                      : 'bg-saffron-600 text-white'
                  } hover:bg-saffron-700 transition duration-200`}
                >
                  {event.isAttending ? 'Attending' : 'Attend'}
                </button>
              </div>
              <p className="text-saffron-600 mb-2">{event.description}</p>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{event.date}</span>
                <Clock size={16} className="ml-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center justify-between text-saffron-500 text-sm">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>{event.attendees} attending</span>
                </div>
                <button
                  onClick={() => handleShare(event)}
                  className="flex items-center text-saffron-600 hover:text-saffron-700"
                >
                  <Share2 size={16} className="mr-1" />
                  Share
                button
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;