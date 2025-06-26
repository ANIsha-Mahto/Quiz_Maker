import React, { useState } from "react";
import ProjectList from "./components/ProjectList";

function App() {
  const [newProject, setNewProject] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Project Management Tool</h1>
      <ProjectList newProject={newProject} />
    </div>
  );
}

export default App;
