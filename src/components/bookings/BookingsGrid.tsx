import {useEffect, useMemo, useState, Fragment} from 'react';
import {getGrid, transformBookings} from './grid-builder';
import {getBookings} from '../../utils/api';
import Spinner from '../ui/Spinner';
import { useBookings, useGrid } from './bookingsHook';

export default function BookingsGrid (
  {week, bookable, booking, setBooking}
) {
  const {bookings, status, error} = useBookings(bookable?.id, week.start, week.end);

  const {grid, sessions, dates} = useGrid(bookable, week.start);

  useEffect(() => {
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  function cell (session, date) {
    const cellData = bookings?.[session]?.[date]
      || grid[session][date];

    const isSelected = booking?.session === session
      && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? 'selected' : undefined}
        onClick={status === 'success' ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        className={status === 'success'  ? 'bookingsGrid active' : 'bookingsGrid'}
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner/>
              </span>
            </th>
            {dates.map(d => (
              <th key={d}>
                {(new Date(d)).toDateString()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map(session => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map(date => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}