import { useTransition } from 'react';
import Spinner from '../ui/Spinner';

export default function ButtonPending({children, onClick, ...props}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(onClick);
  }

  return (
    <button onClick={handleClick} {...props}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
}