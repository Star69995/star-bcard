// SearchResultsPage.js
import { useSearchParams } from 'react-router-dom';
import CardsPage from '../components/CardsPage';

const SearchResultsPage = () => {
    // קבלת פרמטר ה-query מה-URL
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || "";

    return (
        <>
            <div className="container mt-3 text-center mb-2"><h1>Search Results for: "{searchQuery}"</h1></div>;
            <div className="d-flex justify-content-around m-3 gap-3 flex-wrap">
                <CardsPage searchQuery={searchQuery}/>
            </div>

        </>
    );
};

export default SearchResultsPage;
