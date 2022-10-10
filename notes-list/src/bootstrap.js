import React from 'react';
import ReactDOM from 'react-dom/client';
import NotesList from './notes-list/component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesList />
  </React.StrictMode>
);
