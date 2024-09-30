import React, { createContext, useState, useContext } from "react";
import axios from "../services/customAxios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    isLoggedIn: false,
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    axios
      .post("/api/get-info-user", { a: "1" }, { withCredentials: true })
      .then((res) => {
        console.log(res);

        if (res.status == 200) {
          setUser({
            ...res.data,
            isLoggedIn: true,
          });
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          console.log("1");
          localStorage.removeItem("user");
          setUser({ email: "", isLoggedIn: false, username: "" });
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        localStorage.removeItem("user");
        setUser({ email: "", isLoggedIn: false, username: "" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    console.log("USER_Context:> ", user);
  }, [user, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
