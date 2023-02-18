import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import getData from '../../utils/api';
import PageSpinner from '../ui/PageSpinner';
import BookableForm from './BookableForm';
import useFormState from './useFormState';

export default function BookableEdit() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery(
    ['bookable', id], 
    () => getData(`http://localhost:3001/bookables/${id}`), 
    {
      initialData: queryClient.getQueryData('bookables')?.find(b => b.id === parseInt(id, 10))
    }
  );

  const formState = useFormState(data);

  function handleDelete () {
  }

  function handleSubmit () {

  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <BookableForm 
      formState
      handleSubmit={handleSubmit}
      handleDelete ={handleDelete}
    />
  );
}