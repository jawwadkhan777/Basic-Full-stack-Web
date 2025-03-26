import React, { useState } from "react";

const ProjectForm = ({onProjectAdded}) => {
    const [newProject, setNewProject] = useState("");

    const submitProject = async (event)=> {
        event.preventDefault();
        // const value = event.target.value;
        // setNewProject(value)        
        // console.log(newProject);

        if(!newProject.trim()) return;

        try {
          const res = await fetch("http://localhost:8081/api/projects", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body:JSON.stringify({project_name: newProject})
          });
          
          if(!res.ok) throw new Error("Failed to add project");

          const data = await res.json();
          // console.log(data);
          
          onProjectAdded(data.project);

          setNewProject("") // Clear input field after adding
        } catch(error) {
          console.error(`Error adding project: ${error}`);
          setNewProject("")
        }
      }
      

    return     <form className="mb-20 " onSubmit={submitProject}>
      <div className="mb-2">
        <label htmlFor="project" className="block mb-2 text-sm font-medium text-green-500">Add Project</label>
        <input type="text" id="project" onChange={e => setNewProject(e.target.value)} value={newProject} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter project name" required />
      </div>
      <button type="submit" className="text-white bg-green-600 hover:bg-green-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Add</button>
    </form>
    
};

export default ProjectForm;
