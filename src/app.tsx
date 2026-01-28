import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/error";
import RestaurantMenu from "./components/RestaurantCard";
import Cart from "./components/cart";

import UserContext from "./utils/usercontext";
import appStore from "./utils/appstore";
import { Provider } from "react-redux";
import RestaurantCard from "./components/RestaurantCard";

// Lazy-loaded components
const Grocery = lazy(() => import("./components/grocery"));

const AppLayout: React.FC = () => {
  const [username, setUserName] = useState<string>("Default User");

  // Simulate API fetch for username
  useEffect(() => {
    const fetchUser = async () => {
      // const response = await fetch("/api/user");
      const data = { name: "Yash Raj" };
      setUserName(data.name);
    };

    fetchUser();
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: username }}>
        <div className="min-h-screen">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

// Router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading About...</h1>}>
            <About />
          </Suspense>
        ),
      },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading Grocery...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurants/:resId", element: <RestaurantCard /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

// Render app
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={appRouter} />);
