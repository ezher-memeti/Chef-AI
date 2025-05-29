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
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <LoginPage />
          </Layout>
        } />
        <Route path="/searchRecipePage" element={
          <Layout>
            <PrivateRoute>
              <SearchRecipePage />
            </PrivateRoute>
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
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          </Layout>
        } />
        <Route path="/ChangePassword" element={
          <Layout>
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          </Layout>
        } />
        <Route path="/preferences" element={
          <Layout>
            <PrivateRoute>
              <Preferences />
            </PrivateRoute>
          </Layout>
        } />
        <Route path="/bookmarks" element={
          <Layout>
            <PrivateRoute>
              <Bookmarks />
            </PrivateRoute>
          </Layout>
        } />
        <Route path="/howItWorks" element={
          <Layout>
            <HowItWorks />
          </Layout>
        } />
        <Route path="/FAQ" element={
          <Layout>
            <FAQ />
          </Layout>
        } />
        <Route path="/aboutUs" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />

      </Routes>
    </Router>
  );
};

export default App;
