import UserClass from "./UserClass";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const About = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">About Us</h1>

      <h2 className="text-lg text-gray-600">
        This is Namaste React Web Series
      </h2>

      <p className="font-medium">Logged in user: {loggedInUser}</p>

      <UserClass name="First" location="Delhi (class)" />
    </div>
  );
};

export default About;
