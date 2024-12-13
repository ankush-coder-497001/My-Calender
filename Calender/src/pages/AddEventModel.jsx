import React, { useState } from 'react';

const EventModal = ({ date, events, onClose, onSave, filterText }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const dateString = date.toISOString().split('T')[0];
  const dateEvents = events[dateString] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { name, startTime, endTime, description };
    const updatedEvents = { ...events };
    if (!updatedEvents[dateString]) {
      updatedEvents[dateString] = [];
    }
    updatedEvents[dateString].push(newEvent);
    onSave(updatedEvents);
    setName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  const handleDelete = (index) => {
    const updatedEvents = { ...events };
    updatedEvents[dateString].splice(index, 1);
    if (updatedEvents[dateString].length === 0) {
      delete updatedEvents[dateString];
    }
    onSave(updatedEvents);
  };

  const filteredEvents = dateEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(filterText.toLowerCase()) ||
      event.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Events for {date.toDateString()}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">Save Event</button>
        </form>
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <div key={index} className="event-item">
              <strong>{event.name}</strong><br />
              {event.startTime} - {event.endTime}<br />
              {event.description}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;

