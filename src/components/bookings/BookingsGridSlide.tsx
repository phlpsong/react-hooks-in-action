import {animated} from 'react-spring';
import BookingsGrid from './BookingsGrid';
import { useSlide } from './bookingsHook';

export default function BookingsGridSlide (props) {
  const {week, bookable, booking, setBooking} = props;

  const transitions = useSlide(bookable, week);
  
  return (
    <div className="grid-wrapper">
      {transitions.map(({item, props, key}) => (
        <animated.div
          className="grid"
          style={{...props}}
          key={key}
        >
          <BookingsGrid
            week={item.week}
            bookable={item.bookable}
            booking={booking}
            setBooking={setBooking}
          />
        </animated.div>
      ))}
    </div>
  );
}