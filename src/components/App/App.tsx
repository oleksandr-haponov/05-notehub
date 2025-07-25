import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchNotes, deleteNote } from '../../services/noteService';
import type { FetchNotesResponse } from '../../services/noteService';

import styles from './App.module.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch || undefined,
        page,
      }),
    gcTime: 0,
    staleTime: 0,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: number | string) => {
    deleteMutation.mutate(id);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={e => setSearch(e.target.value)} />

        {data && data.notes.length > 0 && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={styles.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isPending && <Loader />}
      {isError && <ErrorMessage message={error.message} />}

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      ) : (
        !isPending && <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onSuccess={() => {
              closeModal();
              setSearch('');
            }}
          />
        </Modal>
      )}
    </div>
  );
}