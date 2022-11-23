import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import React, { useCallback, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import HighlightedText from '@/components/HighlightedText/HighlightedText';
import HighlightedTextField from '@/components/HighlightedTextField/HighlightedTextField';
import { editNote } from '@/redux/slices/notesSlice';
import './NoteEdit.scss';

function NoteEditPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const note = useAppSelector((state) => state.notes.notes.find((n) => n.id === id));
  if (!note) return <Navigate to='/oops' />;

  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [tags, setTags] = useState<string[]>(note.tags);

  const handleEdit = useCallback(() => {
    console.log('edit');
    dispatch(editNote({ title, body, tags, id: note.id }));
    navigate(`/notes/${id}`);
  }, [title, body, tags, navigate]);

  return (
    <div className='note-edit'>
      <h2>Edit note</h2>
      <div className='note-edit__inputs'>
        <input
          className='note-edit__title-input'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <HighlightedTextField
          className='note-edit__body-input'
          onChange={(e) => setBody(e.target.value)}
          regex={/\s?#[^\s#]+/g}
          value={body}
          setHighlighted={setTags}
          Component={HighlightedText}
        />
        <div className='note-edit__tags'>
          {tags.map((tag, index) => (
            <HighlightedText
              key={Date.now().toString(16) + Math.random()}
              text={tag}
              id={index}
            />
          ))}
        </div>
      </div>
      <button
        className='note-edit__create-btn'
        disabled={!title && !body}
        onClick={handleEdit}
      >
        Edit
      </button>
    </div>
  );
}

export default NoteEditPage;
