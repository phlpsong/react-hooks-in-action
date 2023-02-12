import { Fragment, useReducer } from 'react';
import { bookables, days, sessions } from '../../static.json';
import { FaArrowRight } from 'react-icons/fa';
import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0, 
  hasDetails: true,
  bookables
};

export default function BookablesList() {

  // const [ bookableIndex, setBookableIndex ] = useState(0);
  // const [ group, setGroup ] = useState('Kit');
  // const [hasDetails, setHasDetails] = useState(false);
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookableIndex, hasDetails, bookables } = state;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [...new Set(bookables.map(b => b.group))];

  function changeBookable (selectedIndex: number) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });
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

  return (
    <Fragment>
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
            autoFocus
          >
            <FaArrowRight/>
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>
                {bookable.title}
              </h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days
                      .sort()
                      .map(d => <li key={d}>{days[d]}</li>)
                    }
                  </ul>
                  <ul>
                    {bookable.sessions
                      .map(s => <li key={s}>{sessions[s]}</li>)
                    }
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}