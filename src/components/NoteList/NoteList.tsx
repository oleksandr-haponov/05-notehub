import type { Note } from '../../types/note';
import styles from './NoteList.module.css';

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes.length) return null;

  return (
    <ul className={styles.list}>
      {notes.map(({ _id, title, content, tag }) => (
        <li key={_id} className={styles.listItem}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.content}>{content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{tag}</span>
            <button
              type="button"
              className={styles.button}
              onClick={() => onDelete(_id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}