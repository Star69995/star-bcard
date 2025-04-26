
import CardsPage from "../components/CardsPage";

function HomePage() {
    return ( <>
        <div className="container mt-3"><h1>Home Page</h1></div>;
        <div className="d-flex justify-content-around m-3 gap-3 flex-wrap"> 
            <CardsPage/>
        </div>

        </> );
}

export default HomePage;