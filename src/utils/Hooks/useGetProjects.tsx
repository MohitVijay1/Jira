import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function useGetProjects() {
  const [projects, setProjects] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getDocs(collection(db, "projects"));

      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(newData);
    };
    fetchData();
  }, []);

  return projects;
}

export default useGetProjects;
