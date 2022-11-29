import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';
import NewInput from './NewInput';
import NewOutput from './NewOutput';
import EditRecord from './EditRecord';
import useLocalStorage from '../hooks/useLocalStorage';

function ProtectedRoute({ user, redirectPath = '/sign-in' }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />;
}

function App() {
  const [storedUser, setStoredUser] = useLocalStorage('user', null);

  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    setStoredUser(user);
  }, [user, setStoredUser]);

  function updateUserBalance(newBalance) {
    setUser((prev) => {
      return { ...prev, balance: newBalance }
    });
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, updateUserBalance }}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-input" element={<NewInput />} />
            <Route path="/new-output" element={<NewOutput />} />
            <Route path="/update-record" element={<EditRecord />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
