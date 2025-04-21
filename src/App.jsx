import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Placeholder components for your pages
import HomePage from './components/HomePage';
const AboutPage = () => <div className="container mt-3"><h1>About Page</h1></div>;
const FavoritesPage = () => <div className="container mt-3"><h1>Favorites Page</h1></div>;
const MyCardsPage = () => <div className="container mt-3"><h1>My Cards Page</h1></div>;
import Register from './components/Register';
import { ThemeProvider } from './providers/ThemeContext';
import "bootstrap-icons/font/bootstrap-icons.css";
// import ThemeToggleButton from './components/ThemeToggleButton';
import { useTheme } from './providers/ThemeContext';
import { useContext } from 'react';
import Login from './components/Login';
import CardDetails from './pages/CardDetails'

function App() {
  const { theme } = useTheme();

  return (
    
    <div className={theme === "dark" ? "custom-dark-theme" : "bg-light text-dark"}
    style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/* Apply dynamic background color */}

        <BrowserRouter>
          <NavbarComponent />
          {/* Add top padding to account for fixed navbar */}
          <div style={{ paddingTop: '70px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/my-cards" element={<MyCardsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cards/:id" element={<CardDetails />} />
            </Routes>
          </div>
        </BrowserRouter>

      </div>
  );
}

export default App;