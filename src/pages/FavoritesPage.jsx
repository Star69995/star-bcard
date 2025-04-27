
import CardsPage from "../components/CardsPage";

function FavoritesPage() {
    return (
        <>
            <div className="container mt-3 text-center mb-4"><h1>Favorites Cards</h1></div>
            <div className="d-flex justify-content-around m-3 gap-3 flex-wrap">
                <CardsPage filterType="liked"/>
            </div>

        </>
    );
}

export default FavoritesPage;