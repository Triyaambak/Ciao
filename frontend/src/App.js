import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import authorizeUser from './utils/authorizeUser';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

function App() {
  const ifAuthorize = authorizeUser();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ifAuthorize ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
