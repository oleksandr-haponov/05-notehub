import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: FormValues = {
  title: '',
  content: '',
  tag: 'Personal',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required(),
});

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values);
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          Title
          <Field name="title" className={styles.input} />
          <ErrorMessage name="title" />
        </label>

        <label className={styles.label}>
          Content
          <Field
            as="textarea"
            name="content"
            className={styles.textarea}
            rows={4}
          />
          <ErrorMessage name="content" />
        </label>

        <label className={styles.label}>
          Tag
          <Field as="select" name="tag" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" />
        </label>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}