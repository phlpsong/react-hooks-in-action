import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import getData, { deleteItem, editItem } from '../../utils/api';
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

  // get the mutation function and status booleans
  // for updating the bookable
  const {
    updateBookable,
    isUpdating,
    isUpdateError,
    updateError
  } = useUpdateBookable();

  // get the mutation function and status booleans
  // for deleting the bookable
  const {
    deleteBookable,
    isDeleting,
    isDeleteError,
    deleteError
  } = useDeleteBookable();

  function handleDelete () {
    if (window.confirm('Are you sure you want to delete the bookable?')) {
      // call the mutation function for deleting the bookable
      deleteBookable(formState.state);
    }
  }

  function handleSubmit () { 
    updateBookable(formState.state);
  }

  if (isUpdateError || isDeleteError) {
    return <p>{updateError?.message || deleteError.message}</p>;
  }

  if (isLoading || isUpdating || isDeleting) {
    return <PageSpinner />;
  }

  return (
    <BookableForm 
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete ={handleDelete}
    />
  );
}

function useBookable (id: string) {
  const queryClient = useQueryClient();
  return useQuery(
    ['bookables', id]),
  () => getData(`http://localhost:3001/bookables/${id}`),
  {
    refetchOnWindowFocus: false,
    initialData: queryClient
      .getQueriesData('bookables')
      ?.find(b => b.id === parseInt(id, 10))
  };
}

function useUpdateBookable () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    item => editItem(`http://localhost:3001/bookables/${item.id}`, item),
    {
      onSuccess: bookable => {
        updateBookablesCache(bookable, queryClient);

        queryClient.setQueryData(['bookable', String(bookable.id)], bookable);

        navigate(`/bookables/${bookable.id}`);
      }
    }
  );
  return {
    updateBookable: mutation.mutate,
    isUpdating: mutation.isLoading,
    isUpdateError: mutation.isError,
    updateError: mutation.error
  };
}

/* Replace a bookable in the cache
 * with the updated version.
 */
function updateBookablesCache (bookable, queryClient) {
  // get all the bookables from the cache
  const bookables = queryClient.getQueryData('bookables') || [];

  // find the index in the cache of the bookable that's been edited
  const bookableIndex = bookables.findIndex(b => b.id === bookable.id);

  // if found, replace the pre-edited version with the edited one
  if (bookableIndex !== -1) {
    bookables[bookableIndex] = bookable;
    queryClient.setQueryData('bookables', bookables);
  }
}

function useDeleteBookable () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    bookable => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
    {
      /* on success receives the original item as a second argument */
      onSuccess: (response, bookable) => {
        // get all the bookables from the cache
        const bookables = queryClient.getQueryData('bookables') || [];

        // set the bookables cache without the deleted one
        queryClient.setQueryData(
          'bookables',
          bookables.filter(b => b.id !== bookable.id)
        );

        // If there are other bookables in the same group as the deleted one,
        // navigate to the first
        navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ''}`);
      }
    }
  );

  return {
    deleteBookable: mutation.mutate,
    isDeleting: mutation.isLoading,
    isDeleteError: mutation.isError,
    deleteError: mutation.error
  };
}

function getIdForFirstInGroup (bookables, excludedBookable) {
  // get the id and group of the deleted bookable
  const {id, group} = excludedBookable;

  // find the first other bookable in the same group as the deleted one
  const bookableInGroup = bookables.find(b => b.group === group && b.id !== id);

  // return its id or undefined
  return bookableInGroup?.id;
}