import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTheme } from '../providers/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


const SearchBar = () => {
    const { theme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const inputStyle = theme === 'dark'
        ? { backgroundColor: '#333333', color: '#e0e0e0', border: '1px solid #444444' }
        : { backgroundColor: '#ffffff', color: '#212529', border: '1px solid #ced4da' };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const toggleSearch = () => {
        if (!isMobile) return;
        setIsExpanded(!isExpanded);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            toggleSearch();
        }
    };

    const handleBlur = () => {
        if (!searchQuery) {
            toggleSearch();
        }
    };

    return (
        <div className="d-flex align-items-center">
            {isMobile && !isExpanded ? (
                <Button variant="link" onClick={toggleSearch} aria-label="Search">
                    <FaSearch />
                </Button>
            ) : (
                <>
                        <Button variant="link" onClick={handleSearch} className="me-3 p-0">
                            <FaSearch />
                        </Button>

                    <Form.Control
                        ref={inputRef}
                        className="me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onBlur={handleBlur}
                            style={{
                                position: 'fixed',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 1050,
                                maxWidth: '300px',
                                width: isExpanded ? '90%' : undefined,
                                ...inputStyle
                            }}

                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </>
            )}
        </div>
    );
};

export default SearchBar;
