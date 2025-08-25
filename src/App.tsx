import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Home } from './pages/Home';
import { SofExtraction } from './pages/SofExtraction';
import { ChartPartyGenerator } from './pages/ChartPartyGenerator';
import { Weather } from './pages/Weather';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sof-extraction" element={<SofExtraction />} />
            <Route path="/charter-party" element={<ChartPartyGenerator />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;