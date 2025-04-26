import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout.jsx';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
