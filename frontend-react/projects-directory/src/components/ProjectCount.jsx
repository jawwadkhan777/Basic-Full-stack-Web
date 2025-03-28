import React from 'react'

const ProjectCount = ({projects}) => {
  return (
    <div className='text-green-500 text-xl flex justify-end'>Total Projects: {projects.length}</div>
  )
}

export default ProjectCount