import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Chat from './Chat';
import Login from './views/login';
import Register from './views/register';
import Logout from './views/logout';
import AdminCRUD from './admin/adminCrud';


const App = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);


 useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    setIsAuthenticated(isAuthenticated);
 }, []);

 const handleLogin = () => {
    setIsAuthenticated(true);
 };

 const handleLogout = () => {
    setIsAuthenticated(false);
 };

 return (
    <Router>
      <div>
        <nav>
          <ul>
            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </nav>

        <hr />
        <Routes>
          <Route
            path="/login"
            element={<Login authenticate={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register authenticate={handleLogin} />}
          />
          <Route
            path="/logout"
            element={<Logout onLogout={handleLogout} />}
          />
          <Route
            path="/admin"
            element={<AdminCRUD/>}
          />
          <Route
            path="/"
            element={<Chat />}
            index
          />
          <Route
            path="*"
            element={<Chat />}
          />
        </Routes>
      </div>
    </Router>
 );
};

export default App;
