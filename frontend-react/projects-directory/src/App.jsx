import React, { useEffect, useState } from 'react'
// import { getProjects } from './api/api';
import Project from './components/Projects';
import ProjectForm from './components/ProjectForm';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectCount from './components/ProjectCount';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, isLoading] = useState(true);

  const getProjects = async ()=> {
    try {
      const res = await fetch("http://localhost:8081/api/projects");
      const data = await res.json();
      setProjects(data.projects)
      isLoading(false)
    } catch(error) {
      console.error(`Error fetching projects: ${error}`);
      isLoading(false)
    }
}

  // This useEffect runs on Mount
  useEffect(() => {
    getProjects();
  }, []);

  const refreshHandler= ()=> {
    // console.log("refresh");
    isLoading(true);
    getProjects();
  }

  const handleProjectAdded = (newProject)=> {
    setProjects([...projects, newProject]);
  }

  const handleProjectDeleted = ()=> {
    getProjects();
  }

  const handleProjectUpdated = ()=> {
    getProjects();
  }

  return (
    <div className='mt-10 ml-30 mr-30 mb-10'>
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Projects Directory</h1>
        <FontAwesomeIcon icon={faArrowRotateRight} className='text-green-500 cursor-pointer hover:text-green-700 text-3xl' onClick={()=> refreshHandler()} />
      </div>
      <ProjectForm onProjectAdded={handleProjectAdded}/>
      {loading ? <p>Loading, please wait...</p> : 
      <>
        <Project projects={projects} onProjectDeleted={handleProjectDeleted} onProjectUpdated={handleProjectUpdated} /><ProjectCount projects={projects}/>
      </>
      }
    </div>
  )
}

export default App