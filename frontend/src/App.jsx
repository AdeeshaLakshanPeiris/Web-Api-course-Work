
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BusList from './components/BusList';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ReservationPage from './components/ReservationPage';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/reservation/:id" element={<ReservationPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
