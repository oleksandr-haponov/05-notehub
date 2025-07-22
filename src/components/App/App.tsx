import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';
import type { Note } from '../../types/note';

import styles from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes', debouncedSearch],
    queryFn: () => fetchNotes({ search: debouncedSearch }),
  });

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={e => setSearch(e.target.value)} />
        {/* Pagination */}
        {/* Button to open modal */}
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}

      {data && data.results.length > 0 ? (
        <ul>
          {data.results.map((note: Note) => (
            <li key={note._id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No notes found</p>
      )}
    </div>
  );
}