import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa';
import BookablesPage from './components/bookables/BookablesPage';
import BookingsPage from './components/bookings/BookingsPage';
import UsersPage from './components/users/UsersPage';
import UserPicker from './components/users/UserPicker';
import { UserProvider } from './components/users/UserProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt/>
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen/>
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers/>
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <UserPicker/>
            </header>
            <Routes>
              <Route path="/bookings" element={<BookingsPage/>}/>
              <Route path="/bookables/*" element={<BookablesPage/>}/>
              <Route path="/users" element={<UsersPage/>}/>
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
