import React, { useEffect, useState } from "react";
import axios from "axios";

function ProjectList({ newProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [newProject]);

  return (
    <div>
      <h2>📁 All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <strong>{project.title}</strong> — {project.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
