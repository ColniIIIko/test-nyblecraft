import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate, useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { deleteNote } from '@/redux/slices/notesSlice';
import HighlightedText from '@/components/HighlightedText/HighlightedText';

import './NotePage.scss';

function NotePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const note = useAppSelector((state) => state.notes.notes.find((n) => n.id === id));
  if (!note) return <Navigate to='/oops' />;

  const handleDelete = useCallback(() => {
    dispatch(deleteNote(note.id));
    navigate('/notes');
  }, [id]);

  return (
    <div className='note-full'>
      <div className='note-full__header'>
        <h2>Note</h2>
        <div className='note-full__controllers'>
          <Link
            className='note-full__edit-link'
            to={`/notes/${id}/edit`}
          >
            Edit
          </Link>
          <button
            className='note-full__delete-btn'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <h3 className='note-full__title'>{note.title}</h3>
      <p className='note-full__body'>{note.body}</p>
      <div className='note-full__tags'>
        {note.tags.map((tag, index) => (
          <HighlightedText
            key={Date.now().toString(16) + Math.random()}
            id={index}
            text={tag}
          />
        ))}
      </div>
    </div>
  );
}

export default NotePage;
