import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavigationBar from "./components/NavigationBar";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category";
import CreateListings from "./pages/CreateListings";
import SingleListing from "./pages/SingleListing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="offers" element={<Offers />} />
          <Route path="profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<CreateListings />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ForgotPassword />} />
          <Route path="category/:categoryName" element={<Category />} />
          <Route
            path="category/:categoryName/:listingId"
            element={<SingleListing />}
          />
          <Route path="contact/:landlordId" element={<Contact />} />
        </Routes>
        <NavigationBar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
