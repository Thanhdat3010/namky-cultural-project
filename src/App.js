import React, { useState, useEffect, useCallback } from 'react';
import { useDictionary } from './hooks/useDictionary';
import HeroSection from './components/HeroSection';
import TimelineExplorer from './components/TimelineExplorer';
import DictionarySearch from './components/DictionarySearch';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  const {
    data,
    filteredData,
    stats,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showModernOnly,
    setShowModernOnly,
  } = useDictionary();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading__spinner" />
        <div className="app-loading__text">Đang tải kho từ vựng Nam Bộ...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app-error">
        <div className="app-error__icon">⚠️</div>
        <div className="app-error__text">Không thể tải dữ liệu: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`app-nav ${scrolled ? 'app-nav--scrolled' : ''}`}>
        <div className="app-nav__inner">
          <button className="app-nav__logo" onClick={() => scrollTo('hero')}>
            Phương Ngữ <em>Nam Kỳ</em>
          </button>

          <button
            className="app-nav__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`app-nav__links ${mobileMenuOpen ? 'app-nav__links--open' : ''}`}>
            <button className="app-nav__link" onClick={() => scrollTo('timeline')}>
              Dòng thời gian
            </button>
            <button className="app-nav__link" onClick={() => scrollTo('dictionary')}>
              Từ điển
            </button>
            <button className="app-nav__link" onClick={() => scrollTo('about')}>
              Về dự án
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection
        stats={stats}
        onExplore={() => scrollTo('timeline')}
      />

      {/* Timeline Explorer */}
      <TimelineExplorer
        data={data}
        filteredData={filteredData}
        stats={stats}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showModernOnly={showModernOnly}
        setShowModernOnly={setShowModernOnly}
      />

      {/* Dictionary Search */}
      <DictionarySearch
        data={data}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* About */}
      <AboutSection stats={stats} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
