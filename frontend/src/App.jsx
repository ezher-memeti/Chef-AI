import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Layout from './components/Layout/Layout.jsx';
import RegisterPage from './pages/Register';
import ForgotPassword from './pages/Forgot-password';
import SearchRecipePage from './pages/Search-recipe';
import Result from './pages/Result-page';
import ChangePassword from './pages/Change-password'
import Preferences from './pages/Preferences';
import Bookmarks from './pages/Bookmarks'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <SearchRecipePage />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <LoginPage />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <RegisterPage />
          </Layout>
        } />
        <Route path="/forgot-password" element={
          <Layout>
            <ForgotPassword />
          </Layout>
        } />
        <Route path="/ResultPage" element={
          <Layout>
            <Result />
          </Layout>
        } />
        <Route path="/" element={
          <Layout>
            <SearchRecipePage />
          </Layout>
        } />
        <Route path="/ChangePassword" element={
          <Layout>
            <ChangePassword />
          </Layout>
        } />
        <Route path="/preferences" element={
          <Layout>
            <Preferences />
          </Layout>
        } />
        <Route path="/bookmarks" element={
          <Layout>
            <Bookmarks />
          </Layout>
        } />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
