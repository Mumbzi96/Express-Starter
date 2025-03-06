import React, { lazy, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/loadable';
import { useAuthContext } from '../context/useAuthContext';

const Default = Loadable(lazy(() => import('../pages/Default')))

//? Auth
const Login = Loadable(lazy(() => import('../pages/auth/Login')))

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
  
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
  
    return children;
};


const Router = [
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Default />
            </PrivateRoute>
        ),
        children: [
            { path: '/', exact: true, element: <Default /> },
        ],
    },
];

export default Router;
