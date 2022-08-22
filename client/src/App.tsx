import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './utils/fetchInterceptor';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* home page */}
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/home" element={<UserPage page="home" />} />
                    <Route path="/events" element={<UserPage page="events" />} />
                    <Route path="/events/:eventId" element={<UserPage page="events" />} />
                    <Route path="/register" element={<UserPage page="register" />} />
                    <Route path="/item" element={<UserPage page="item" />} />
                    <Route path="/users" element={<UserPage page="users" />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
