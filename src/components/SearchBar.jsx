import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTheme } from '../providers/ThemeContext';

const SearchBar = () => {
    const { theme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const inputRef = useRef(null); // יצירת reference לשדה החיפוש

    const inputStyle = theme === 'dark'
        ? { backgroundColor: '#333333', color: '#e0e0e0', border: '1px solid #444444' }
        : { backgroundColor: '#ffffff', color: '#212529', border: '1px solid #ced4da' };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // מקטין את הגודל לפי רוחב המסך
        };

        handleResize(); // מכניס את המצב בהתחלה
        window.addEventListener('resize', handleResize); // מאזין לשינויי גודל המסך

        return () => {
            window.removeEventListener('resize', handleResize); // מסיר את המאזין
        };
    }, []);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus(); // מבצע פוקוס על שדה החיפוש אם הוא נפתח
        }
    }, [isExpanded]); // מבצע פוקוס רק כש- isExpanded משתנה

    const toggleSearch = () => {
        if (!isMobile) return;
        setIsExpanded(!isExpanded); // משנה את מצב התצוגה של שדה החיפוש
    };

    return (
        <div className="d-flex align-items-center">
            {isMobile && !isExpanded ? (
                <Button
                    variant="link"
                    onClick={toggleSearch}
                    aria-label="Search"
                >
                    🔍
                </Button>
            ) : (
                <Form.Control
                    ref={inputRef} // קישור ל-ref
                    className="me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onBlur={toggleSearch}
                    style={{ maxWidth: '300px', width: isExpanded ? '100%' : '10', ...inputStyle }}
                />
            )}
        </div>
    );
};

export default SearchBar;
