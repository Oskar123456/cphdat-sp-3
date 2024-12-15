import React from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'

import Home from './components/Home.jsx'
import Pokedex from './components/Pokedex.jsx'
import ApiDocs from './components/ApiDocs.jsx'
import ErrorPage from './components/ErrorPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>} />
    <Route path="/pokedex" element={<Pokedex/>} errorElement={<ErrorPage />} />
    <Route path="/apidocs" element={<ApiDocs/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
