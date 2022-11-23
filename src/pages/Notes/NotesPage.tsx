import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { Link } from 'react-router-dom';

import NoteComponent from '@/components/Note/NoteComponent';
import './NotesPage.scss';

function NotesPage() {
  const { notes } = useAppSelector((state) => state.notes);

  return (
    <>
      <div className='notes-header'>
        <h2 className='notes-title'>Notes</h2>
        <Link
          className='notes-create-link'
          to='/notes/add'
        >
          Create Note
        </Link>
      </div>
      {notes.length ? (
        <div className='notes-list'>
          {notes.map((note) => (
            <NoteComponent
              key={note.id}
              {...note}
            />
          ))}
        </div>
      ) : (
        <div>Notes not found</div>
      )}
    </>
  );
}

export default NotesPage;
