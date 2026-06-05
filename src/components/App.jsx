import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx';
import WatchOrder from './pages/WatchOrder.jsx';
import Characters from './pages/characters.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import Multiverse from './pages/Multiverse.jsx';
import Search from './pages/Search.jsx';
import Quiz from './pages/quiz.jsx';
import Releases from './pages/publish.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-rajdhani text-neon-red tracking-[0.3em] text-sm mb-3">404 SIGNAL LOST</p>
        <h1 className="font-orbitron text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <a href="/" className="text-neon-blue font-rajdhani font-semibold tracking-wider">
          Return Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch-order" element={<WatchOrder />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/multiverse" element={<Multiverse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/publish" element={<Navigate to="/releases" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
