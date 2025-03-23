//revised 3.23.25 njw
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages and components
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import MapView from "./components/Map/MapView";
import ReviewList from "./components/ReviewList/ReviewList";
import Auth from "./utils/auth";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!Auth.loggedIn()) {
    return <Login />;
  }
  return <>{children}</>;
};

// Create router with all routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "map",
        element: <MapView />,
      },
      {
        path: "reviews",
        element: <ReviewList />,
      },
      {
        path: "review/:reviewId",
        element: (
          <ProtectedRoute>
            <ReviewList />
          </ProtectedRoute>
        ),
      },
      // Add more routes as needed
    ],
  },
]);

// Render the app with the router
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}


//TODO: verify imports/main entry point
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import App from "./App";
// import Home from "./pages/Home";
// import Error from "./pages/Error";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       // Add more routes here
//     ],
//   },
// ]);

// const rootElement = document.getElementById("root");
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
// }
