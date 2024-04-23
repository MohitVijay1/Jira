import React, { useEffect, useState } from "react";
import useGetProjects from "./useGetProjects";
import useGetCurrentUser from "./useGetCurrentUser";

function useGetIssue() {
  const [issue, setIssue] = useState();
  const projects = useGetProjects();

  const currentUser = useGetCurrentUser();
  const name = currentUser[0]?.name.toLowerCase();

  useEffect(() => {
    const response = projects?.map((project) => {
      const data = project.data;

      const filteredData = Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].filter(
          (item) => item.assignee.toLowerCase() === name
        );
        return acc;
      }, {});
      return { project: project, data: filteredData };
    });
    setIssue(response);
  }, [projects, currentUser]);
  return issue;
}

export default useGetIssue;
