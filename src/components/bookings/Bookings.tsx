import { useEffect, useState} from 'react';
import {getWeek, shortISO} from '../../utils/date-wrangler';
import WeekPicker from './WeekPicker';
import BookingsGrid from './BookingsGrid';
import BookingDetails from './BookingDetails';
import { useBookings, useBookingsParams } from './bookingsHook';

export default function Bookings ({bookable}) {

  const [booking, setBooking] = useState(null);

  const {date} = useBookingsParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);
  
  const {bookings} = useBookings(bookable?.id, week.start, week.end);
  const selectedBooking = bookings?.[booking?.session]?.[booking.date];

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart]);

  return (
    <div className="bookings">
      <div>
        <WeekPicker />

        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>

      <BookingDetails
        booking={selectedBooking || booking}
        bookable={bookable}
      />
    </div>
  );
}