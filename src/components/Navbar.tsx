import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if the current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Movie<span className="logo-accent">App</span></span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
        
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>
          </li>
        </ul>

        {/* User Actions */}
        <div className="nav-actions">
          <button className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/movies" className={`mobile-nav-link ${isActive('/movies') ? 'active' : ''}`} onClick={toggleMobileMenu}>
              Movies
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/tv-shows" className={`mobile-nav-link ${isActive('/tv-shows') ? 'active' : ''}`} onClick={toggleMobileMenu}>
              TV Shows
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={toggleMobileMenu}>
              About
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/login" className="mobile-login-button" onClick={toggleMobileMenu}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
