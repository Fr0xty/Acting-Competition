import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* home page */}
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

