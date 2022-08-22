import { useEffect } from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
    /**
     * redirect to /home if is logged in
     */
    useEffect(() => {
        (async () => {
            const req = await fetch('/api/resource/is-logged-in');
            if (req.status !== 200) return;

            if ((await req.text()) === 'true') document.location.href = '/home';
        })();
    }, []);

    return (
        <div className="home">
            <Navbar currentPage="home" />
            <Hero />
            <Footer />
        </div>
    );
};

export default Home;
