import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from "../providers/ThemeContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useUser } from "../providers/UserContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardDetails = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { user, token } = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`)
            .then((res) => {
                setCard(res.data);
                
                if (user && res.data.likes) {
                    setIsLiked(res.data.likes?.includes(user?._id) || false); 
                    
                }
                setLikesCount(res.data.likes?.length || 0);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load card details");
                setLoading(false);
            });
    }, [id, user]);



    const toggleLike = async () => {
        if (!token) {
            alert("Please log in to like cards");
            return;
        }

        setIsAnimating(true);

        try {
            await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                {},
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            setIsLiked(prev => !prev); // עדכון מצב הלייק
            setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));  // עדכון count לפי הלייק החדש

            setTimeout(() => {
                setIsAnimating(false);
            }, 700);
        } catch (error) {
            console.error("Error toggling like:", error);
            setIsAnimating(false);
        }
    };


    // עיצוב בהתאם לנושא
    const cardStyle = {
        backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
        color: theme === "light" ? "#000" : "#f8f9fa",
        border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
        borderRadius: "0.5rem",
        boxShadow: theme === "light" ? "0 4px 12px rgba(0,0,0,0.1)" : "0 4px 12px rgba(0,0,0,0.3)"
    };

    const sectionStyle = {
        backgroundColor: theme === "light" ? "#f8f9fa" : "#2c2c2c",
        borderRadius: "0.4rem",
        padding: "1.5rem",
        marginBottom: "1.5rem"
    };

    // סגנונות לאנימציית הלב
    const heartStyles = {
        button: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            padding: '0px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s'
        },
        icon: {
            fontSize: '1.5rem',
            color: isLiked ? '#ff2b56' : (theme === "light" ? '#6c757d' : '#adb5bd'),
            transition: 'all 0.3s ease',
            animation: isAnimating ? 'heartBeat 0.7s ease-in-out' : 'none'
        },
        container: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
        },
        count: {
            marginLeft: '8px',
            fontWeight: 'bold',
            color: theme === "light" ? '#212529' : '#f8f9fa',
        }
    };

    // CSS keyframes for heart animation
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        @keyframes heartBeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(styleElement);

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading card details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    if (!card) return null;

    // console.log(isLiked);
    

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = async (cardId) => {
        try {
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
            toast.success('Card deleted successfully!');

            navigate("/my-cards");

        } catch (err) {
            console.error(err);
        }
    };

    const fullAddress = card.address ?
        `${card.address.street || ""} ${card.address.houseNumber || ""}, ${card.address.city || ""}, ${card.address.country || ""} ${card.address.zip ? `(${card.address.zip})` : ""}`
        : "Address not available";

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="mb-4" style={cardStyle}>
                        {/* Header section with image */}
                        <div className="position-relative">
                            <img
                                src={card.image?.url || "/api/placeholder/1200/400"}
                                alt={card.image?.alt || card.title}
                                className="img-fluid w-100"
                                style={{
                                    height: "300px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "0.5rem",
                                    borderTopRightRadius: "0.5rem"
                                }}
                            />
                            <div
                                className="position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill"
                                style={{
                                    backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
                                }}
                            >
                                <span className="fw-bold">Card #{card.bizNumber}</span>
                            </div>
                            <div
                                className="position-absolute bottom-0 start-0 m-3 d-flex align-items-center"
                            >
                                <div style={heartStyles.container}>
                                    <button
                                        onClick={toggleLike}
                                        style={heartStyles.button}
                                        aria-label={isLiked ? "Unlike" : "Like"}
                                    >
                                        <i
                                            className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}
                                            style={heartStyles.icon}
                                        ></i>
                                    </button>
                                    <span style={heartStyles.count}>{likesCount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4">
                            <h1 className="display-5 fw-bold text-center mb-3">{card.title}</h1>
                            <p className="lead text-center mb-4">{card.subtitle}</p>

                            {/* Description */}
                            <div style={sectionStyle}>
                                <h4 className="mb-3">About</h4>
                                <p style={{ whiteSpace: "pre-line" }}>{card.description}</p>
                            </div>

                            {/* Contact Information */}
                            <div style={sectionStyle}>
                                <h4 className="mb-3">Contact Information</h4>
                                <div className="row row-cols-1 row-cols-md-2 g-4">
                                    {/* Phone */}
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    backgroundColor: theme === "light" ? "#e9ecef" : "#333"
                                                }}
                                            >
                                                <i className="bi bi-telephone" style={{ fontSize: "1.25rem", color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Phone</div>
                                                <div className="fw-bold">
                                                    <a
                                                        href={`tel:${card.phone}`}
                                                        className="text-decoration-none"
                                                        style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}
                                                    >
                                                        {card.phone || "N/A"}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    backgroundColor: theme === "light" ? "#e9ecef" : "#333"
                                                }}
                                            >
                                                <i className="bi bi-envelope" style={{ fontSize: "1.25rem", color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Email</div>
                                                <div className="fw-bold">
                                                    <a
                                                        href={`mailto:${card.email}`}
                                                        className="text-decoration-none"
                                                        style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}
                                                    >
                                                        {card.email || "N/A"}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    backgroundColor: theme === "light" ? "#e9ecef" : "#333"
                                                }}
                                            >
                                                <i className="bi bi-globe" style={{ fontSize: "1.25rem", color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Website</div>
                                                <div className="fw-bold">
                                                    {card.web ? (
                                                        <a
                                                            href={card.web}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none"
                                                            style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}
                                                        >
                                                            Visit Website
                                                        </a>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="col">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="rounded-circle d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    backgroundColor: theme === "light" ? "#e9ecef" : "#333"
                                                }}
                                            >
                                                <i className="bi bi-geo-alt" style={{ fontSize: "1.25rem", color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                                            </div>
                                            <div>
                                                <div className="text-muted small">Address</div>
                                                <div className="fw-bold">
                                                    {fullAddress}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div style={sectionStyle}>
                                <h4 className="mb-3">Additional Details</h4>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="text-muted small">Created On</div>
                                        <div className="fw-bold">
                                            <i className="bi bi-calendar-event me-2"></i>
                                            {formatDate(card.createdAt)}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="text-muted small">Card ID</div>
                                        <div className="fw-bold">
                                            <i className="bi bi-fingerprint me-2"></i>
                                            {card._id}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back
                                </button>
                                
                                <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center justify-content-md-end">

                                    {user && card.user_id === user._id && (
                                        <button
                                            className="btn btn-danger me-2"
                                            onClick={() => handleDelete(card._id)}

                                        >
                                            <i className="bi bi-trash-fill me-2"></i>
                                            Delete
                                        </button>
                                    )}

                                    {user && card.user_id === user._id && (
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => navigate(`/edit-card/${card._id}`)}

                                        >
                                            <i className="bi bi-pencil-fill me-2"></i>
                                            Edit
                                        </button>
                                    )}
                                    <a
                                        href={`tel:${card.phone}`}
                                        className="btn btn-success me-2"
                                    >
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        Call
                                    </a>
                                    {card.email && (
                                        <a
                                            href={`mailto:${card.email}`}
                                            className="btn btn-primary"
                                        >
                                            <i className="bi bi-envelope-fill me-2"></i>
                                            Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;