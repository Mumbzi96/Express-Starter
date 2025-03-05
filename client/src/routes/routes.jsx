import React, { lazy, useContext, useState } from 'react';
import Loadable from '../components/loadable';

const Default = Loadable(lazy(() => import('../pages/Default')))

//? Auth
const Login = Loadable(lazy(() => import('../pages/auth/Login')))


const Router = [
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Default />,
        children: [
            { path: '/', exact: true, element: <Default /> },
        ],
    },
];

export default Router;
