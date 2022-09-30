import { createContext, useState, useEffect } from "react";
import { loggedInUser } from "../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../services/userService";
import { guestRoutes, authenticatedRoutes } from "../constants/routes";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const logIn = (data) => {
    setUser(data);
  };
  const logOut = () => {
    setUser(null);
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = () => {
      loggedInUser()
        .then((user) => {
          setUser(user.data);
          setLoading(false);

          guestRoutes.includes(location.pathname) && navigate("home");
        })
        .catch(() => {
          authenticatedRoutes.includes(location.pathname) && navigate("login");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUser();
  }, [location.pathname, navigate]);

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
