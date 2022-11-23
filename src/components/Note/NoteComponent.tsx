import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/redux';
import { Note } from '@/utils/types';
import { deleteNote } from '@/redux/slices/notesSlice';
import HighlightedText from '@/components/HighlightedText/HighlightedText';
import './Note.scss';

type Props = Note;

function NoteComponent({ title, tags, id }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    navigate('/notes');
    dispatch(deleteNote(id));
  }, [id]);

  return (
    <div className='note'>
      <Link
        className='note__link'
        to={`/notes/${id}`}
      >
        <div className='note-content'>
          <p className='note-content__title'>{title}</p>
          <div className='note-content__tags'>
            {tags.map((tag, index) => (
              <HighlightedText
                key={Date.now().toString(16) + Math.random()}
                id={index}
                text={tag}
              />
            ))}
          </div>
        </div>
      </Link>
      <div className='note__controllers'>
        <Link
          className='note__edit-link'
          to={`/notes/${id}/edit`}
        >
          Edit
        </Link>
        <button
          className='note__delete-btn'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteComponent;
