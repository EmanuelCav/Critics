import react from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './app/components/header/header'

import Index from './app/routes/index.routes';
import Auth from './app/routes/auth.routes';
import Create from './app/routes/create.routes';
import Profile from './app/routes/profile.routes';
import GetCritic from './app/routes/getCritic.routes';

import PrivateRoute from './app/routes/privateRoute';
import { Reducer } from './app/interface/reducer';

function App() {

  const { user } = useSelector((state: Reducer) => state)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={user.isAuth ? <Navigate to="/" /> : <Auth /> } />
        <Route path="/:id" element={<GetCritic />} />
        <Route path='*' element={<Navigate to="/" />} />

        <Route path='/create' element={<PrivateRoute />}>
          <Route path="/create" element={<Create />} />
        </Route>

        <Route path='/profile' element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
