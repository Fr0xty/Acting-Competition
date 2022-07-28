import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="home">
            <Navbar currentPage="home" />
            <Hero />
            <Footer />
        </div>
    );
};

export default Home;
