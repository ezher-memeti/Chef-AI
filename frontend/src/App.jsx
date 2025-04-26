import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import Layout from './components/Layout/Layout.jsx';
import RegisterPage from './pages/Register';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>

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
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
