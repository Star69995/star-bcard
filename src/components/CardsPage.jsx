import { useEffect, useState } from 'react'
import { getCards } from '../services/api'
import Card from './Card'


const CardsPage = () => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCards()
            .then(setCards)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div>Loading cards...</div>
    if (error) return <div>Something went wrong</div>

    return <div className="d-flex flex-wrap gap-4 justify-content-center">
        {cards.map((card) => (
            <Card key={card._id}card={card}
            />
        ))}
    </div>

}

export default CardsPage
