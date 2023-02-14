import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import React, { useState } from 'react';
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa';
import BookablesPage from './components/bookables/BookablesPage';
import BookingsPage from './components/bookings/BookingsPage';
import UsersPage from './components/users/UsersPage';
import UserPicker from './components/users/UserPicker';
import UserContext from './components/users/UserContext';

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
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

            <UserPicker />
          </header>

          <Routes>
            <Route path="/bookings" element={<BookingsPage/>}/>
            <Route path="/bookables" element={<BookablesPage/>}/>
            <Route path="/users" element={<UsersPage/>}/>
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
