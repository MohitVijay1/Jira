import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
import useGetUser from "../../utils/Hooks/useGetUser";

function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const response = useGetUser();
  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await getDocs(collection(db, "projects"));

      const newData = projectResponse.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const data = newData.filter((item) => item.id === projectId);
      setProject(data);

      setUser(response);
    };
    fetchData();
  }, [projectId, response]);
  if (!project) return <h1>Loading..</h1>;
  return (
    <div>
      <div>{project[0]?.name}</div>
      <div>
        <KanbanBoard project={project} projectId={projectId} user={user} />
      </div>
    </div>
  );
}

export default Project;
