import { MutableRefObject, useEffect, useRef, } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useFetch from '../../utils/useFetch';
import Spinner from '../ui/Spinner';

export default function BookablesList({ bookable, setBookable }) {

  const {data: bookables = [], status, error} = useFetch(
    'http://localhost:3001/bookables'
  );

  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups: string[] = [...new Set(bookables.map(b => b.group))];

  useEffect(() => {
    setBookable(bookables[0]);
  }, [bookables, setBookable]);

  const nextButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;

  function changeBookable (selectedBookable: any) {
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

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
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