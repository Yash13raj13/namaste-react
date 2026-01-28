import React, { Component } from "react";
import { UserProps, UserState, UserInfo } from "../utils/types";

class UserClass extends Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);

    this.state = {
      userInfo: {
        name: "Yash",
        location: "Unknown",
        contact: "@yashraj",
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://api.github.com/users/Yash13raj13"
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      const json = await response.json();

      const userInfo: UserInfo = {
        name: json.name || "Yash",
        location: json.location || "Unknown",
        contact: json.login ? `@${json.login}` : "@yashraj",
      };

      this.setState({ userInfo });
    } catch (error) {
      console.error("Error fetching user data:", error);
      this.setState({
        userInfo: {
          name: "Yash",
          location: "Unknown",
          contact: "@yashraj",
        },
      });
    }
  }

  componentDidUpdate(prevProps: UserProps, prevState: UserState) {
    if (prevState.userInfo !== this.state.userInfo) {
      console.log("User info updated:", this.state.userInfo);
    }
  }

  componentWillUnmount() {
    console.log("UserClass component is unmounting");
  }

  render() {
    const { name, location, contact } = this.state.userInfo;

    return (
      <div className="user-card p-4 m-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold">Name: {name}</h2>
        <h3 className="text-lg">Location: {location}</h3>
        <h4 className="text-sm text-gray-600">Contact: {contact}</h4>
      </div>
    );
  }
}

export default UserClass;
