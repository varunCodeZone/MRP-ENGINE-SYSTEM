import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ItemsPage from './pages/ItemsPage';
import BomPage from './pages/BomPage';
import MrpPage from './pages/MrpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/bom" element={<BomPage />} />
            <Route path="/mrp" element={<MrpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;