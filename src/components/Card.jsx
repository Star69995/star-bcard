import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from "../providers/ThemeContext";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useUser } from "../providers/UserContext";
import axios from 'axios';

function Card({ card }) {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, token } = useUser();

    const [isLiked, setIsLiked] = useState(card.likes?.includes(user?._id) || false);
    const [likesCount, setLikesCount] = useState(card.likes?.length || 0);
    const [isAnimating, setIsAnimating] = useState(false);

    // הוספת סגנון האנימציה ישירות לקומפוננטה
    useEffect(() => {
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
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const {
        _id,
        title,
        subtitle,
        phone,
        bizNumber,
        image,
        address,
        web
    } = card;

    const imgSrc = image?.url || "/api/placeholder/400/320";
    const imgAlt = image?.alt || "Card image";
    const cardNumber = bizNumber;

    const addressString = address ?
        `${address.street || ""} ${address.houseNumber || ""}, ${address.city || ""}` :
        "Address not available";

    // עיצוב בהתאם לנושא
    const cardStyle = {
        backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
        color: theme === "light" ? "#000" : "#f8f9fa",
        border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
    };

    // עיצוב כפתור הלייק
    const likeButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: '18px',
        backgroundColor: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer'
    };

    // עיצוב אייקון הלב
    const heartIconStyle = {
        fontSize: '16px',
        color: isLiked ? '#ff2b56' : (theme === "light" ? '#6c757d' : '#adb5bd'),
        transition: 'all 0.3s ease',
        marginRight: '5px',
        animation: isAnimating ? 'heartBeat 0.7s ease-in-out' : 'none'
    };

    // עיצוב מספר הלייקים
    const likeCountStyle = {
        fontWeight: 'bold',
        color: theme === "light" ? '#212529' : '#f8f9fa',
    };

    const handleCardClick = () => {
        navigate(`/cards/${_id}`);
    };

    const toggleLike = async (e) => {
        if (e) {
            e.stopPropagation();
        }

        if (!token) {
            alert("Please log in to like cards");
            return;
        }

        // הפעלת אנימציה
        setIsAnimating(true);

        try {
            await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
                {},
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );

            // עדכון מצב לייק וספירה
            setIsLiked(!isLiked);
            setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

            // סיום אנימציה אחרי זמן קצוב
            setTimeout(() => {
                setIsAnimating(false);
            }, 700);
        } catch (error) {
            console.error("Error toggling like:", error);
            setIsAnimating(false);
        }
    };

    return (
        <div
            className="card shadow-lg rounded-3"
            style={{
                width: "18rem",
                position: "relative",
                ...cardStyle,
                cursor: "pointer"
            }}
            onClick={handleCardClick}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = theme === "light" ?
                    "0 10px 20px rgba(0,0,0,0.2)" :
                    "0 10px 20px rgba(0,0,0,0.5)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
            }}
        >
            <div className="position-relative">
                <img
                    src={imgSrc}
                    className="card-img-top"
                    alt={imgAlt}
                    style={{
                        objectFit: "cover",
                        height: "180px",
                        borderTopLeftRadius: "calc(0.3rem - 1px)",
                        borderTopRightRadius: "calc(0.3rem - 1px)"
                    }}
                />
                <div
                    className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill"
                    style={{
                        backgroundColor: theme === "light" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                        fontSize: "0.8rem",
                        fontWeight: "bold"
                    }}
                >
                    #{cardNumber || "N/A"}
                </div>
            </div>

            <div className="card-body pb-5"> {/* Extra padding at bottom for icons */}
                <h5 className="card-title text-center fw-bold mb-2">{title}</h5>
                <p className="card-text text-center" style={{ fontSize: "0.9rem" }}>{subtitle}</p>
                <hr />
                <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone me-2" style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                    <span>{phone ?? "N/A"}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo-alt me-2" style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                    <span style={{ fontSize: "0.9rem" }}>{addressString}</span>
                </div>
                {web && (
                    <div className="d-flex align-items-center">
                        <i className="bi bi-globe me-2" style={{ color: theme === "light" ? "#0d6efd" : "#7aafff" }}></i>
                        <span style={{ fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{web}</span>
                    </div>
                )}

                {/* Action icons container */}
                <div className="position-absolute bottom-0 end-0 p-3 d-flex gap-3 align-items-center">
                    <button
                        className="btn btn-sm rounded-circle"
                        style={{
                            backgroundColor: theme === "light" ? "#e9ecef" : "#2c2c2c",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${phone}`;
                        }}
                    >
                        <i
                            className="bi bi-telephone-fill bounce-hover"
                            style={{
                                color: theme === "light" ? "#0d6efd" : "#7aafff",
                                transition: "transform 0.3s ease"
                            }}
                        ></i>
                    </button>

                    <button
                        style={likeButtonStyle}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike();
                        }}
                        aria-label={isLiked ? "Unlike" : "Like"}
                    >
                        <i
                            className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}
                            style={heartIconStyle}
                        ></i>
                        <span style={likeCountStyle}>{likesCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;