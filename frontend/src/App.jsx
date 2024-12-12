
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/Admin';
import Driver from './pages/Driver';
import Passenger from './pages/Passenger';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/passenger" element={<Passenger />} />
                    <Route path="/driver" element={<Driver />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
