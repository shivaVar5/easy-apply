import React from "react";
import AppLAyout from "./components/AppLayout";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Resume from "./pages/Resume";
import Tracker from "./pages/Tracker";
import   "./Styles/GlobalStyles.css"


const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLAyout/>,
    children:[
      {
        index:true,
        element:<Home />

      },
      {
        path:"upload-resume",
        element:<Resume />

      },

      {
        path:"about",
        element:<About />
      },
      {
        path:"jobs",
        element:<Jobs />
      },
      {
        path:"resume-tracker",
        element:<Tracker />
      }

    ]

  }
]);

const App = ()=>{
  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App;