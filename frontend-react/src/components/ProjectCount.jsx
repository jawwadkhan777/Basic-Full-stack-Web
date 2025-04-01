import React, { useEffect, useState } from 'react'

const ProjectCount = ({ countRefresh }) => {
  const [projCount, setProjCount] = useState(0);

  const getCount = async ()=> {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/count`);
      const data = await res.json();
      // console.log(data);
      setProjCount(data.totalProjects);
      // onProjectCounted();

    } catch(error) {
      console.error(`Error fetching count: ${error}`);
      
    }
  }

useEffect(()=> {
  getCount();
}, [countRefresh]);

  return (
    <div className='text-green-500 text-xl flex justify-end'>Total Projects: {projCount}</div>
  )
}

export default ProjectCount