import { Fragment, useReducer } from 'react';
import BookableDetails from './BookableDetails';
import BookablesList from './BookablesList';
import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0, 
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { 
    group, bookableIndex, bookables,
  } = state;

  const bookablesInGroup = bookables.filter(b => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  return (
    <Fragment>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}