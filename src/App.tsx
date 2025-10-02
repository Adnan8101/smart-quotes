import React, { useState, useEffect } from 'react';
import { QuoteApp } from './components/QuoteApp';
import Documentation from './components/Documentation';
import VivaExplanation from './components/VivaExplanation';
import { NetworkWarning } from './components/NetworkWarning';
import { FaEthereum, FaBook } from 'react-icons/fa';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'app' | 'docs'>('app');
  const [showVivaPage, setShowVivaPage] = useState(false);

  // Check if URL is /explain
  useEffect(() => {
    if (window.location.pathname === '/explain') {
      setShowVivaPage(true);
    }
  }, []);

  // If /explain route, show only the viva page
  if (showVivaPage) {
    return <VivaExplanation />;
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="App fullscreen-app">
      {/* Network Warning Banner */}
      <NetworkWarning />
      
      {/* Ultra-Premium Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Premium Navigation Bar */}
      <nav className="sexy-navbar">
        <div className="navbar-left">
          <div className="logo-container">
            <div className="logo-icon"><FaEthereum /></div>
            <div className="logo-text">AIB Quote Manager</div>
          </div>
        </div>
        
        <div className="navbar-center">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'app' ? 'active' : ''}`}
              onClick={() => setActiveTab('app')}
            >
              <span className="tab-icon">🚀</span>
              <span>Quote Manager</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'docs' ? 'active' : ''}`}
              onClick={() => setActiveTab('docs')}
            >
              <span className="tab-icon"><FaBook /></span>
              <span>Documentation</span>
            </button>
          </div>
        </div>
        
        <div className="navbar-right">
          <button className="fullscreen-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
            <span>⛶</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content-area">
        {activeTab === 'app' ? <QuoteApp /> : <Documentation />}
      </main>

      {/* Floating Action Button */}
      <div className="floating-actions">
        <button 
          className="fab main-fab" 
          title="Premium Actions"
          onClick={() => console.log('Premium action triggered!')}
        >
          ✨
        </button>
      </div>
    </div>
  );
};

export default App;
