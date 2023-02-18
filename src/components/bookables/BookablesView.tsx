import { FaPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link, useParams, } from 'react-router-dom';
import getData from '../../utils/api';
import PageSpinner from '../ui/PageSpinner';
import BookableDetails from './BookableDetails';
import BookablesList from './BookablesList';

export default function BookablesView() {
  const {data: bookables = [], status, error} = useQuery(
    'bookables',
    () => getData('http://localhost:3001/bookables')
  );
  const { id } = useParams();

  const bookable = bookables.find(b => b.id === parseInt(id, 10)) || bookables[0];

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={id => `/bookables/${id}`}
        />

        <p className="controls">
          <Link
            to="/bookables/new"
            replace={true}
            className="btn">
            <FaPlus/>
            <span>New</span>
          </Link>
        </p>
      </div>

      <BookableDetails bookable={bookable}/>
    </main>
  );
}