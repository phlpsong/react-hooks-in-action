import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../utils/api';
import Spinner from '../ui/Spinner';

export default function BookablesList({ bookable, setBookable }) {

  // const [ bookableIndex, setBookableIndex ] = useState(0);
  // const [ group, setGroup ] = useState('Kit');
  // const [hasDetails, setHasDetails] = useState(false);
  
  // const [state, dispatch] = useReducer(reducer, initialState);

  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups: string[] = [...new Set(bookables.map(b => b.group))];

  useEffect(() => {
    getData('http://localhost:3001/bookables')
      .then(bookables => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

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

  function changeBookable (selectedBookable) {
    setBookable(selectedBookable);
    nextButtonRef.current.focus();
  }

  function nextBookable () {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  function changeGroup (group: string) {
    const bookablesInSelectedGroup = bookables.filter(
      b => b.group === group
    );
    setBookable(bookablesInSelectedGroup[0]);
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
            className={b.id === bookable.id ? 'selected' : undefined}
          >
            <button
              className="btn"
              onClick={() => changeBookable(b)}
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