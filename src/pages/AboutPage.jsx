import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from "../providers/ThemeContext";
import { Link } from 'react-router-dom';


const AboutPage = () => {
    const { theme } = useTheme(); // Get theme state from your specific context
    const isDarkMode = theme === 'dark';

    // Define dynamic theme classes
    const bgClass = isDarkMode ? 'bg-dark' : 'bg-white';
    const textClass = isDarkMode ? 'text-light' : 'text-dark';
    const cardBgClass = isDarkMode ? 'bg-dark' : 'bg-white';
    const cardTextClass = isDarkMode ? 'text-light' : 'text-dark';
    const cardBorderClass = isDarkMode ? 'border-secondary' : 'border-0';
    const techItemClass = isDarkMode ? 'bg-secondary' : 'bg-light';
    const techItemTextClass = isDarkMode ? 'text-light' : 'text-dark';
    const badgeBgClass = isDarkMode ? 'bg-secondary' : 'bg-light';
    const badgeTextClass = isDarkMode ? 'text-light' : 'text-dark';

    // Define dynamic card header classes
    const headerClasses = {
        primary: isDarkMode ? 'bg-primary-subtle text-primary-emphasis' : 'bg-primary text-white',
        info: isDarkMode ? 'bg-info-subtle text-info-emphasis' : 'bg-info text-white',
        secondary: isDarkMode ? 'bg-secondary-subtle text-secondary-emphasis' : 'bg-secondary text-white',
        success: isDarkMode ? 'bg-success-subtle text-success-emphasis' : 'bg-success text-white',
        warning: isDarkMode ? 'bg-warning-subtle text-warning-emphasis' : 'bg-warning text-dark',
    };

    return (
        <Container className={`py-5 ${bgClass} ${textClass}`}>
            {/* Header Section */}
            <Row className="mb-5">
                <Col md={12} className="text-center">
                    <h1 className={`display-4 fw-bold ${textClass}`}>About Us</h1>
                    <div className="d-flex justify-content-center">
                        <hr className={`my-4 w-50 ${isDarkMode ? 'border-light' : 'border-dark'}`} />
                    </div>
                    <p className={`lead fs-4 ${textClass}`}>Welcome to our digital business card platform! This site allows you to create, edit, and manage your digital business cards with ease.</p>
                </Col>
            </Row>

            {/* Features Section */}
            <Row className="mb-5">
                <Col>
                    <Card className={`shadow-sm ${cardBgClass} ${cardBorderClass}`}>
                        <Card.Header className={headerClasses.primary}>
                            <h2 className="mb-0 d-flex align-items-center">
                                <i className="bi bi-star-fill me-2"></i> Features
                            </h2>
                        </Card.Header>
                        <Card.Body className={`${cardBgClass}`}>
                            <Row>
                                {[
                                    { title: "Create & Edit", text: "Create and edit digital business cards" },
                                    { title: "Manage", text: "Store and manage your cards" },
                                    { title: "Favorites", text: "Save favorite cards" },
                                    { title: "Search", text: "Search for specific cards" },
                                    { title: "Responsive", text: "Responsive and accessible design" }
                                ].map((feature, index) => (
                                    <Col md={4} sm={6} className="mb-4" key={index}>
                                        <Card className={`h-100 shadow-sm ${cardBgClass} ${cardBorderClass}`}>
                                            <Card.Body className={`text-center ${cardBgClass} ${techItemClass}`}>

                                                <Badge bg={isDarkMode ? 'secondary' : 'light'}
                                                    text={isDarkMode ? 'light' : 'dark'}
                                                    className="mb-3 px-3 py-2 rounded-pill">
                                                    {feature.title}
                                                </Badge>
                                                <p className={`mb-0 ${cardTextClass}`}>{feature.text}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* How It Works Section */}
            <Row className="mb-5">
                <Col>
                    <Card className={`shadow-sm ${cardBgClass} ${cardBorderClass}`}>
                        <Card.Header className={headerClasses.info}>
                            <h2 className="mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle-fill me-2"></i> How It Works
                            </h2>
                        </Card.Header>
                        <Card.Body className={`p-4 ${cardBgClass}`}>
                            <p className={`lead ${cardTextClass}`}>Sign up to start creating your business cards. Once you create your card, you can share it with others, edit it at any time, and keep it updated with your latest information.</p>
                            <div className="text-center mt-4">
                                <Button as={Link} to="/register" variant={isDarkMode ? 'outline-info' : 'outline-info'} size="lg">
                                    Get Started
                                </Button>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Technologies Section */}
            <Row className="mb-5">
                <Col>
                    <Card className={`shadow-sm ${cardBgClass} ${cardBorderClass}`}>
                        <Card.Header className={headerClasses.secondary}>
                            <h2 className="mb-0 d-flex align-items-center">
                                <i className="bi bi-gear-fill me-2"></i> Technologies Used
                            </h2>
                        </Card.Header>
                        <Card.Body className={cardBgClass}>
                            <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
                                {[
                                    "React", "Axios", "JWT", "Bootstrap", "React Router",
                                    "React Toastify", "Bootstrap Icons", "Yup", "Formik"
                                ].map((tech, index) => (
                                    <Col key={index}>
                                        <div className={`border rounded text-center py-3 h-100 d-flex align-items-center justify-content-center ${techItemClass} ${techItemTextClass}`}>
                                            {tech}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Accessibility Section */}
            <Row>
                
                
                <Col md={6} className="mb-4">
                    <Card className={`h-100 shadow-sm ${cardBgClass} ${cardBorderClass}`}>
                        <Card.Header className={headerClasses.warning}>
                            <h2 className="mb-0 d-flex align-items-center">
                                <i className="bi bi-person-lines-fill me-2"></i> Accessibility
                            </h2>
                        </Card.Header>
                        <Card.Body className={cardBgClass}>
                            <p className={cardTextClass}>Our site is fully accessible and optimized for screen readers and mobile devices.</p>
                            <div className="d-flex gap-2 mt-3 flex-wrap">
                                <Badge bg={badgeBgClass} text={badgeTextClass} className="px-3 py-2">Screen Reader Friendly</Badge>
                                <Badge bg={badgeBgClass} text={badgeTextClass} className="px-3 py-2">Mobile Optimized</Badge>
                                <Badge bg={badgeBgClass} text={badgeTextClass} className="px-3 py-2">High Contrast</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;