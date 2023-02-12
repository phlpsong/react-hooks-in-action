import { MutableRefObject, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../utils/api';
import Spinner from '../ui/Spinner';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0, 
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesList({ state, dispatch }) {

  // const [ bookableIndex, setBookableIndex ] = useState(0);
  // const [ group, setGroup ] = useState('Kit');
  // const [hasDetails, setHasDetails] = useState(false);
  
  // const [state, dispatch] = useReducer(reducer, initialState);

  const { 
    group, bookableIndex, hasDetails, bookables, isLoading, error 
  } = state;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups: string[] = [...new Set(bookables.map(b => b.group))];

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });
    getData('http://localhost:3001/bookables')
      .then(bookables => dispatch({
        type: 'FETCH_BOOKABLES_SUCCESS',
        payload: bookables
      }))
      .catch(error => dispatch({
        type: 'FETCH_BOOKABLES_ERROR',
        payload: error,
      }));
  }, [dispatch]);

  const nextButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;
  
  // const timerRef = useRef(null);

  // function stopPresentation() {
  //   clearInterval(timerRef.current);
  // }

  // useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     dispatch({ type: 'NEXT_BOOKABLE' });
  //   }, 3000);
  // }, []);

  function changeBookable (selectedIndex: number) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });
    nextButtonRef.current.focus();
  }

  function nextBookable () {
    dispatch({ type: 'NEXT_BOOKABLE' });
  }

  function changeGroup (group: string) {
    dispatch({ type: 'SET_GROUP', payload: group });
  }

  function toggleDetails () {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p><Spinner /> Loading bookables... </p>;
  }

  return (
    <div>
      <select
        value={group}
        onChange={(e) => changeGroup(e.target.value)}
      >
        {groups.map(g => <option value={g} key={g}>{g}</option>)}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li
            key={b.id}
            className={i === bookableIndex ? 'selected' : undefined}
          >
            <button
              className="btn"
              onClick={() => changeBookable(i)}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}