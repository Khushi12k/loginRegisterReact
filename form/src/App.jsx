// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from "../src/components/Register";
// import Login from "../src/components/Login";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Register />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
// ]);

// function App() {
//   return (
//     <RouterProvider router={routes} />
//   );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Home from "../src/components/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home /> 
  }
]);

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
