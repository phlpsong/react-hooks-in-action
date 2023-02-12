import { Fragment, useCallback, useState } from 'react';
import BookableDetails from './BookableDetails';
import BookablesList from './BookablesList';

export default function BookablesView() {
  const [bookable, setBookable] = useState();

  const updateBookable = useCallback(selected => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={updateBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}