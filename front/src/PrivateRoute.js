import { Navigate } from 'react-router-dom';
import UsersTable from './components/UsersTable'; // Import your UsersTable component

function PrivateRoute({ path, element }) {
    const accessToken = sessionStorage.getItem('accessToken');

    return accessToken ? <UsersTable /> : <Navigate to="/" state={{ from: path }} replace />;
}

export default PrivateRoute;
