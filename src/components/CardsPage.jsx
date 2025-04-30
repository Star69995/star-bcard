import { useEffect, useState } from 'react';
import Card from './Card';
import { useUser } from '../providers/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { getCards } from '../services/api';

const CardsPage = ({ filterType = "all", searchQuery = "" }) => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        getCards()
            .then(setCards)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = cards;

        // סינון לפי סוג כרטיס (לייקים, שלי)
        if (filterType === "liked" && user) {
            result = result.filter(card => card.likes?.includes(user._id));
        } else if (filterType === "mine" && user) {
            result = result.filter(card => card.user_id === user._id);
        }

        // סינון לפי חיפוש
        if (searchQuery) {
            result = result.filter(card => {
                const searchLower = searchQuery.toLowerCase();
                return (
                    card.title?.toLowerCase().includes(searchLower) ||
                    card.subtitle?.toLowerCase().includes(searchLower) ||
                    card.address?.street?.toLowerCase().includes(searchLower)
                );
            });
        }

        setFilteredCards(result);
    }, [cards, filterType, searchQuery, user]);

    if (loading) return <div>Loading cards...</div>;
    if (error) return <div>Something went wrong</div>;

    return (
        <div className="d-flex flex-wrap gap-4 justify-content-center">
            {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                    <Card key={card._id} card={card} />
                ))
            ) : (
                <div>No results found for "{searchQuery}"</div>
            )}
        </div>
    );
};

export default CardsPage;