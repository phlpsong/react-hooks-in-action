import { useReducer } from 'react';
import { FaCalendarDay, FaChevronCircleLeft, FaChevronRight } from 'react-icons/fa';
import { getWeek } from '../../utils/date-wrangler';
import reducer from './weekReducer';

export default function WeekPicker (props: { date: Date }) {
  const [week, dispatch] = useReducer(reducer, props.date, getWeek);

  return (
    <div>
      <p className='date-picker'>
        <button
          className='btn'
          onClick={() => dispatch({ type: 'PREV_WEEK' })}
        >
          <FaChevronCircleLeft />
          <span>Prev</span>
        </button>

        <button
          className='btn'
          onClick={() => dispatch({ type: 'TODAY' })}
        >
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <button
          className='btn'
          onClick={() => dispatch({ type: 'NEXT_WEEK' })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}