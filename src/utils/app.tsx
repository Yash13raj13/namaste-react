import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import { Provider } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";

import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";

/* ---------------- Lazy ---------------- */
const Grocery = lazy(() => import("./components/Grocery"));

/* ---------------- Layout ---------------- */
const AppLayout: React.FC = () => {
  const location = useLocation();

  // hide header/footer for specific routes
  const hideLayoutRoutes = ["/about", "/contact", "/grocery"];
  const hideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const [userName, setUserName] = useState<string>("Guest");

  return (
    <>
      {!hideLayout && <Header />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
};

/* ---------------- Routes ---------------- */
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Body /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "restaurants/:menuId", element: <RestaurantMenu /> },
      {
        path: "grocery",
        element: (
          <Suspense fallback={<h2>Loading Grocery...</h2>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
  },
]);

/* ---------------- Root App ---------------- */
const App = () => {
  const [userName, setUserName] = useState("Guest");

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </Provider>
  );
};

/* ---------------- Render ---------------- */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
``