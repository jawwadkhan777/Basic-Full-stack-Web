import React, { useState } from "react";

const ProjectForm = ({onProjectAdded}) => {
    const [newProject, setNewProject] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitProject = async (event)=> {
        event.preventDefault();

        if(!newProject.trim()) return;

        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body:JSON.stringify({proj_name: newProject})
          });
          
          const data = await res.json();
          
          if(!res.ok) throw new Error(data.error || "Failed to add project");
          
          onProjectAdded();

          setNewProject(""); // Clear input field after adding
          setErrorMessage(""); // Clear error message on success
        } catch(error) {
          console.error(`Error adding project: ${error.message}`);
          setErrorMessage(error.message); 
          setNewProject("")
        }
      }
      

    return     <form className="mb-20 " onSubmit={submitProject}>
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <label htmlFor="project" className="block mb-2 text-m font-medium text-green-500">Add Project</label>
          <input type="text" id="project" onChange={e => setNewProject(e.target.value)} value={newProject} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="enter project name" required />
        </div>
        <button type="submit" className="text-white bg-green-500 hover:bg-green-700  font-medium rounded-lg text-m px-5 py-2.5 text-center">+ Add</button>
      </div>
      {/* error message */}
      {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </form>
    
};

export default ProjectForm;
