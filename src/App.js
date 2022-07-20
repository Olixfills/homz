import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Offers from './pages/Offers';
// import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
        </Routes>
        <NavigationBar />
      </Router>
    </>
  );
}

export default App;
