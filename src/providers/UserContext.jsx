import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserContext = createContext(null);

export function UserProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    // פונקציה לעדכון המשתמש
    const updateUserFromToken =  (newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            setToken(newToken);

            const decoded = jwtDecode(newToken);
            setUser(decoded);  // הצגה מיידית של מידע בסיסי
            
            getUserInfo(decoded._id, newToken).then((userData) => {
                if (userData) {
                    setUser({ ...decoded, ...userData }); // מיזוג עם הנתונים מהשרת
                } else {
                    console.error("Failed to fetch user data.");
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
            
        } else {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    };

    const getUserInfo = async (userId, token) => {
        try {
            const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, {
                headers: {
                    "x-auth-token": token
                }
            });
            // console.log("User data:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    };

    // שימוש ב־useEffect כדי לקרוא לפונקציה updateUserFromToken כאשר ה־token משתנה
    useEffect(() => {
        if (token) {
            updateUserFromToken(token);
        }
    }, [token]);  // התניה על שינוי ה־token

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, token, updateUserFromToken, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
