import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
