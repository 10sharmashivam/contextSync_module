import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import './styles/App.css';

/**
 * Main application component that sets up routing for the app.
 *
 * @return {JSX.Element} The rendered component with configured routes.
 * The routes include:
 * - "/" which renders the Dashboard component.
 * - "/onboarding" which renders the Onboarding component.
 */

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;