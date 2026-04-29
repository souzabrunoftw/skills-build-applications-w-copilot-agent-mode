import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3 mb-3">OctoFit Tracker Dashboard</h1>
        <p className="lead">
          Browse backend activity data using the navigation menu. Each view is styled with Bootstrap tables, cards, buttons, and modal details.
        </p>
        <p>
          The frontend consumes the Django REST API and supports paginated and plain array responses.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
