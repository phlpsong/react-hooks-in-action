import { MutableRefObject, useReducer, useRef, useState } from 'react';
import {FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck} from 'react-icons/fa';
import { getWeek } from '../../utils/date-wrangler';
import reducer from './weekReducer';

export default function WeekPicker (props: { date: Date }) {

  // reducer: create new state by action and old state
  // initArg: the args that init func needed
  // initFn: generate init state
  const [week, dispatch] = useReducer(reducer, props.date, getWeek);
  const [dateText, setDateText] = useState('2020-06-24');
  //   const textboxRef = useRef() as MutableRefObject<HTMLInputElement>;

  function goToDate() {
    dispatch({ 
      type: 'SET_DATE',
      payload: dateText
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({type: 'PREV_WEEK'})}
        >
          <FaChevronLeft/>
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch({type: 'TODAY'})}
        >
          <FaCalendarDay/>
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            placeholder="e.g. 2020-09-02"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />

          <button
            className="go btn"
            onClick={goToDate}
          >
            <FaCalendarCheck/>
            <span>Go</span>
          </button>
        </span>

        <button
          className="btn"
          onClick={() => dispatch({type: 'NEXT_WEEK'})}
        >
          <span>Next</span>
          <FaChevronRight/>
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}