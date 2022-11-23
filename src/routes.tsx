import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/pages/Layout/Layout';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import NotesPage from './pages/Notes/NotesPage';
import NoteAddPage from './pages/NoteAdd/NoteAddPage';
import NotePage from './pages/Note/NotePage';
import NoteEditPage from './pages/NoteEdit/NoteEditPage';

export const routes = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/notes',
        children: [
          {
            path: '',
            element: <NotesPage />,
          },
          {
            path: 'add',
            element: <NoteAddPage />,
          },
          {
            path: ':id',
            element: <NotePage />,
          },
          {
            path: ':id/edit',
            element: <NoteEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
