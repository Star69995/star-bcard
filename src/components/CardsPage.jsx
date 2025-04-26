import { useEffect, useState } from 'react'
import { getCards } from '../services/api'
import Card from './Card'
import { useUser } from '../providers/UserContext'


const CardsPage = ({ filterType = "all" }) => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {user} = useUser()

    useEffect(() => {
        getCards()
            .then(setCards)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>Loading cards...</div>
    if (error) return <div>Something went wrong</div>

    
    let filteredCards = cards
    if (filterType === "liked" && user) {
        filteredCards = cards.filter(card => card.likes?.includes(user._id))
    } else if (filterType === "mine" && user) {
        // console.log("tring to show my cards");
        
        filteredCards = cards.filter(card => card.user_id === user._id)
    }

    return <div className="d-flex flex-wrap gap-4 justify-content-center">
        {filteredCards.map((card) => (
            <Card key={card._id}card={card}
            />
        ))}
    </div>

}

export default CardsPage
