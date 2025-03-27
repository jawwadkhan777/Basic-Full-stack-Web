import React, { useEffect, useState } from 'react'
import { getProjects } from './api/api';
import Project from './components/Projects';
import ProjectForm from './components/ProjectForm';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, isLoading] = useState(true);

  // This useEffect runs on Mount
  useEffect(() => {
    getProjects()
      .then(data => {
        // console.log("Fetched data: " + data);
        setProjects(data)
        isLoading(false)
      })
      .catch(error => {
        console.log(`Error fetching projects: ${error}`)
        isLoading(false)
      })

  }, []);

  const handleProjectAdded = (newProject)=> {
    setProjects([...projects, newProject]);
  }

  const handleProjectDeleted = ()=> {
    getProjects()
      .then(data => {
        setProjects(data)
      })
      .catch(error => {
        console.log(`Error fetching projects: ${error}`)
      })
  }

  const handleProjectUpdated = ()=> {
    getProjects()
      .then(data => setProjects(data))
      .catch(error => console.log(`Error fetching projects: ${error}`))
  }

  return (
    <div className='mt-10 ml-30 mr-30 mb-10'>
      <h1 className='text-3xl font-bold mb-10'>Projects Directory</h1>
      <ProjectForm onProjectAdded={handleProjectAdded}/>
      {loading ? <p>Loading, please wait...</p> : <Project projects={projects} onProjectDeleted={handleProjectDeleted} onProjectUpdated={handleProjectUpdated} />}
    </div>
  )
}

export default App