import React, { useEffect, useState } from 'react'
import { getProjects } from './api/api';
import Project from './components/Project';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, isLoading] = useState(true);

  // This useEffect runs on Mount
  useEffect(() => {
    console.log("useEffect hook!");

    getProjects()
      .then(data => {
        console.log("Fetched data: " + data);
        setProjects(data)

        isLoading(false)
      })
      .catch(error => {
        console.log(`Error fetching projects: ${error}`)
        isLoading(false)
      })

  }, []);

  // This useEffect runs when `projects` updates
  useEffect(() => {
    console.log("Updated Projects:", projects);
  }, [projects]);

  return (
    <div>
      <h1>Project Lists</h1>
      {loading ? <p>Loading, please wait...</p> : <Project data={projects} />}
    </div>
  )
}

export default App