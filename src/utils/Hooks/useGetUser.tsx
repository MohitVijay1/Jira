import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

function useGetUser() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(collection(db, "users"));
      const userData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(userData);
    };
    fetchData();
  }, []);
  return user;
}

export default useGetUser;
