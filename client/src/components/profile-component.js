import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const ProfileComponent = () => {
  // 使用数组解构来获取 currentUser 和 setCurrentUser
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 在 useEffect 中获取当前用户信息并更新状态
    const fetchCurrentUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>You must login first before getting your profile.</div>
      )}
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header className="jumbotron">
            <h3>
              <strong>Name:{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token: {currentUser.token}</strong>
          </p>
          <p>
            <strong>Role: {currentUser.user.role}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
