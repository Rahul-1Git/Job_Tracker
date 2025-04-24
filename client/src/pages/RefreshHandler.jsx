import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/", { replace: false });
      }
    }
  }, []);

  return null;
}

export default RefreshHandler;

// ✅ Show Home only if the user is logged in.
// 🚫 Prevent access to Home if not logged in.
// 🔄 Automatically redirect to /home if the page is refreshed and there's still a token in localStorage.

// When you refresh the page, React state (isAuthenticated) is reset to false, so you’d normally lose your login session. This fixes that by checking if a JWT token is in localStorage, and if yes:

// ✅ It sets isAuthenticated to true
