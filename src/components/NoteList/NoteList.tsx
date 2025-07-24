import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  if (!notes.length) return null;

  return (
    <ul className={styles.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={styles.listItem}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.content}>{content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{tag}</span>
            <button
              type="button"
              className={styles.button}
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}