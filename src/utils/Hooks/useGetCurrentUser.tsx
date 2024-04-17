import { useEffect, useState } from "react";
import useGetUser from "./useGetUser";
import AuthProvider from "../../AuthProvider";

function useGetCurrentUser() {
  const [currentUser, setCurrentUser] = useState("");
  const response = useGetUser();
  const { user } = AuthProvider();
  useEffect(() => {
    const currUser = response.filter(
      (item) => item.email.toLowerCase() === user.email.toLowerCase()
    );
    setCurrentUser(currUser);
  }, [response, user]);
  return currentUser;
}

export default useGetCurrentUser;
