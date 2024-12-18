import React, { useState, useEffect } from 'react';
import EventModal from './AddEventModel';
import { motion } from 'framer-motion';
import '../App.css'
const Home = ({ user, onLogout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const hasEvents = events[dateString] && events[dateString].length > 0;

      days.push(
        <motion.div
          key={dateString}
          className={`calendar-day ${date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : ''} ${
            date.toDateString() === new Date().toDateString() ? 'today' : ''
          }`}
          onClick={() => handleDayClick(date)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="day-number">{day}</span>
          {hasEvents && <div className="event-indicator"></div>}
        </motion.div>
      );
    }

    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>{user.name}'s Calendar</h1>
        <div className="calendar-controls">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter events..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      {showModal && selectedDate && (
        <EventModal
          date={selectedDate}
          events={events}
          onClose={() => setShowModal(false)}
          onSave={saveEvents}
          filterText={filterText}
        />
      )}
    </div>
  );
};

export default Home;
