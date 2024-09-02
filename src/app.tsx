import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Detail />} />{' '}
        {/* No pasar props aquí directamente */}
      </Routes>
    </Router>
  );
};

export default App;
