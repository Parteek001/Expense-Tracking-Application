import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import Income from './pages/Dashboard/income';
import {Toaster } from "react-hot-toast";

const App = () => {
  return (
    
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
    
  )
}

export default App

const Root = () =>{
  // checks if token exists in localStorage
  const isAuthenticaed = !!localStorage.getItem("token");

  // redirect to dashboard if authenticated , otherwise login
  return isAuthenticaed ? (<Navigate to = "/dashboard" />) : (<Navigate to = "/login" />) ; 
}


// const Root = () => {
//   const [loading, setLoading] = React.useState(true);
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   React.useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axiosInstance.get("/auth/me")
//       .then(() => setIsAuthenticated(true))
//       .catch(() => localStorage.removeItem("token"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
// };
