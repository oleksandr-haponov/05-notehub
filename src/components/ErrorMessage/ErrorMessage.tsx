import { ErrorMessage as FormikErrorMessage } from 'formik';
import styles from './ErrorMessage.module.css';

interface Props {
  name: string;
}

export default function ErrorMessage({ name }: Props) {
  return (
    <FormikErrorMessage
      name={name}
      component="p"
      className={styles.error}
    />
  );
}