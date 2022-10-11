import { createContext, useState, useEffect, useReducer } from "react";
import { loggedInUser } from "../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../services/userService";
import {
  guestRoutes,
  authenticatedRoutes,
  normalUserRoutes,
} from "../constants/routes";
import RouteMatching from "./routeMatching";

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
        .catch(() => {
          setLoading(false);
        })
        .finally(() => {});
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (RouteMatching(guestRoutes, location.pathname)) {
          user.is_staff ? navigate("/admin/home") : navigate("/home");
        }

        if (RouteMatching(["/admin"], location.pathname) && !user.is_staff) {
          navigate("/home");
        } else if (
          RouteMatching(normalUserRoutes, location.pathname) &&
          user.is_staff
        ) {
          navigate("/admin/categories");
        }
      } else {
        RouteMatching(authenticatedRoutes, location.pathname) &&
          navigate("login");
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
