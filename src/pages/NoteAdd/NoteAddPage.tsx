import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import HighlightedText from '@/components/HighlightedText/HighlightedText';
import HighlightedTextField from '@/components/HighlightedTextField/HighlightedTextField';
import { useAppDispatch } from '@/hooks/redux';
import { createNote } from '@/redux/slices/notesSlice';
import './NoteAdd.scss';

function NoteAddPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleCreate = useCallback(() => {
    dispatch(
      createNote({
        title,
        body,
        tags,
        id: Date.now().toString(16) + Math.random(),
      })
    );
    navigate('/notes');
  }, [title, body, tags, navigate]);

  return (
    <div className='note-add'>
      <h2>Create note</h2>
      <div className='note-add__inputs'>
        <input
          className='note-add__title-input'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <HighlightedTextField
          className='note-add__body-input'
          onChange={(e) => setBody(e.target.value)}
          regex={/\s?#[^\s#]+/g}
          value={body}
          setHighlighted={setTags}
          Component={HighlightedText}
        />
        <div className='note-add__tags'>
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
        className='note-add__create-btn'
        disabled={!title || !body}
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  );
}

export default NoteAddPage;
