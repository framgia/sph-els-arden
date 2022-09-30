import { createContext, useState, useEffect } from "react";
import { loggedInUser } from "../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../services/userService";

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
        .catch((error) => {
          console.log("An error occured");
          if (
            location.pathname === "/home" ||
            location.pathname === "/profile" ||
            location.pathname === "/profile/follows" ||
            location.pathname === "/profile/edit"
          ) {
            navigate("login");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
