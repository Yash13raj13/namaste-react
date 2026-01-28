import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/usercontext";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

  // Redux cart items
  const cartItems = useSelector((store: any) => store.cart.items);

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      {/* Logo */}
      <div className="logo-container">
        <Link to="/">
          <img
            className="w-28"
            src="https://img.freepik.com/premium-vector/burger-vector-illustration-burger-logo-design_921448-1009.jpg"
            alt="logo"
          />
        </Link>
      </div>

      {/* Nav items */}
      <div className="nav-items">
        <ul className="flex gap-6 items-center text-lg font-medium">
          <li>Online: {onlineStatus ? "🟢" : "🔴"}</li>

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>

          <li className="text-blue-600 font-semibold">
            {loggedInUser}
          </li>

          <li>
            <button
              className="px-4 py-1 bg-black text-white rounded-lg"
              onClick={() =>
                setBtnName(btnName === "Login" ? "Logout" : "Login")
              }
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
