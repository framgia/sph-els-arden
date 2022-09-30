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
        })
        .catch(() => {})
        .finally(() => {});
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        guestRoutes.includes(location.pathname) && navigate("home");
      } else {
        authenticatedRoutes.includes(location.pathname) && navigate("login");
      }
    }
  }, [location.pathname, loading, user]);

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
