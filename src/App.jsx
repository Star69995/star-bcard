import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './components/Register';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from './providers/ThemeContext';
import Login from './components/Login';
import CardDetails from './pages/CardDetails'
import FavoritesPage from './pages/FavoritesPage';
import MyCardsPage from './pages/MyCardsPage';
import CreateCardForm from './components/CreateCardForm';
import EditCardForm from './components/EditCardForm';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FooterComponent from './components/FooterComponent';


const SandBox = () => { <><h1>Sandbox</h1><p>coming soon</p></> }

function App() {
  const { theme } = useTheme();

  return (
    
    <div
      className={theme === "dark" ? "custom-dark-theme" : "bg-light text-dark"}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <BrowserRouter>
        <NavbarComponent />
        <main style={{ flexGrow: 1, paddingTop: '70px' }}> {/* Flex-grow to fill remaining space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/my-cards" element={<MyCardsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cards/:id" element={<CardDetails />} />
            <Route path="/sandbox" element={<SandBox />} />
            <Route path="/create-card" element={<CreateCardForm />} />
            <Route path="/edit-card/:id" element={<EditCardForm />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <FooterComponent />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;