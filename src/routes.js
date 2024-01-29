import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { getItem } from './utils/storage';

import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />

      <Route element={<ProtectedRoutes redirectTo='/' />}>
        <Route path="/main" element={<Main />} />
      </Route>
    </Routes>

  );
}

export default MainRoutes;
