import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './componnents/Navbar/Navbar';
import Home from './componnents/Home/Home';
import Auth from './componnents/Auth/Auth';
import PostDetails from './componnents/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' exact element={ <Navigate replace to="/posts" /> } />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />
          <Route path='/auth' exact element={ !user ? <Auth /> : <Navigate replace to="/posts" /> } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;