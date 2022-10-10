import React from 'react';
import ReactDOM from 'react-dom/client';
import NoteInput from './note-input/component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NoteInput />
  </React.StrictMode>
);
