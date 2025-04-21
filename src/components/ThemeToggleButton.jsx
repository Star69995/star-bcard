import { useTheme } from "../providers/ThemeContext";

function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    // הגדרת הצבעים המותאמים לכל מצב
    const iconColorClass = theme === "light"
        ? "text-primary" // צבע כחול למצב רגיל (לאייקון הירח)
        : "text-warning"; // צבע צהוב/כתום למצב אפל (לאייקון השמש)

    return (
        <button className="btn border-0 bg-transparent" onClick={toggleTheme}>
            <i className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"} fs-4 ${iconColorClass}`}></i>
        </button>
    );
}

export default ThemeToggleButton;