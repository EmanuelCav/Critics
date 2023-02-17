import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Reducer } from '../interface/reducer';

const PrivateRoute = () => {

    const { user } = useSelector((state: Reducer) => state)

    return user.isAuth ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoute