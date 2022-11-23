import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Note } from '@/utils/types';

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = { notes: [] };

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.map((n) =>
        n.id === action.payload.id ? action.payload : n
      );
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { createNote, editNote, deleteNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
