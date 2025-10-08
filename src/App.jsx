import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './components/pages/Home';
import Watchlist from './components/pages/Watchlist';
import RootLayout from './components/layouts/RootLayouts';
import Profile from './components/pages/Profile';
import Search from './components/pages/Search';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AuthLayout from './components/layouts/AuthLayout'; // 👈 create this
import Movie from "./components/pages/Movie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Routes WITH Navbar */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute> } />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="search" element={<Search />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Route>

        {/* Routes WITHOUT Navbar */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
      </>
    )
  );

  return(
    <>
      <ToastContainer position="top-right" autoClose={3000} />
  <RouterProvider router={router} />
    </>

);

}

export default App;
