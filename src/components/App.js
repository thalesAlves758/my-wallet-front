import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    token: '',
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
