import { useState } from "react";

interface UserProps {
  name?: string;
  location?: string;
  contact?: string;
}

const User = ({ name = "Yash", location = "Unknown", contact = "@yashraj" }: UserProps) => {
  const [count] = useState(0);

  return (
    <div className="user-card p-4 m-4 border rounded shadow-lg">
      <h1 className="text-lg font-semibold mb-2">Count: {count}</h1>
      <h2 className="text-xl font-bold mb-1">Name: {name}</h2>
      <h3 className="text-lg mb-1">Location: {location}</h3>
      <h4 className="text-sm text-gray-600">Contact: {contact}</h4>
    </div>
  );
};

export default User;
