import { ErrorMessage as FormikErrorMessage } from 'formik';

interface Props {
  name: string;
}

export default function ErrorMessage({ name }: Props) {
  return (
    <FormikErrorMessage
      name={name}
      component="p"
      className="error"
    />
  );
}