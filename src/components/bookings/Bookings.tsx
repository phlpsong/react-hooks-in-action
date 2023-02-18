import { useEffect, useState} from 'react';
import {getWeek, shortISO} from '../../utils/date-wrangler';
import WeekPicker from './WeekPicker';
import BookingDetails from './BookingDetails';
import { useBookings, useBookingsParams } from './bookingsHook';
import BookingsGridSlide from './BookingsGridSlide';

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

  // deselect the booking if it no longer exists
  // i.e. it has been deleted
  useEffect(() => {
    if (booking?.id !== undefined && !selectedBooking) {
      setBooking(null);
    }
  }, [booking, selectedBooking]);

  return (
    <div className="bookings">
      <div>
        <WeekPicker />

        <BookingsGridSlide
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