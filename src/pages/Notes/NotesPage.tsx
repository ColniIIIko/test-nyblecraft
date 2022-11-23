import React, { useCallback, useMemo, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { Link } from 'react-router-dom';

import NoteComponent from '@/components/Note/NoteComponent';
import HighlightedText from '@/components/HighlightedText/HighlightedText';
import './NotesPage.scss';

function NotesPage() {
  const { notes } = useAppSelector((state) => state.notes);

  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const tags = useMemo(
    () => Array.from(new Set(notes.map((n) => n.tags).flat(1))),
    [notes]
  );

  const handleTag = useCallback(
    (tag: string) => {
      setTagsFilter(
        tagsFilter.includes(tag)
          ? tagsFilter.filter((t) => t !== tag)
          : [...tagsFilter, tag]
      );
    },
    [tagsFilter]
  );

  const notesToDisplay = useMemo(
    () =>
      !tagsFilter.length
        ? notes
        : notes.filter((n) => {
            for (const tag of tagsFilter) {
              if (n.tags.includes(tag)) return true;
            }
            return false;
          }),
    [tagsFilter, notes]
  );

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
        <div className='notes'>
          <div className='notes__tags-filter'>
            {tags.map((t, index) => (
              <div
                className={tagsFilter.includes(t) ? 'tag tag_active' : 'tag'}
                key={t}
                onClick={() => handleTag(t)}
              >
                <HighlightedText
                  text={t}
                  id={index}
                />
              </div>
            ))}
          </div>
          <div className='notes-list'>
            {notesToDisplay.map((note) => (
              <NoteComponent
                key={note.id}
                {...note}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>Notes not found</div>
      )}
    </>
  );
}

export default NotesPage;
