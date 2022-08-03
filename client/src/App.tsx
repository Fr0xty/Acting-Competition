import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './utils/fetchInterceptor';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserHome from './pages/UserHome';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* home page */}
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/home" element={<UserHome />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;

