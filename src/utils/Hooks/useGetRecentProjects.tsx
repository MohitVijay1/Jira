import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function useGetRecentProjects() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "projects"),
        orderBy("created", "desc"),
        limit(2)
      );

      const response = await getDocs(q);
      const newDatalimit = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProjects(newDatalimit);

      console.log(newDatalimit);
    };
    fetchData();
  }, []);

  return projects;
}

export default useGetRecentProjects;
