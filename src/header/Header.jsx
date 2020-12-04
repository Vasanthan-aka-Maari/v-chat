import { Avatar } from "@material-ui/core";
import React from "react";
import "./Header.css";
import { auth, provider } from "../firebase";

function Header({ user, setUser }) {
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  });

  // function to sign in
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // function to sign out
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <img
        src="https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg"
        alt=""
      />
      <div className="button-container">
        {user ? (
          <>
            <Avatar src={user.photoURL} />
            <span>{user.displayName}</span>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <span>Please Sign In</span>
            <button onClick={signIn}>Sign In</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
