import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import UsersTable from "./components/UsersTable";
import PrivateRoute from "./PrivateRoute";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/recover-password" element={<RecoverPassword/>}/>
                <Route path="/users" element={<PrivateRoute />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
