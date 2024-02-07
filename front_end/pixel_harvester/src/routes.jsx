import React from "react";
import { createBrowserRouter } from 'react-router-dom';

import App from "./App";
import Home from "./1_Home";
import User from "./2_User";
import About from "./3_About";
import ErrorPage from "./4_ErrorPage"


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />
            },
            {
                path: "/user",
                element: <User />,
                errorElement: <ErrorPage />
            },
            {
                path: "/about",
                element: <About />,
                errorElement: <ErrorPage />
            },
        ]
    }
]);

export default Routes;