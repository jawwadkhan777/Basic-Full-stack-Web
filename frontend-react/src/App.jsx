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
  const [countRefresh, setCountRefresh] = useState(false);

  const getProjects = async ()=> {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.projects);
      isLoading(false);
      setCountRefresh(true);
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

  const handleProjectAdded = ()=> {
    getProjects();
    setCountRefresh(false);
  }

  const handleProjectDeleted = ()=> {
    getProjects();
    setCountRefresh(false);
  }

  const handleProjectUpdated = ()=> {
    getProjects();
  }

  return (
    <div className='mt-10 ml-15 mr-15 sm:ml-30 sm:mr-30 mb-10'>
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-2xl sm:text-3xl font-bold'>Projects Directory</h1>
        <FontAwesomeIcon icon={faArrowRotateRight} className='text-green-500 cursor-pointer hover:text-green-700 sm:text-3xl text-2xl' onClick={()=> refreshHandler()} />
      </div>
      <ProjectForm onProjectAdded={handleProjectAdded}/>
      {loading ? <p>Loading, please wait...</p> : 
      <>
        <Project projects={projects} onProjectDeleted={handleProjectDeleted} onProjectUpdated={handleProjectUpdated} /><ProjectCount countRefresh={countRefresh} />
      </>
      }
    </div>
  )
}

export default App