import axios from 'axios'

const API_BASE = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2'

export const getCards = async () => {
    try {
        const res = await axios.get(`${API_BASE}/cards`)
        return res.data
    } catch (err) {
        console.error('Error fetching cards:', err)
        throw err
    }
}
