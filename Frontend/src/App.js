import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from "./context/UserContext";

import Navbar from './Components/Navbar/Navbar';
import FrontPage from './Components/FrontPage/FrontPage';
import Milestones from './Components/Milestones/Milestones';
import Popular from './Components/Milestones/Popular';
import About from './Components/Pages/About/About';
import Support from './Components/Pages/Support/Support';
import Contact from './Components/Pages/Contact/Contact';
import Register from './Components/Register/Register';
import HowItWorks from './Components/FrontPage/howitworks';
import Footer from './Components/Footer/Footer';
import Browse from './Components/Browse/Browse';
import Profile from './Components/Pages/Profile/Profile';
import Login from './Components/Auth/Login';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import PostJobForm from './Components/Postjob/Postjobform';
import BrowseDetails from './Components/Browse/BrowseDetails';
import MyRegistrations from './Components/Register/MyRegistrations';
import CompanyRegistrations from './Components/Register/CompanyRegistration';

function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { state, dispatch } = useUser();

  useEffect(() => {
    const token = state.token || sessionStorage.getItem('token');
    if (token) {
      fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          const profilePic = data.profile.profilePic || data.profile.companyLogo || '';
          const displayname = data.role === 'User' ? data.profile.fullName : data.profile.companyName;
          dispatch({
            type: 'LOGIN',
            payload: {
              email: data.profile.email,
              role: data.role,
              token: token,
              profilePic: profilePic,
              displayname: displayname
            },
          });
        })
        .catch(err => {
          console.error("Auto-login fetch error:", err);
        });
    }
  }, [dispatch, state.token]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="appp">
      <Navbar
        onProfileClick={toggleDropdown}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
      />
      {/* {dropdownOpen && <Dropdown />} */}

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <FrontPage />
              <Milestones />
              <HowItWorks />
              <h1 id="cat">Popular Categories</h1>
              <Popular quickFilters={[
                { label: "Web", value: "Web", icon: "💻" },
                { label: "Analytics", value: "Analytics", icon: "📊" },
                { label: "AI", value: "AI", icon: "🧠" },
                { label: "Frontend", value: "Frontend", icon: "🎨" },
              ]} filtertype='tag' />
              <h1 id="cat">Locations Near You</h1>
              <Popular quickFilters={[
                { label: "Remote", value: "Remote", icon: "🌐" },
                { label: "Mumbai", value: "Mumbai", icon: "🌆" },
                { label: "Chennai", value: "Chennai", icon: "🏖️" },
              ]} filtertype='location' />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/Browse/details" element={<BrowseDetails />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/company-registrations" element={<CompanyRegistrations />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Postjob" element={<PostJobForm />} />
        <Route path="/Register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default AppWrapper;
