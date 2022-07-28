import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="home">
            <Navbar currentPage="home" />
            <Hero />
        </div>
    );
};

export default Home;
