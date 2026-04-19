import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import IntroScreen from './pages/IntroScreen';
import LandingPage from './pages/LandingPage';
import EvidenceVault from './pages/EvidenceVault';
import RoastArena from './pages/RoastArena';
import RedemptionArc from './pages/RedemptionArc';
import TimelinePage from './pages/TimelinePage';
import VerdictPage from './pages/VerdictPage';
import CursorTrail from './components/CursorTrail';
import './App.css';

function App() {
  return (
    <Router>
      <CursorTrail />
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        
        <Route element={<Layout />}>
          <Route path="/muhasiba" element={<LandingPage />} />
          <Route path="/evidence" element={<EvidenceVault />} />
          <Route path="/roast-arena" element={<RoastArena />} />
          <Route path="/redemption" element={<RedemptionArc />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/verdict" element={<VerdictPage />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
