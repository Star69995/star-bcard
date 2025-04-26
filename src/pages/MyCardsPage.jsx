import CardsPage from "../components/CardsPage";
import { Link } from "react-router-dom";
import { useTheme } from "../providers/ThemeContext";

function MyCardsPage() {
    const { theme } = useTheme(); // קבלת המצב הנוכחי של ה-theme

    // עיצוב מותאם לכפתור
    const buttonStyle = theme === 'dark'
        ? { backgroundColor: '#0056b3', color: '#ffffff', border: 'none' }  // כהה יותר במצב חושך
        : { backgroundColor: '#007bff', color: '#ffffff', border: 'none' };  // צבע רגיל במצב בהיר

    return (
        <>
            <div className="container mt-3">
                <h1>My Cards</h1>
            </div>

            {/* מרכז הכפתור */}
            <div className="text-center mb-4">
                <Link to="/create-card" className="btn" style={buttonStyle}>
                    Create New Card
                </Link>
            </div>

            {/* הדיספליי של כרטיסים */}
            <div className="d-flex justify-content-around m-3 gap-3 flex-wrap">
                <CardsPage filterType="mine" />
            </div>
        </>
    );
}

export default MyCardsPage;
