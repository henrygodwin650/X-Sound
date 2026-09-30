import { Route, Routes } from 'react-router-dom';
// Layouts
import AuthLayout from './components/Login/AuthLayout';
import AppLayout from './components/Hero/AppLayout';
import ProtectedRoutes from './components/Hero/ProtectedRoutes';

// Authentication pages
import LoginPage from "./components/Login/LoginPage";
import CreateAccount from "./components/Login/CreateAccount";
import ForgottenPage from "./components/Login/ForgottenPage";
import VerifyEmail from "./components/Login/VerifyEmail";

// Public Pages
import HomePage from './components/Hero/HomePage';
import Search from './components/Hero/SearchPage/Search';
import LocalMusic from './components/Hero/localMusic/LocalMusic';
import Player from './components/player/Player';
import Favorites from './components/Hero/Favorite/Favorites';
import Settings from './components/Hero/Settings/Settings';
import TrendingPage from './components/Navbar/TrendingPage';
import RecentlyAddedPage from './components/Navbar/RecentlyAddedPage';
import Lyrics from './components/player/Lyrics';
import LandingPage from './components/LandingPage/LandingPage';
import Blog from './components/LandingPage/Blog';
import AboutPage from './components/LandingPage/AboutPage';
import Contact from './components/LandingPage/Contact';

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/blog-app" element={<Blog />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-app" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/forgotten" element={<ForgottenPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/lyrics" element={<Lyrics />} />
          <Route path="/player" element={<Player />} />
          <Route path="/local" element={<LocalMusic />} />
          <Route path="/trending-page" element={<TrendingPage />} />
          <Route path="/recent-page" element={<RecentlyAddedPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
